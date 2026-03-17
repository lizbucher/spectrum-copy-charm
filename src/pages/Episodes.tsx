import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
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

interface Episode {
  title: string;
  date: string;
  excerpt: string;
}

const episodes: Episode[] = [
  {
    title: 'The Syllables of Violence — Renee Nicole Good (Or: Why "F***ing B***h" is a Death Threat)',
    date: "January 11, 2026",
    excerpt: 'In this episode, Elizabeth discusses the deep-seated rage that some men exhibit towards women who challenge their perceived entitlement…',
  },
  {
    title: "The Autopsy of Neurospicy Betrayal",
    date: "January 4, 2026",
    excerpt: "Host Elizabeth examines the complicated downfall of a once strong bond, detailing a backstory fraught with familial toxicity…",
  },
  {
    title: 'The Accountability Trap (or, Why "I\'m Sorry" is Never Enough)',
    date: "January 2, 2026",
    excerpt: "Elizabeth discusses the complexities of dealing with criticism and misunderstandings from a neurodivergent perspective…",
  },
  {
    title: "System Crash: The 7 Signs of Neurodivergent Burnout",
    date: "December 29, 2025",
    excerpt: "Elizabeth explores the subject of neurodivergent burnout and its seven telltale signs…",
  },
  {
    title: "The Narcissist's Dilemma: You Think It's A Power Move. I Didn't Even Know We Were Playing!",
    date: "December 29, 2025",
    excerpt: "Elizabeth delves into the misunderstood dynamics between narcissistic individuals and neurodivergent women…",
  },
  {
    title: "System Failure: The Science of Holiday Burnout & The Permission to Quit",
    date: "December 28, 2025",
    excerpt: "Elizabeth talks about what it's like to navigate life as a neurodivergent person during the holiday season…",
  },
  {
    title: "The Saint & The Sniper",
    date: "December 26, 2025",
    excerpt: "Elizabeth engages listeners in a detailed and thought-provoking exploration of family dynamics and hidden hostility…",
  },
  {
    title: 'The Trad-Wife Trap: Holiday Nostalgia, The "Lonely" Lie, and Why We Are Happier Without Them',
    date: "December 23, 2025",
    excerpt: "Elizabeth dismantles the nostalgia behind the traditional holiday narratives and what they really mean for neurodivergent women…",
  },
  {
    title: "The Nausea of Fake Nice: A Statistical Analysis of Holiday BS",
    date: "December 22, 2025",
    excerpt: "Elizabeth discusses the complexities of forced social niceties and their toll on the neurodivergent mind…",
  },
  {
    title: "The Lost Girls & The Great Midlife Unmasking – For Gen X and Millennials",
    date: "December 18, 2025",
    excerpt: "Elizabeth aims to normalize the conversations around late-diagnosed autism in women of Gen X and millennial generations…",
  },
  {
    title: "The Scapegoat Protocol: A 'Liar, Liar' Masterclass",
    date: "November 16, 2025",
    excerpt: "Elizabeth explores the challenges neurodivergent women face when cast as the family scapegoat…",
  },
  {
    title: 'The "Vile Human" & The Family Enforcer',
    date: "November 16, 2025",
    excerpt: "Elizabeth explores the challenging dynamics of toxic family systems and the role of the enforcer…",
  },
  {
    title: "The Aunt, The Apology, and The Professional Gaslight",
    date: "November 9, 2025",
    excerpt: "Elizabeth provides a safe space to explore the dynamics of gaslighting from people who should protect us…",
  },
  {
    title: "Blindsided: The Love That Wasn't, and the Awakening That Saved Me",
    date: "October 5, 2025",
    excerpt: "An intense account of Elizabeth's life journey, particularly her struggles with relationships and self-discovery…",
  },
  {
    title: "C-PTSD & Autism: Trauma, Stats & Laughs (Because Crying in Public is Exhausting)",
    date: "June 25, 2025",
    excerpt: "Elizabeth addresses the interrelation of Complex PTSD and autism with honesty and humor…",
  },
  {
    title: "CPTSD vs Autism/ADHD — A Clinical & Personal Breakdown",
    date: "May 24, 2025",
    excerpt: "Elizabeth explores the relationship between CPTSD, autism, and ADHD from clinical and personal angles…",
  },
  {
    title: "The Narcissist, The People-Pleaser & The Covert Puppet Master",
    date: "March 19, 2025",
    excerpt: "Elizabeth focuses on uncovering the behavioral similarities between narcissistic dynamics and neurodivergent experiences…",
  },
  {
    title: "The Truth Hurts (And So Do Social Hierarchies)",
    date: "March 14, 2025",
    excerpt: "Elizabeth explores a paradox in society's relationship with honesty and social structures…",
  },
  {
    title: "Manipulation & the Social Game – Who's Really in Your Circle?",
    date: "February 26, 2025",
    excerpt: "Elizabeth discusses manipulation, social dynamics, and how to identify who truly supports you…",
  },
  {
    title: "Neurodivergent Resistance of the Crowd (and Politics)",
    date: "February 5, 2025",
    excerpt: "Elizabeth explores the power of neurodivergence in recognizing the glitches in society's codes…",
  },
  {
    title: "Reactive Abuse and the Autistic Experience: How Narcissists Flip the Script",
    date: "January 19, 2025",
    excerpt: "Elizabeth focuses on how reactive abuse traps neurodivergent women in cycles of blame…",
  },
  {
    title: "Navigating Family Drama as an Autistic Person",
    date: "January 10, 2025",
    excerpt: "Elizabeth discusses the challenging terrain of family relationships through a neurodivergent lens…",
  },
  {
    title: "Behind the Sweet Mask: Enablers of Narcissistic Abuse and Neurodivergent Insight",
    date: "January 9, 2025",
    excerpt: "Elizabeth discusses the prevalent issue of enablers in narcissistic abuse dynamics…",
  },
  {
    title: "Navigating Naivety: How Autism Makes You a Magnet for Manipulation",
    date: "December 27, 2024",
    excerpt: "Elizabeth addresses the sensitive topic of how autistic traits can make one vulnerable to manipulation…",
  },
  {
    title: "From Scapegoats to Truth Bombs: An Autistic Woman's Guide to Surviving Society",
    date: "December 27, 2024",
    excerpt: "Elizabeth discusses the increased susceptibility of autistic women to scapegoating and how to fight back…",
  },
  {
    title: "Unmasking Autism in Women: The Superpower You Didn't See Coming",
    date: "December 19, 2024",
    excerpt: "Elizabeth debunks some prevalent misconceptions about autism and reframes it as a strength…",
  },
  {
    title: "Why Do Autistic Women Fall for Narcissists? (But See Through Everyone Else's BS)",
    date: "December 17, 2024",
    excerpt: "Elizabeth delves into the complex and often painful relationship between autistic women and narcissistic partners…",
  },
];

