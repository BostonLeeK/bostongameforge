import About from "@/components/About";
import Contact from "@/components/Contact";
import Games from "@/components/Games";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Games />
      <Contact />
    </main>
  );
}
