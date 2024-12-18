import { ReactNode } from "react";
import Navbar from "./_components/navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
