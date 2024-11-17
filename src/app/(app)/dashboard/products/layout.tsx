import { ReactNode } from "react";

export default function ProductsLayoutPage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="border p-5 rounded-md overflow-hidden">{children}</div>
  );
}
