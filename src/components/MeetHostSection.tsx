import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import hostPortrait from "@/assets/host-portrait.png";

const MeetHostSection = () => {
  return (
    <section className="section-padding bg-section-sage">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12 fade-in">
          Meet Your Host
        </h2>

        <div className="grid md:grid-cols-[1fr_1.5fr_auto] gap-8 md:gap-12 items-center">
          {/* Portrait */}
          <div className="fade-in fade-in-delay-1">
            <img
              src={hostPortrait}
              alt="Elizabeth Bucher"
              className="w-full max-w-xs mx-auto rounded-2xl"
            />
          </div>

          {/* Bio text */}
          <div className="fade-in fade-in-delay-2">
            <div className="w-12 h-0.5 bg-primary mb-6" />
            <p className="text-base font-body text-foreground leading-relaxed">
              Hi, I'm Elizabeth. I'm a seeker of truth, a lover of dance, a mother to two boys, and—as it turns out—very, very autistic. For years, I thought I was just 'intense' or 'difficult,' when really, my brain was just running a much more interesting operating system. I created this space for the women who have been called 'too much' or 'too blunt' for simply stating the facts. Expect deep dives into the autistic psyche, a healthy dose of sarcasm, and a complete refusal to settle for anything less than the truth. I'm here to help you realize that your 'red flags' are actually just your finely tuned discernment.
            </p>
          </div>

          {/* Name + Social */}
          <div className="fade-in fade-in-delay-3 text-center md:text-left">
            <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1">Host</p>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              liz<br />Bucher
            </h3>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetHostSection;
