// import Navbar from "@/components/Layout/Navbar/navbar";

import { Footer, Navbar } from "@/components/Layout";

export default function Commonlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
