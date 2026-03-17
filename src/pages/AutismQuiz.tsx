import { useState } from "react";
import Header from "@/components/Header";
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  { id: 1, question: "I often feel like I'm performing a version of myself around others rather than being my authentic self.", category: "Masking" },
  { id: 2, question: "I need significant alone time to recover after social interactions, even enjoyable ones.", category: "Social Energy" },
  { id: 3, question: "I notice small details that others seem to miss (sounds, textures, patterns, inconsistencies).", category: "Sensory" },
  { id: 4, question: "I have intense, focused interests that I can research or engage with for hours.", category: "Interests" },
  { id: 5, question: "I've been told I'm 'too sensitive,' 'too intense,' or 'too much.'", category: "Identity" },
  { id: 6, question: "I struggle with unexpected changes to plans or routines, even small ones.", category: "Routine" },
  { id: 7, question: "I find it hard to identify or describe my own emotions in the moment.", category: "Emotional Processing" },
  { id: 8, question: "Certain textures, sounds, lights, or smells can feel physically overwhelming.", category: "Sensory" },
  { id: 9, question: "I rehearse conversations in my head before (and often after) they happen.", category: "Masking" },
  { id: 10, question: "I often feel exhausted by the end of the day for no clear physical reason.", category: "Burnout" },
  { id: 11, question: "I have a strong sense of justice and become deeply upset by unfairness.", category: "Values" },
  { id: 12, question: "Making eye contact during conversation feels unnatural or takes conscious effort.", category: "Social" },
  { id: 13, question: "I tend to take things literally and sometimes miss sarcasm or implied meanings.", category: "Communication" },
  { id: 14, question: "I experience 'shutdowns' where I can't speak or process information during overwhelm.", category: "Burnout" },
  { id: 15, question: "I've developed detailed systems or rituals to manage daily life that others find unnecessary.", category: "Routine" },
  { id: 16, question: "Small talk feels pointless and draining; I prefer deep, meaningful conversations.", category: "Social" },
  { id: 17, question: "I often feel like I'm on the outside looking in during group social situations.", category: "Identity" },
  { id: 18, question: "I stim (fidget, rock, hum, pace, pick at skin, etc.), sometimes without realizing it.", category: "Sensory" },
  { id: 19, question: "I've been misdiagnosed with or treated for anxiety, depression, or bipolar disorder.", category: "History" },
  { id: 20, question: "I feel like I finally found 'my people' when I discovered neurodivergent communities.", category: "Identity" },
];

const answerOptions = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly Agree", value: 5 },
];

type ScoreRange = "low" | "moderate" | "high" | "very-high";

function getScoreRange(score: number): ScoreRange {
  if (score <= 40) return "low";
  if (score <= 60) return "moderate";
  if (score <= 80) return "high";
  return "very-high";
}

const resultContent: Record<ScoreRange, { title: string; description: string; color: string }> = {
  low: {
    title: "Lower Likelihood",
    description:
      "Based on your responses, your experiences may not strongly align with common autistic traits in women. However, everyone's experience is unique. If you still feel something resonates, trust your instincts and consider exploring further with a professional who specializes in autism in women.",
    color: "hsl(var(--secondary))",
  },
  moderate: {
    title: "Some Traits Present",
    description:
      "Your responses suggest you share some experiences common among autistic women. Many women with moderate scores have learned to mask effectively, making their traits less visible to others—but no less real. Consider reading more about autism in women or speaking with a knowledgeable professional.",
    color: "hsl(var(--accent))",
  },
  high: {
    title: "Notable Alignment",
    description:
      "Your responses strongly align with experiences commonly reported by autistic women. This doesn't replace a formal assessment, but it's a meaningful signal worth exploring. Many late-diagnosed women describe a profound sense of relief and self-understanding. A specialist in autism in women could help you on this journey.",
    color: "hsl(var(--primary))",
  },
  "very-high": {
    title: "Strong Alignment",
    description:
      "Your responses very strongly align with the lived experience of autistic women. Many women who score in this range describe a lifelong feeling of being different that finally starts to make sense. We strongly encourage you to seek a formal evaluation from a professional who understands how autism presents in women. You deserve answers—and you deserve support.",
    color: "hsl(var(--primary))",
  },
};