const Episodes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Platform links */}
      <section className="pt-32 md:pt-40 pb-12 bg-section-warm">
        <div className="flex items-center justify-center gap-8 md:gap-12">
          {platformLinks.map((p) => (
            <a key={p.alt} href={p.href} target="_blank" rel="noopener noreferrer">
              <img src={p.icon} alt={p.alt} className="w-16 h-16 md:w-20 md:h-20 rounded-xl hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </section>

      {/* Episode cards grid */}
      <section className="section-padding bg-section-warm">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode, index) => (
              <article
                key={index}
                className="bg-foreground rounded-2xl p-6 flex flex-col justify-between fade-in"
                style={{ animationDelay: `${Math.min(index * 0.05, 0.6)}s` }}
              >
                <div>
                  <h4 className="text-base md:text-lg font-display font-bold text-primary-foreground leading-snug mb-3">
                    {episode.title}
                  </h4>
                  <p className="text-xs font-body text-primary-foreground/50 mb-3">
                    {episode.date}
                  </p>
                  <p className="text-sm font-body text-primary-foreground/70 leading-relaxed mb-5">
                    {episode.excerpt}
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-body font-semibold text-xs hover:opacity-90 transition-opacity w-fit">
                  Read More <ArrowRight size={14} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Episodes;
