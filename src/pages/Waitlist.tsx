import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Loader2, Heart } from "lucide-react";
import { api } from "@/lib/api";

const Waitlist = () => {
  const [form, setForm] = useState({ firstName: "", email: "", state: "", seeking: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Please enter a valid email";
    if (!form.state.trim()) errs.state = "Please tell me your state — telehealth is licensure-bound";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      await api.waitlistSignup({
        email: form.email.trim(),
        firstName: form.firstName.trim() || undefined,
        state: form.state.trim() || undefined,
        seeking: form.seeking.trim() || undefined,
        notes: form.notes.trim() || undefined,
      });
      setSubmitted(true);
    } catch (err: any) {
      setServerError(err?.message || "Could not submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="section-padding pt-32 md:pt-40 bg-section-warm">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-primary mb-4">Pre-Licensure Waitlist</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            Want to work with me when I'm licensed?
          </h1>
          <p className="text-base md:text-lg font-body text-muted-foreground leading-relaxed mb-6">
            I'm a late-diagnosed AuDHD mom of two, currently in my Master of Social Work program. Once I'm fully licensed (telehealth, 2028), I'll be opening a private practice for women like us.
          </p>

          <div className="bg-background border-2 border-primary/20 rounded-2xl p-6 mb-10">
            <p className="text-sm font-body text-foreground leading-relaxed">
              <strong className="text-primary">Important & honest:</strong> I am <strong>not yet a licensed therapist.</strong> I cannot provide therapy or psychological advice today. This waitlist exists so I can let you know when I open my practice (estimated 2028), and so we can stay in touch through my newsletter until then. Joining the waitlist does <em>not</em> create a therapeutic relationship.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-section-sage rounded-2xl border border-border p-10 text-center fade-in">
              <CheckCircle2 size={48} className="mx-auto mb-6 text-primary" />
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">You're on the list.</h2>
              <p className="text-base font-body text-muted-foreground leading-relaxed mb-6">
                Check your inbox in a minute — I just sent you a confirmation. I'll be in touch every couple of weeks with something real (no fluff, no marketing).
              </p>
              <a href="/episodes" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                <Heart size={16} /> While you wait, listen to the podcast
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">Join the waitlist</h2>
              <p className="text-sm font-body text-muted-foreground mb-6">A couple quick questions so I know how to help when I can.</p>

              <div>
                <label className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">First name <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input type="text" maxLength={100} value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="So I can address you by name" />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">Email</label>
                <input type="email" maxLength={255} value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="you@example.com" />
                {errors.email && <p className="text-xs font-body text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">State of residence</label>
                <input type="text" maxLength={50} value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. California — telehealth is state-specific" />
                {errors.state && <p className="text-xs font-body text-destructive mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">What are you hoping to work on? <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea maxLength={1000} value={form.seeking} rows={3}
                  onChange={(e) => setForm({ ...form, seeking: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Late diagnosis processing, AuDHD parenting, burnout, masking, etc." />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">Anything else? <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea maxLength={2000} value={form.notes} rows={3}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Anything you want me to know" />
              </div>
              {serverError && <p className="text-sm font-body text-destructive bg-destructive/10 rounded-lg px-4 py-3">{serverError}</p>}
              <button type="submit" disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-body font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
                {submitting ? <><Loader2 size={16} className="animate-spin inline mr-2" />Joining…</> : "Join the Waitlist"}
              </button>
              <p className="text-xs font-body text-muted-foreground text-center">
                I'll send you something real every couple weeks. Unsubscribe any time.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Waitlist;
