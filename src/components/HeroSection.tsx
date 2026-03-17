import { ArrowRight } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.png";

import spotifyIcon from "@/assets/spotify-icon.png";
import amazonIcon from "@/assets/amazon-music-icon.png";
import appleIcon from "@/assets/apple-podcasts-icon.png";
import iheartIcon from "@/assets/iheart-icon.png";

const platformLinks = [
  { icon: spotifyIcon, href: "https://open.spotify.com/show/59IYYFkvsbUh3Su78ltJhx", alt: "Spotify" },
  { icon: amazonIcon, href: "https://music.amazon.com/podcasts/b17d41b2-d62e-4e88-a625-37d2769f17dc", alt: "Amazon Music" },
  { icon: appleIcon, href: "https://podcasts.apple.com/us/podcast/femme-on-the-spectrum-autism-high-functioning-female/id1772086556", alt: "Apple Podcasts" },
  { icon: iheartIcon, href: "https://iheart.com/podcast/223164906", alt: "iHeartRadio" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex">
      {/* Left image - takes up ~40% on desktop */}
      <div className="hidden md:block w-[40%] relative overflow-hidden">
        <img
          src={aboutPortrait}
          alt="Liz Bucher with microphone"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* Right content */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-24 pb-16">
        <div className="max-w-2xl">
          <p className="text-sm font-body text-muted-foreground mb-4 fade-in">
            With Liz Bucher, MSW Graduate Candidate
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 fade-in fade-in-delay-1">
            Unmasking the Reality of Neurodivergent Womanhood.
          </h1>
          <p className="text-base font-body text-foreground leading-relaxed mb-8 fade-in fade-in-delay-2">
            I spent decades feeling like everyone else had a script to life that I was never given. My late diagnosis of autism and ADHD was the missing key. Now, as a survivor, a mother, and an MSW candidate aiming for private practice, I'm turning that lived experience into a roadmap for others. "Femme on the Spectrum" is where we dissect life scenarios to find the truth, humor, and power in our unique wiring. We don't do surface-level here.
          </p>
          <a
            href="#episodes"
            className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:gap-3 transition-all duration-300 fade-in fade-in-delay-3"
          >
            Latest Episodes <ArrowRight size={16} />
          </a>
        </div>

        {/* Subscribe platforms */}
        <div className="mt-16">
          <h6 className="text-sm font-display font-semibold text-foreground mb-6">
            Subscribe and listen on a major platform
          </h6>
          <div className="flex items-center gap-6">
            {platformLinks.map((platform) => (
              <a
                key={platform.alt}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img src={platform.icon} alt={platform.alt} className="w-16 h-16" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile hero image */}
      <div className="md:hidden absolute inset-0 -z-10 opacity-10">
        <img
          src={aboutPortrait}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
