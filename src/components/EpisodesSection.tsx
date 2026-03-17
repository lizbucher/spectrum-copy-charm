import { ArrowRight } from "lucide-react";
import episodeThumb from "@/assets/episode-thumb.jpg";

const episodes = [
  {
    title: 'The Syllables of Violence- Renee Nicole Good (Or: Why "Fucking Bitch" is a Death Threat)',
    excerpt:
      'In this episode of "Femme on the Spectrum", hosted by Elizabeth, she discusses the deep-seated rage that some men exhibit towards women who challenge their perceived entitlement, particularly those who are neurodivergent. She recalls the tragic…',
  },
  {
    title: "The Autopsy of Nurospicy Betrayal",
    excerpt:
      "In the podcast episode of Femme on the Spectrum, host Elizabeth examines the complicated downfall of a once strong bond with her brother. She retracts the stages of their relationship, detailing a backstory fraught with familial toxicity and…",
  },
  {
    title: 'The Accountability Trap (or, Why "I\'m Sorry" is Never Enough)',
    excerpt:
      'In this episode of "Femme on the Spectrum," host Elizabeth discusses the complexities of dealing with criticism and misunderstandings from a neurodivergent perspective. She highlights the autistic tendency to provide exhaustive context in an attempt…',
  },
];

const EpisodesSection = () => {
  return (
    <section id="episodes" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground fade-in">
            Recent Episodes
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-body font-semibold text-sm hover:gap-3 transition-all duration-300 fade-in"
          >
            View all Episodes <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {episodes.map((episode, index) => (
            <a
              key={index}
              href="#"
              className="group block fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src={episodeThumb}
                  alt={episode.title}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm font-body font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                {episode.title}
              </h3>
              <p className="text-xs font-body text-muted-foreground leading-relaxed">
                {episode.excerpt}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EpisodesSection;
