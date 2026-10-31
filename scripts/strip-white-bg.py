"""Flood-fill a PNG's outer white background to transparent.

Brand PNGs sometimes ship with an opaque white tile behind the mark, which
looks wrong on a dark surface. A flood fill inward from the border only clears
white that is contiguous with the outside, so enclosed white details and the
coloured artwork itself are left untouched.

Usage: python scripts/strip-white-bg.py <in.png> <out.png>
"""

import struct
import sys
import zlib
from collections import deque

WHITE_MIN = 225  # every channel above this counts as background white


def read_chunks(data):
    i, out = 8, []
    while i < len(data):
        length = struct.unpack(">I", data[i : i + 4])[0]
        out.append((data[i + 4 : i + 8].decode("latin1"), data[i + 8 : i + 8 + length]))
        i += 12 + length
    return out


def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    return a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)


def to_rgba(data):
    width, height = struct.unpack(">II", data[16:24])
    color_type, interlace = data[25], data[28]
    if interlace:
        raise SystemExit("interlaced PNGs are not supported")
    channels = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[color_type]

    palette = trns = None
    for name, payload in read_chunks(data):
        if name == "PLTE":
            palette = payload
        elif name == "tRNS":
            trns = payload

    raw = zlib.decompress(
        b"".join(p for n, p in read_chunks(data) if n == "IDAT")
    )
    stride = width * channels
    prev = bytearray(stride)
    rows, pos = [], 0
    for _ in range(height):
        filt = raw[pos]
        pos += 1
        line = bytearray(raw[pos : pos + stride])
        pos += stride
        for x in range(stride):
            a = line[x - channels] if x >= channels else 0
            b = prev[x]
            c = prev[x - channels] if x >= channels else 0
            if filt == 1:
                line[x] = (line[x] + a) & 255
            elif filt == 2:
                line[x] = (line[x] + b) & 255
            elif filt == 3:
                line[x] = (line[x] + ((a + b) >> 1)) & 255
            elif filt == 4:
                line[x] = (line[x] + paeth(a, b, c)) & 255
        rows.append(line)
        prev = line

    out = bytearray(width * height * 4)
    for y in range(height):
        row = rows[y]
        for x in range(width):
            if color_type == 3:
                idx = row[x]
                r, g, b = palette[idx * 3 : idx * 3 + 3]
                a = trns[idx] if trns and idx < len(trns) else 255
            elif color_type == 6:
                r, g, b, a = row[x * 4 : x * 4 + 4]
            elif color_type == 2:
                r, g, b = row[x * 3 : x * 3 + 3]
                a = 255
            else:
                raise SystemExit(f"unsupported colour type {color_type}")
            o = (y * width + x) * 4
            out[o : o + 4] = bytes((r, g, b, a))
    return width, height, out


def clear_background(width, height, px):
    """Zero the alpha of transparent-or-white pixels reachable from the border."""

    def is_bg(i):
        r, g, b, a = px[i : i + 4]
        return a < 16 or (r > WHITE_MIN and g > WHITE_MIN and b > WHITE_MIN)

    seen = bytearray(width * height)
    queue = deque()
    for x in range(width):
        for y in (0, height - 1):
            queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            queue.append((x, y))

    cleared = 0
    while queue:
        x, y = queue.popleft()
        if not (0 <= x < width and 0 <= y < height):
            continue
        n = y * width + x
        if seen[n]:
            continue
        i = n * 4
        if not is_bg(i):
            continue
        seen[n] = 1
        if px[i + 3]:
            px[i + 3] = 0
            cleared += 1
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return cleared


def write_png(path, width, height, px):
    raw = bytearray()
    for y in range(height):
        raw.append(0)
        raw += px[y * width * 4 : (y + 1) * width * 4]

    def chunk(name, payload):
        body = name.encode("latin1") + payload
        return struct.pack(">I", len(payload)) + body + struct.pack(
            ">I", zlib.crc32(body) & 0xFFFFFFFF
        )

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    with open(path, "wb") as fh:
        fh.write(b"\x89PNG\r\n\x1a\n")
        fh.write(chunk("IHDR", ihdr))
        fh.write(chunk("IDAT", zlib.compress(bytes(raw), 9)))
        fh.write(chunk("IEND", b""))


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    w, h, pixels = to_rgba(open(src, "rb").read())
    n = clear_background(w, h, pixels)
    write_png(dst, w, h, pixels)
    print(f"{src} -> {dst}: cleared {n} background px ({w}x{h})")
