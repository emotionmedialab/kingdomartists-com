import { AppNavbar } from "@/components/app/app-navbar";
import { BottomNav } from "@/components/app/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      <div className="pt-14 sm:pt-16 pb-16 md:pb-0 min-h-screen">
        {children}
      </div>
      <BottomNav />
    </>
  );
}
