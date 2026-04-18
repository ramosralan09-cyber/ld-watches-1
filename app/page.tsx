import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/Header";
import ScrollSection from "@/components/ScrollSection";
import InstagramCTA from "@/components/InstagramCTA";
import CollectionsTeaser from "@/components/CollectionsTeaser";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <Header />
      <ScrollSection />
      <InstagramCTA />
      <CollectionsTeaser />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
