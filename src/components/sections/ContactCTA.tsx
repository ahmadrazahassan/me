import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Send } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PillButton } from "@/components/ui/PillButton";
import { useToast } from "@/hooks/use-toast";

const budgetOptions = [
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k+", label: "$50,000+" },
];

const features = [
  "Typical response within 24 hours",
  "Projects starting from $5,000",
  "Flexible payment plans available",
  "Free initial consultation",
];

export function ContactCTA() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", budget: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-foreground text-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-background/60">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                <span className="uppercase tracking-wider">Get in touch</span>
              </div>
              <h2 className="heading-lg text-background">
                Ready to build something{" "}
                <span className="text-primary">bold</span>?
              </h2>
              <p className="text-lg text-background/70 leading-relaxed">
                Let's discuss your project and see how we can help bring your
                vision to life.
              </p>
            </div>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-background/80"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Column - Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-background/5 rounded-3xl p-6 md:p-8 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-background/60">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-background/60">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm text-background/60">
                Budget
              </label>
              <select
                id="budget"
                required
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-foreground">
                  Select a budget range
                </option>
                {budgetOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-foreground"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-background/60">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <PillButton type="submit" size="lg" showArrow className="w-full justify-center">
              Send message
            </PillButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}