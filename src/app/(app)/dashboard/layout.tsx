import { ReactNode } from "react";
import Navbar from "./_components/navbar";

function DashboardPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container flex-1">{children}</main>
    </div>
  );
}

export default DashboardPageLayout;
