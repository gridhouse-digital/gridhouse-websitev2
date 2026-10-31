export default function ShellCornerMarkers() {
  const base =
    "absolute w-2 h-2 border border-white/20 z-50 pointer-events-none";
  return (
    <>
      <span className={`${base} top-2 left-2`} />
      <span className={`${base} top-2 right-2`} />
      <span className={`${base} bottom-2 left-2`} />
      <span className={`${base} bottom-2 right-2`} />
    </>
  );
}
