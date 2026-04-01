export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#09090b] relative overflow-hidden flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(242,203,56,0.08),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-[#09090b] to-[#09090b]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/3 blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12">
        {children}
      </div>
    </main>
  );
}
