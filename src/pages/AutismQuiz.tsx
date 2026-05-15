import { useState } from "react";
import Header from "@/components/Header";
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { api, QuizResponse } from "@/lib/api";

interface QuizQuestion { id: number; question: string; category: string; }

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

type Stage = "intro" | "questions" | "email" | "submitting" | "results" | "error";

const AutismQuiz = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [results, setResults] = useState<{ percentage: number; band: string; categoryAverages: Record<string, number> } | null>(null);
  const [submitError, setSubmitError] = useState("");

  const totalQuestions = quizQuestions.length;
  const question = quizQuestions[currentQuestion];

  const handleAnswer = (value: number) => setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  const goNext = () => {
    if (currentQuestion < totalQuestions - 1) setCurrentQuestion(q => q + 1);
    else setStage("email"); // gate before results
  };
  const goPrev = () => { if (currentQuestion > 0) setCurrentQuestion(q => q - 1); };

  const restart = () => {
    setAnswers({}); setCurrentQuestion(0); setEmail(""); setFirstName("");
    setEmailErr(""); setResults(null); setSubmitError(""); setStage("intro");
  };

  const submitForResults = async () => {
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailErr("Please enter a valid email");
      return;
    }
    setEmailErr("");
    setStage("submitting");
    setSubmitError("");

    const responses: QuizResponse[] = quizQuestions.map((q, idx) => ({
      questionId: q.id,
      category: q.category,
      value: answers[idx] || 0,
    }));

    try {
      const result = await api.submitQuiz({
        email: trimmed,
        firstName: firstName.trim() || undefined,
        responses,
      });
      setResults(result.results);
      setStage("results");
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong. Please try again.");
      setStage("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== Intro ===== */}
      {stage === "intro" && (
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
              20 questions · About 5 minutes · Results emailed to you with a personalized breakdown
            </p>
            <button
              onClick={() => setStage("questions")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Start the Quiz <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ===== Questions ===== */}
      {stage === "questions" && (
        <section className="section-padding pt-32 md:pt-40 min-h-screen">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10">
              <div className="flex justify-between text-xs font-body text-muted-foreground mb-2">
                <span>Question {currentQuestion + 1} of {totalQuestions}</span>
                <span className="text-xs font-body text-muted-foreground/60">{question.category}</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }} />
              </div>
            </div>

            <div className="fade-in" key={currentQuestion}>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-10 leading-relaxed">
                {question.question}
              </h2>

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

              <div className="flex items-center justify-between">
                <button onClick={goPrev} disabled={currentQuestion === 0}
                  className="inline-flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ArrowLeft size={16} /> Previous
                </button>
                <button onClick={goNext} disabled={answers[currentQuestion] === undefined}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity">
                  {currentQuestion === totalQuestions - 1 ? "Continue" : "Next"} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== Email Gate ===== */}
      {stage === "email" && (
        <section className="section-padding pt-32 md:pt-40 min-h-screen bg-section-warm">
          <div className="max-w-xl mx-auto fade-in">
            <div className="text-center mb-10">
              <Mail size={48} className="mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Where should we send your results?
              </h2>
              <p className="text-base font-body text-muted-foreground leading-relaxed">
                You'll get a personalized breakdown with your top resonance categories — plus a few honest notes from me, one autistic woman to (maybe) another.
              </p>
            </div>

            <div className="bg-background rounded-2xl border border-border p-8 space-y-5">
              <div>
                <label className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">
                  First name <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="So I can address you by name"
                />
              </div>
              <div>
                <label className="block text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (emailErr) setEmailErr(""); }}
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="you@example.com"
                />
                {emailErr && <p className="text-xs font-body text-destructive mt-1">{emailErr}</p>}
              </div>
              <button
                onClick={submitForResults}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Get My Results
              </button>
              <p className="text-xs font-body text-muted-foreground text-center">
                No spam — just real updates and resources. Unsubscribe any time.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===== Submitting ===== */}
      {stage === "submitting" && (
        <section className="section-padding pt-32 md:pt-40 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 size={48} className="mx-auto mb-6 text-primary animate-spin" />
            <p className="font-body text-muted-foreground">Scoring your responses…</p>
          </div>
        </section>
      )}

      {/* ===== Error ===== */}
      {stage === "error" && (
        <section className="section-padding pt-32 md:pt-40 min-h-screen">
          <div className="max-w-xl mx-auto text-center fade-in">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Something went sideways</h2>
            <p className="font-body text-muted-foreground mb-2">{submitError}</p>
            <p className="font-body text-muted-foreground mb-8 text-sm">Your answers haven't been lost. Try again.</p>
            <button onClick={() => setStage("email")}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity">
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* ===== Results ===== */}
      {stage === "results" && results && (
        <section className="section-padding pt-32 md:pt-40 min-h-screen bg-section-warm">
          <div className="max-w-2xl mx-auto text-center fade-in">
            <CheckCircle2 size={48} className="mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Your Results</h2>
            <p className="text-sm font-body text-muted-foreground mb-8">
              Also sent to <strong className="text-foreground">{email}</strong> — check your inbox in a minute.
            </p>

            <div className="w-full h-3 bg-border rounded-full overflow-hidden mb-3 max-w-md mx-auto">
              <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${results.percentage}%` }} />
            </div>
            <p className="text-2xl font-display font-bold text-primary mb-2">{results.percentage}%</p>
            <p className="text-base font-body text-foreground mb-10">{results.band}</p>

            <div className="bg-background rounded-2xl p-8 md:p-10 border border-border text-left mb-10">
              <h3 className="text-xl font-display font-bold text-foreground mb-4">Where you scored highest</h3>
              <div className="space-y-2 mb-6">
                {Object.entries(results.categoryAverages).sort((a, b) => b[1] - a[1]).map(([cat, avg]) => (
                  <div key={cat} className="flex items-center justify-between border-b border-border/50 py-2">
                    <span className="font-body text-sm text-foreground font-medium">{cat}</span>
                    <span className="font-body text-sm text-muted-foreground">{avg} / 5</span>
                  </div>
                ))}
              </div>
              <div className="w-12 h-0.5 bg-primary mb-6" />
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Important:</strong> This is a self-reflection tool, not a clinical assessment. Autism presents very differently in women and is frequently missed. If this resonated, consider a professional who specializes in autism assessment for women and adults.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={restart}
                className="inline-flex items-center justify-center gap-2 border-2 border-border text-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:border-primary/40 transition-colors">
                <RotateCcw size={16} /> Take Again
              </button>
              <a href="/episodes"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                Listen to the Podcast <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AutismQuiz;
