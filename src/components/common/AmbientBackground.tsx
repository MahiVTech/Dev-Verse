export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-40 animate-grid-pan" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan/20 blur-[120px] animate-float" />
      <div
        className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-violet/20 blur-[130px] animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-cyan/10 blur-[110px] animate-float"
        style={{ animationDelay: "3s" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
