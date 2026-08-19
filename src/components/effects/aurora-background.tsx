export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--accent)]/25 blur-[120px] motion-safe:animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[var(--accent-secondary)]/20 blur-[100px] motion-safe:animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[500px] rounded-full bg-[var(--accent-tertiary)]/20 blur-[110px] motion-safe:animate-[pulse_12s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_var(--surface-border)_1px,_transparent_0)] [background-size:32px_32px] opacity-40" />
    </div>
  );
}
