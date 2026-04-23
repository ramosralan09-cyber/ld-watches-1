import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Gafas — LD Watches",
  description:
    "Gafas seleccionadas a mano por Larry Laracuente. Estilo que se nota desde lejos.",
};

export default function GafasPage() {
  return <CategoryPage category="gafas" />;
}
