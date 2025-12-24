export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { id: "studio", label: "Studio", href: "#about" },
  { id: "work", label: "Work", href: "#work" },
  { id: "services", label: "Services", href: "#services" },
  { id: "process", label: "Process", href: "#process" },
  { id: "contact", label: "Contact", href: "#contact" },
];