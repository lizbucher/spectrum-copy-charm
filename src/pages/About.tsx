import Header from "@/components/Header";
import Footer from "@/components/Footer";
import hostPortrait from "@/assets/host-portrait.png";
import aboutPortrait from "@/assets/about-portrait.png";
import spotifyIcon from "@/assets/spotify-icon.png";
import amazonMusicIcon from "@/assets/amazon-music-icon.png";
import applePodcastsIcon from "@/assets/apple-podcasts-icon.png";
import iheartIcon from "@/assets/iheart-icon.png";

const platformLinks = [
  { icon: spotifyIcon, alt: "Spotify", href: "https://open.spotify.com/show/59IYYFkvsbUh3Su78ltJhx" },
  { icon: amazonMusicIcon, alt: "Amazon Music", href: "https://music.amazon.com/podcasts/b17d41b2-d62e-4e88-a625-37d2769f17dc" },
  { icon: applePodcastsIcon, alt: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/femme-on-the-spectrum-autism-high-functioning-female/id1772086556" },
  { icon: iheartIcon, alt: "iHeart Radio", href: "https://iheart.com/podcast/223164906" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner with portrait */}
      <section className="relative">
        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-[420px]">
            <img
              src={aboutPortrait}
              alt="Elizabeth Bucher"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex items-center justify-center p-10 md:p-16 bg-background">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground fade-in">
              About
            </h1>
          </div>
        </div>
      </section>

      {/* Heart & Mind section */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Left column */}
            <div className="fade-in">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                The Heart & Mind Behind the Mic
              </h2>
              <div className="w-12 h-0.5 bg-primary mb-8" />
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                I'm <strong>Elizabeth Bucher</strong>, and I am right there with you.
              </p>
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                I am a mother, a dancer, a truth-seeker, and a survivor. I am currently pursuing my MSW at National University with a singular goal: to open a private practice that empowers women to stop apologizing for who they are.
              </p>
              <p className="text-base font-body text-foreground leading-relaxed">
                But before all that? I was just a woman trying to navigate a world that felt like it was written in a language I hadn't been taught.
              </p>
            </div>

            {/* Right column */}
            <div className="fade-in fade-in-delay-1">
              <p className="text-base font-body font-bold text-foreground mb-3">
                The Mirror in the Little Boy
              </p>
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                My journey to <em>Femme on the Spectrum</em> didn't start in a lecture hall. It started with my son, Max, born in 2017.
              </p>
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                Like any fiercely protective mother, I dove headfirst into understanding his world when we began navigating his diagnosis. I wanted to be his advocate. I wanted to clear the path for him. But as I peeled back the layers of his experiences—his sensory processing, his unique logic, his beautiful, unfiltered way of being—I felt a shock of recognition.
              </p>
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                I wasn't just looking at my son. <strong>I was looking in a mirror.</strong>
              </p>
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                The traits I saw in him were the same ones I had spent a lifetime burying under layers of performance, "coping mechanisms," and social anxiety. The sensory overload I thought was just "stress." The deep, philosophical fixation I thought was just "being intense." The social exhaustion I thought was just "introversion."
              </p>
              <p className="text-sm font-body text-muted-foreground leading-relaxed italic">
                It turns out, the apple didn't fall far from the tree—the tree was just really good at pretending to be a different species.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Host */}
      <section className="section-padding bg-section-sage">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12 fade-in">
            Meet Your Host
          </h2>
          <div className="grid md:grid-cols-[1fr_1.5fr_auto] gap-8 md:gap-12 items-start">
            <div className="fade-in fade-in-delay-1">
              <img
                src={hostPortrait}
                alt="Elizabeth Bucher"
                className="w-full max-w-xs mx-auto rounded-2xl"
              />
            </div>
            <div className="fade-in fade-in-delay-2">
              <p className="text-base font-body font-bold text-foreground mb-3">
                Unmasking the "Lost Generation"
              </p>
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                That realization began my own journey of diagnosis (ADHD and Autism) and self-discovery. It wasn't easy. Unmasking is messy. It requires grieving the years you spent fighting your own brain. But it also brings a profound sense of justice and clarity.
              </p>
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                I realized I wasn't broken. I was a neurodivergent woman living in a neurotypical world, surviving on grit and pattern recognition.
              </p>
              <p className="text-base font-body text-foreground leading-relaxed">
                I look at my boys now—Max and his younger brother Gavin (born 2022)—and I refuse to let them inherit the shame or the confusion. And I refuse to let other women navigate this alone.
              </p>
            </div>
            <div className="fade-in fade-in-delay-3 text-center md:text-left">
              <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-1">Host</p>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight mb-4">
                Liz<br />Bucher
              </h3>
              <div className="flex gap-3 justify-center md:justify-start">
                {platformLinks.map((p) => (
                  <a key={p.alt} href={p.href} target="_blank" rel="noopener noreferrer">
                    <img src={p.icon} alt={p.alt} className="w-10 h-10 rounded-lg hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewrite the Narrative */}
      <section className="section-padding bg-section-warm">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Let's Rewrite the Narrative
          </h2>
          <p className="text-base md:text-lg font-body font-semibold text-foreground leading-relaxed mb-4">
            This space is for the women who were called "bossy" when they were actually showing leadership. For the girls called "dramatic" when they were experiencing sensory pain. For the "weird" kids who grew up to be incredible, insightful women.
          </p>
          <p className="text-base md:text-lg font-body font-semibold text-primary leading-relaxed">
            Welcome home. Let's unmask together.
          </p>
        </div>
      </section>

      {/* The Artist, Mentor, Advocate */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto fade-in">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
            The Artist, The Mentor, The Advocate
          </h3>
          <div className="w-12 h-0.5 bg-primary mb-8" />
          <p className="text-base font-body text-foreground leading-relaxed mb-6">
            My background is in Dance and Theatre (University at Buffalo), and for years, the stage was the one place where my intensity made sense. That artistic soul still drives me. I approach therapy and advocacy the same way I approach choreography: looking for the rhythm, the underlying structure, and the authentic expression of the self.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed">
            I blend that artistic spirit with the mind of a philosopher and the heart of a mentor. I don't deal in surface-level platitudes. I want the truth. I want the nuanced, messy, beautiful reality of what it means to be a woman on the spectrum.
          </p>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="section-padding bg-section-sage">
        <div className="max-w-4xl mx-auto fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10">
            What You Can Expect Here
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-display font-bold text-primary mb-2">Radical Validation</h4>
              <p className="text-base font-body text-foreground leading-relaxed">I believe you. Period.</p>
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-primary mb-2">The "Why" Behind the "What"</h4>
              <p className="text-base font-body text-foreground leading-relaxed">We don't just talk about behaviors; we dissect the neurology and the logic behind them.</p>
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-primary mb-2">Humor</h4>
              <p className="text-base font-body text-foreground leading-relaxed">Because if we can't laugh at the absurdity of social norms or our own executive dysfunction, we'll cry. (And I prefer laughing).</p>
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-primary mb-2">Zero Judgment</h4>
              <p className="text-base font-body text-foreground leading-relaxed">Whether you're self-diagnosed, formally diagnosed, or just questioning—you belong here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* More about Liz - The Real Life */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto fade-in">
          <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-2">more about</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Liz
          </h2>
          <h3 className="text-xl font-display font-bold text-foreground mb-6">
            The "Real" Life
          </h3>
          <div className="w-12 h-0.5 bg-primary mb-8" />
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            When I'm not studying for my MSW or recording the podcast, I'm navigating the beautiful chaos of raising two boys. You'll usually find me with my cream English Golden, Rosie, by my side (and forever carrying the memory of Tucker, my beloved yellow lab).
          </p>
          <p className="text-base font-body text-foreground leading-relaxed">
            I love music that makes you feel something, travel that expands your mind, and conversations that go deep fast.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
