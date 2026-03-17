import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 md:pt-32">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
