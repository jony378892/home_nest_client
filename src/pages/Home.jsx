import Cities from "../components/Cities";
import Featured from "../components/Featured";
import Hero from "../components/Hero";
import PropertyTypes from "../components/PropertyTypes";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Cities />
      <Featured />
      <PropertyTypes />
      <WhyChooseUs />
    </main>
  );
}
