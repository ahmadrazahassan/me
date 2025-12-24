import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ServicesModern } from "@/components/sections/ServicesModern";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
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
      <ServicesModern />
      <SelectedWork />
      <About />
      <Testimonials />
      <ContactCTA />
    </Layout>
  );
};

export default Index;