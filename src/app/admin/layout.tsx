import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | Kingdom Artists",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="font-[family-name:var(--font-heading)] text-lg font-semibold"
            >
              KA Admin
            </Link>
            <span className="text-xs px-2 py-0.5 rounded-full bg-foreground text-background font-medium">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View Site &rarr;
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
