import dynamic from "next/dynamic";
import Header from "@/components/Header";
import CollectionsTeaser from "@/components/CollectionsTeaser";
import InstagramCTA from "@/components/InstagramCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const HeroGroup = dynamic(() => import("@/components/HeroGroup"), { ssr: false });

export default function Home() {
  return (
    <main>
      <Header />
      <HeroGroup />
      <CollectionsTeaser />
      <InstagramCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
