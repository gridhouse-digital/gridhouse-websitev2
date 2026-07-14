import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

// Vertex + fragment shaders ported from Aether-System-Terminal-Hero.html.
const VERTEX = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_seed;

vec3 cDark = vec3(0.04, 0.04, 0.04);
vec3 cMid = vec3(0.08, 0.08, 0.08);
vec3 cAccent1 = vec3(1.0, 0.27, 0.0);
vec3 cAccent2 = vec3(0.8, 0.0, 0.3);
vec3 cLine = vec3(0.15, 0.15, 0.15);

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float cols = 18.0;
  float nX = uv.x + sin(uv.x * 2.0) * 0.01;
  float cIdx = floor(nX * cols);
  float animSpeed = random(vec2(cIdx, u_seed)) * 0.05;
  float direction = random(vec2(cIdx, u_seed + 1.0)) > 0.5 ? 1.0 : -1.0;
  float animY = uv.y + (u_time * animSpeed * direction);
  float rows = floor(random(vec2(cIdx, 2.0)) * 6.0) + 1.0;
  float rIdx = floor(animY * rows);
  float rnd = random(vec2(cIdx + u_seed, rIdx));
  vec3 color = cDark;
  if (rnd > 0.97) color = cAccent1;
  else if (rnd > 0.92) color = cAccent2;
  else if (rnd > 0.6) color = cMid;
  if (random(vec2(cIdx, 3.0)) > 0.85) {
    float solidRnd = random(vec2(cIdx, 4.0));
    if (solidRnd > 0.9) color = cAccent1;
    else color = cMid;
  }
  float withinCol = fract(nX * cols);
  if (withinCol > 0.92) {
    color = cLine;
  }
  gl_FragColor = vec4(color, 1.0);
}`;

interface Props {
  className?: string;
  seed?: number;
}

export default function SimulationMatrixCanvas({
  className = "",
  seed = 14.2,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      setFailed(true);
      return;
    }

    const compile = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error("Shader compile failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    const program = gl.createProgram();
    if (!program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error("Program link failed:", gl.getProgramInfoLog(program));
      setFailed(true);
      return;
    }

    const positionLoc = gl.getAttribLocation(program, "position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uSeed = gl.getUniformLocation(program, "u_seed");

    const ensureSize = () => {
      const dw = Math.max(1, canvas.clientWidth);
      const dh = Math.max(1, canvas.clientHeight);
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
      }
    };

    const drawFrame = (timeMs: number) => {
      ensureSize();
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uRes, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(uTime, timeMs * 0.0005);
      gl.uniform1f(uSeed, seed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    let raf = 0;
    if (reduced) {
      // Render a single static frame so the panel isn't blank.
      drawFrame(0);
    } else {
      const loop = (t: number) => {
        drawFrame(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    // Catch parent-size changes (and the very first layout pass).
    const ro = new ResizeObserver(() => {
      ensureSize();
      if (reduced) drawFrame(0);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
      // Intentionally NOT calling loseContext(): the canvas DOM element is
      // preserved by React across StrictMode remounts, and a lost context
      // cannot be restored, which causes the next mount's shaders to fail.
    };
  }, [reduced, seed]);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 bg-void bg-tech-grid-16 ${className}`}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full block bg-void ${className}`}
      aria-hidden
    />
  );
}
