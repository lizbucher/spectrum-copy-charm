import { ArrowRight } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.png";
import episodeThumb from "@/assets/episode-thumb.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-section-warm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 fade-in">
          About Elizabeth: The Heart & Mind Behind the Mic
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: About text */}
          <div className="fade-in fade-in-delay-1">
            <p className="text-base font-body text-foreground leading-relaxed mb-6">
              Welcome to the Intersection of Truth, Humor, and Neurodivergence.
            </p>
            <p className="text-base font-body text-foreground leading-relaxed mb-8">
              If you are here, you probably know the feeling of being "too much" and "not enough" all at the same time. You know the exhaustion of high-functioning masking, the chaos of a brain that never stops connecting dots, and the loneliness of seeing the world in a way nobody else seems to understand..
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:gap-3 transition-all duration-300"
            >
              Read More <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: Portrait + Latest Episode */}
          <div className="space-y-8 fade-in fade-in-delay-2">
            <img
              src={aboutPortrait}
              alt="Femme on the Spectrum"
              className="w-full max-w-sm rounded-2xl"
            />
            <div>
              <h6 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-4">
                Latest Episode
              </h6>
              <a href="#episodes" className="flex items-center gap-4 group">
                <img
                  src={episodeThumb}
                  alt="Latest episode"
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <span className="text-sm font-body font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  The Syllables of Violence- Renee Nicole Good (Or: Why "Fucking Bitch" is a Death Threat)
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
