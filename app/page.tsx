import Header from "@/components/Header";
import HeroGroup from "@/components/HeroGroup";
import CollectionsTeaser from "@/components/CollectionsTeaser";
import InstagramCTA from "@/components/InstagramCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
