import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Carteras — LD Watches",
  description:
    "Carteras premium de cuero seleccionadas a mano. Calidad y estilo para el hombre que sabe lo que quiere.",
};

export default function CarterasPage() {
  return <CategoryPage category="carteras" />;
}