const AutismQuiz = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = quizQuestions.length;
  const progress = (Object.keys(answers).length / totalQuestions) * 100;
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const range = getScoreRange(totalScore);
  const result = resultContent[range];

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const goNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setShowResults(true);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) setCurrentQuestion((q) => q - 1);
  };

  const restart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setStarted(false);
  };

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero / Intro */}
      {!started && !showResults && (
        <section className="section-padding pt-32 md:pt-40 bg-section-warm min-h-screen flex items-start">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-primary mb-4">
              Self-Assessment
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Could You Be<br />on the Spectrum?
            </h1>
            <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
            <p className="text-base md:text-lg font-body text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
              This informal quiz is designed specifically for women and those socialized as female. It is <strong className="text-foreground">not</strong> a diagnostic tool—only a licensed professional can provide a diagnosis. But it may help you recognize patterns and decide if seeking a formal evaluation is right for you.
            </p>
            <p className="text-sm font-body text-muted-foreground mb-10 max-w-xl mx-auto">
              20 questions · Takes about 5 minutes · Completely private (nothing is stored)
            </p>
            <button
              onClick={() => setStarted(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Start the Quiz <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* Quiz Questions */}
      {started && !showResults && (
        <section className="section-padding pt-32 md:pt-40 min-h-screen">
          <div className="max-w-2xl mx-auto">
            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex justify-between text-xs font-body text-muted-foreground mb-2">
                <span>Question {currentQuestion + 1} of {totalQuestions}</span>
                <span className="text-xs font-body text-muted-foreground/60">{question.category}</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="fade-in" key={currentQuestion}>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-10 leading-relaxed">
                {question.question}
              </h2>

              {/* Answer options */}
              <div className="space-y-3 mb-12">
                {answerOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full text-left px-6 py-4 rounded-xl border-2 font-body text-sm transition-all duration-200 ${
                      answers[currentQuestion] === opt.value
                        ? "border-primary bg-primary/5 text-foreground font-semibold"
                        : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={goPrev}
                  disabled={currentQuestion === 0}
                  className="inline-flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={16} /> Previous
                </button>
                <button
                  onClick={goNext}
                  disabled={answers[currentQuestion] === undefined}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  {currentQuestion === totalQuestions - 1 ? "See Results" : "Next"} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {showResults && (
        <section className="section-padding pt-32 md:pt-40 min-h-screen bg-section-warm">
          <div className="max-w-2xl mx-auto text-center fade-in">
            <CheckCircle2 size={48} className="mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Your Results
            </h2>
            <p className="text-sm font-body text-muted-foreground mb-8">
              Score: {totalScore} out of {totalQuestions * 5}
            </p>

            {/* Score visual */}
            <div className="w-full h-3 bg-border rounded-full overflow-hidden mb-3 max-w-md mx-auto">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs font-body text-muted-foreground mb-10 max-w-md mx-auto text-right">
              {Math.round(progress)}%
            </p>

            {/* Result card */}
            <div className="bg-background rounded-2xl p-8 md:p-10 border border-border text-left mb-10">
              <h3
                className="text-2xl font-display font-bold mb-4"
                style={{ color: result.color }}
              >
                {result.title}
              </h3>
              <p className="text-base font-body text-foreground leading-relaxed mb-6">
                {result.description}
              </p>
              <div className="w-12 h-0.5 bg-primary mb-6" />
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Important:</strong> This quiz is for self-reflection only and is not a clinical assessment. Autism presents very differently in women and is frequently missed or misdiagnosed. If these questions resonated with you, consider reaching out to a professional who specializes in autism assessment for women and adults.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restart}
                className="inline-flex items-center justify-center gap-2 border-2 border-border text-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:border-primary/40 transition-colors"
              >
                <RotateCcw size={16} /> Take Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Back to Home <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AutismQuiz;
