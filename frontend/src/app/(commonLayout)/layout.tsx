import Navbar from "@/components/Navbar/navbar";

export default function Commonlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <Navbar/>
    {children}</div>;
}
