import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Play, Loader2 } from "lucide-react";
import spotifyIcon from "@/assets/spotify-icon.png";
import amazonMusicIcon from "@/assets/amazon-music-icon.png";
import applePodcastsIcon from "@/assets/apple-podcasts-icon.png";
import iheartIcon from "@/assets/iheart-icon.png";

const BUZZSPROUT_LISTEN_URL = "https://www.buzzsprout.com/2617075";

const platformLinks = [
  { icon: spotifyIcon, alt: "Spotify", href: "https://open.spotify.com/show/59IYYFkvsbUh3Su78ltJhx" },
  { icon: amazonMusicIcon, alt: "Amazon Music", href: "https://music.amazon.com/podcasts/b17d41b2-d62e-4e88-a625-37d2769f17dc" },
  { icon: applePodcastsIcon, alt: "Apple Podcasts (coming soon)", href: BUZZSPROUT_LISTEN_URL },
  { icon: iheartIcon, alt: "iHeart Radio", href: "https://iheart.com/podcast/223164906" },
];

interface ApiEpisode {
  guid: string;
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string | null;
  durationSec: number | null;
  episodeNumber: number | null;
  artworkUrl: string | null;
  link: string | null;
}

interface EpisodesResponse {
  show: { title: string; feedUrl: string };
  episodes: ApiEpisode[];
}

const formatDate = (s: string) => {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const formatDuration = (sec: number | null) => {
  if (!sec || sec <= 0) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
};

const Episodes = () => {
  const { data, isLoading, isError } = useQuery<EpisodesResponse>({
    queryKey: ["episodes"],
    queryFn: async () => {
      const res = await fetch("/api/episodes");
      if (!res.ok) throw new Error("Failed to load episodes");
      return res.json();
    },
    staleTime: 1000 * 60 * 15,
  });

  const episodes = data?.episodes ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 md:pt-40 pb-8 bg-section-warm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Episodes
          </h1>
          <p className="text-base md:text-lg font-body text-foreground/70 max-w-2xl mx-auto">
            New episodes drop weekly. Listen on your favorite platform — or right here.
          </p>
        </div>
      </section>

      <section className="pb-12 bg-section-warm">
        <div className="flex items-center justify-center gap-8 md:gap-12">
          {platformLinks.map((p) => (
            <a key={p.alt} href={p.href} target="_blank" rel="noopener noreferrer">
              <img src={p.icon} alt={p.alt} className="w-16 h-16 md:w-20 md:h-20 hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </section>

      <section className="section-padding bg-section-warm">
        <div className="max-w-6xl mx-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
              <span className="ml-3 font-body text-foreground/60">Loading episodes…</span>
            </div>
          )}

          {isError && (
            <div className="text-center py-20 font-body text-foreground/70">
              Couldn't load episodes right now. Catch them on{" "}
              <a className="underline text-primary" href={platformLinks[2].href} target="_blank" rel="noopener noreferrer">
                Apple Podcasts
              </a>{" "}
              or{" "}
              <a className="underline text-primary" href={platformLinks[0].href} target="_blank" rel="noopener noreferrer">
                Spotify
              </a>.
            </div>
          )}

          {!isLoading && !isError && episodes.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">Episodes coming soon</h3>
              <p className="font-body text-foreground/70 max-w-xl mx-auto mb-6">
                We're loading 53 episodes back into the feed. In the meantime, you can listen to all past episodes on Apple, Spotify, Amazon, and iHeart using the buttons above.
              </p>
            </div>
          )}

          {!isLoading && !isError && episodes.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.map((ep, index) => {
                const duration = formatDuration(ep.durationSec);
                return (
                  <article
                    key={ep.guid}
                    className="bg-foreground rounded-2xl p-6 flex flex-col justify-between fade-in"
                    style={{ animationDelay: `${Math.min(index * 0.05, 0.6)}s` }}
                  >
                    <div>
                      {ep.episodeNumber != null && (
                        <p className="text-xs font-body font-bold text-primary mb-2 uppercase tracking-wider">
                          Episode {ep.episodeNumber}
                        </p>
                      )}
                      <h4 className="text-base md:text-lg font-display font-bold text-primary-foreground leading-snug mb-3">
                        {ep.title}
                      </h4>
                      <p className="text-xs font-body text-primary-foreground/50 mb-3">
                        {formatDate(ep.pubDate)}
                        {duration ? ` · ${duration}` : ""}
                      </p>
                      <p className="text-sm font-body text-primary-foreground/70 leading-relaxed mb-5">
                        {ep.description}
                      </p>
                    </div>
                    {ep.audioUrl && (
                      <audio controls preload="none" className="w-full mb-3">
                        <source src={ep.audioUrl} type="audio/mpeg" />
                      </audio>
                    )}
                    {ep.link && (
                      <a
                        href={ep.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-body font-semibold text-xs hover:opacity-90 transition-opacity w-fit"
                      >
                        <Play size={14} /> Show Notes
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Episodes;
