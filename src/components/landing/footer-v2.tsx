export function FooterV2() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-heading)] text-sm font-semibold text-background/60">
            Kingdom Artists
          </span>
          <span className="text-[11px] text-background/15">
            &copy; 2026 Kingdom Artists. Built with purpose.
          </span>
        </div>
      </div>
    </footer>
  );
}
