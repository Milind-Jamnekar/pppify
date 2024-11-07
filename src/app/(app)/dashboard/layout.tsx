import { ReactNode } from "react";
import Navbar from "./_components/navbar";

function DashboardPageLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-accent/5 min-h-screen pt-8">
      <Navbar />
      {children}
    </main>
  );
}

export default DashboardPageLayout;
