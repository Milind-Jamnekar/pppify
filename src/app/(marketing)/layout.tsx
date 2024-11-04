import { ReactNode } from "react";
import Navbar from "./_components/navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="selection:bg-teal-200">
      <Navbar />
      {children}
    </div>
  );
}
