import { useState } from "react";
import { Send } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name) errs.name = "Name is required";
    else if (name.length > 100) errs.name = "Name must be under 100 characters";

    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email";
    else if (email.length > 255) errs.email = "Email must be under 255 characters";

    if (!message) errs.message = "Message is required";
    else if (message.length > 2000) errs.message = "Message must be under 2000 characters";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="section-padding bg-section-sage">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 fade-in">
          Get in Touch
        </h2>
        <p className="text-base font-body text-muted-foreground mb-10 fade-in fade-in-delay-1">
          Have a question, a story to share, or want to collaborate? Drop a message below.
        </p>

        {submitted ? (
          <div className="bg-background rounded-2xl border border-border p-10 text-center fade-in">
            <Send size={32} className="mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-display font-bold text-foreground mb-2">Message Sent!</h3>
            <p className="text-sm font-body text-muted-foreground mb-6">
              Thank you for reaching out. We'll get back to you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm font-body font-semibold text-primary hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 fade-in fade-in-delay-2" noValidate>
            <div>
              <label htmlFor="name" className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Your name"
              />
              {errors.name && <p className="text-xs font-body text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="you@email.com"
              />
              {errors.email && <p className="text-xs font-body text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                maxLength={2000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="What's on your mind?"
              />
              {errors.message && <p className="text-xs font-body text-destructive mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Send Message <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
