import { ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import episodeThumb from "@/assets/episode-thumb.jpg";

interface ApiEpisode {
  guid: string;
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string | null;
  episodeNumber: number | null;
  artworkUrl: string | null;
  link: string | null;
}

interface EpisodesResponse {
  episodes: ApiEpisode[];
}

const EpisodesSection = () => {
  const { data, isLoading } = useQuery<EpisodesResponse>({
    queryKey: ["episodes"],
    queryFn: async () => {
      const res = await fetch("/api/episodes");
      if (!res.ok) throw new Error("Failed to load episodes");
      return res.json();
    },
    staleTime: 1000 * 60 * 15,
  });

  const recent = (data?.episodes ?? []).slice(0, 3);

  return (
    <section id="episodes" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground fade-in">
            Recent Episodes
          </h2>
          <a
            href="/episodes"
            className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:gap-3 transition-all duration-300 fade-in"
          >
            View all Episodes <ArrowRight size={16} />
          </a>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={28} />
          </div>
        )}

        {!isLoading && recent.length === 0 && (
          <p className="font-body text-muted-foreground">
            New episodes coming soon. Meanwhile,{" "}
            <a href="/episodes" className="text-primary underline">see all platforms</a>.
          </p>
        )}

        {!isLoading && recent.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {recent.map((episode, index) => (
              <a
                key={episode.guid}
                href={episode.link || "/episodes"}
                target={episode.link ? "_blank" : undefined}
                rel={episode.link ? "noopener noreferrer" : undefined}
                className="group block fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="overflow-hidden rounded-2xl mb-4">
                  <img
                    src={episode.artworkUrl || episodeThumb}
                    alt={episode.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-body font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                  {episode.title}
                </h3>
                <p className="text-xs font-body text-muted-foreground leading-relaxed">
                  {episode.description}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EpisodesSection;
