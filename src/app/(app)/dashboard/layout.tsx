import { ReactNode } from "react";
import Navbar from "./_components/navbar";

function DashboardPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container">{children}</main>
    </div>
  );
}

export default DashboardPageLayout;
