import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Cadenas — LD Watches",
  description:
    "Cadenas y accesorios que hablan por ti. Colección seleccionada a mano por Larry Laracuente.",
};

export default function CadenasPage() {
  return <CategoryPage category="cadenas" />;
}
