export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-[family-name:var(--font-heading)] text-base font-semibold">
              Kingdom Artists
            </span>
            <p className="text-background/25 text-xs sm:text-sm mt-1.5 max-w-xs leading-relaxed">
              The home for Kingdom creatives. Discover, connect, and build
              together.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-background/35">
            <a href="/discover" className="hover:text-background/80 transition-colors">
              Discover
            </a>
            <a href="#mission" className="hover:text-background/80 transition-colors">
              Mission
            </a>
            <a href="#join" className="hover:text-background/80 transition-colors">
              Join Waitlist
            </a>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 pt-6 border-t border-background/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-background/15">
          <span>&copy; 2026 Kingdom Artists. All rights reserved.</span>
          <span>Built with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
