import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <Benefits />
      <Process />
      <Stats />
      <SelectedWork />
      <About />
      <Testimonials />
      <ContactCTA />
    </Layout>
  );
};

export default Index;