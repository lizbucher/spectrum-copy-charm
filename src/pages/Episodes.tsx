import Header from "@/components/Header";
import { Play } from "lucide-react";
import episodeThumb from "@/assets/episode-thumb.jpg";
import spotifyIcon from "@/assets/spotify-icon.png";
import amazonMusicIcon from "@/assets/amazon-music-icon.png";
import applePodcastsIcon from "@/assets/apple-podcasts-icon.png";
import iheartIcon from "@/assets/iheart-icon.png";

const allEpisodes = [
  {
    title: 'The Syllables of Violence — Renee Nicole Good (Or: Why "Fucking Bitch" is a Death Threat)',
    excerpt:
      'Elizabeth discusses the deep-seated rage that some men exhibit towards women who challenge their perceived entitlement, particularly those who are neurodivergent. She recalls a tragic case and unpacks the language of violence against women.',
    date: "Dec 2025",
  },
  {
    title: "The Autopsy of Neurospicy Betrayal",
    excerpt:
      "Host Elizabeth examines the complicated downfall of a once strong bond with her brother, detailing a backstory fraught with familial toxicity and the unique pain of betrayal experienced through a neurodivergent lens.",
    date: "Dec 2025",
  },
  {
    title: 'The Accountability Trap (or, Why "I\'m Sorry" is Never Enough)',
    excerpt:
      "Elizabeth discusses the complexities of dealing with criticism and misunderstandings from a neurodivergent perspective, highlighting the autistic tendency to provide exhaustive context in an attempt to be understood.",
    date: "Dec 2025",
  },
];

const platformLinks = [
  { icon: spotifyIcon, alt: "Spotify", href: "https://open.spotify.com/show/59IYYFkvsbUh3Su78ltJhx" },
  { icon: amazonMusicIcon, alt: "Amazon Music", href: "https://music.amazon.com/podcasts/b17d41b2-d62e-4e88-a625-37d2769f17dc" },
  { icon: applePodcastsIcon, alt: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/femme-on-the-spectrum-autism-high-functioning-female/id1772086556" },
  { icon: iheartIcon, alt: "iHeart Radio", href: "https://iheart.com/podcast/223164906" },
];

const Episodes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="section-padding pt-32 md:pt-40 bg-section-warm">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Episodes
          </h1>

          <h6 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-6">
            Subscribe and listen on a major platform
          </h6>
          <div className="flex items-center justify-center gap-6">
            {platformLinks.map((p) => (
              <a key={p.alt} href={p.href} target="_blank" rel="noopener noreferrer">
                <img src={p.icon} alt={p.alt} className="w-14 h-14 rounded-xl hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-10 fade-in">
            All Episodes
          </h2>

          <div className="space-y-8">
            {allEpisodes.map((episode, index) => (
              <article
                key={index}
                className="group flex flex-col sm:flex-row gap-6 items-start fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-40 flex-shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={episodeThumb}
                    alt={episode.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={32} className="text-primary-foreground drop-shadow-md" fill="currentColor" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-body text-muted-foreground mb-1 block">{episode.date}</span>
                  <h3 className="text-base md:text-lg font-body font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                    {episode.title}
                  </h3>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">
                    {episode.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Episodes;
