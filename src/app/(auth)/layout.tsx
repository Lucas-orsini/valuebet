export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </main>
  );
}
