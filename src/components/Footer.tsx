import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.jpg";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Episodes", href: "/episodes" },
  { label: "Autism Quiz", href: "/autism-quiz" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Logo & tagline */}
          <div>
            <img src={logo} alt="Femme on the Spectrum" className="h-20 md:h-24 w-auto mb-4 rounded-lg" />
            <p className="text-sm text-primary-foreground/60 font-body leading-relaxed">
              A podcast for women who were told they're "too much" — and are finally realizing they were always just right.
            </p>
          </div>

          {/* Site links */}
          <div>
            <h4 className="text-sm font-display font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-body text-primary-foreground/60 hover:text-primary transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & copyright */}
          <div>
            <h4 className="text-sm font-display font-bold uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-xs font-body text-primary-foreground/40">
              © {new Date().getFullYear()} Femme on the Spectrum. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
