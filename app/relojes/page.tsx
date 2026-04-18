import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Relojes — LD Watches",
  description:
    "Relojes premium para cada estilo y ocasión. Colección seleccionada a mano por Larry Laracuente en Mayagüez, Puerto Rico.",
};

export default function RelojesPage() {
  return <CategoryPage category="relojes" />;
}
