// Shared API client for the femmeonthespectrum.com backend.
// Talks to Cloudflare Pages Functions at /api/*.

const API_BASE = import.meta.env.VITE_API_BASE || "";

async function post<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try { const j = await res.json() as { error?: string }; if (j.error) errMsg = j.error; } catch {}
    throw new Error(errMsg);
  }
  return res.json() as Promise<T>;
}

export interface QuizResponse { questionId: number; category: string; value: number; }

export const api = {
  submitQuiz: (data: { email: string; firstName?: string; responses: QuizResponse[] }) =>
    post<{ success: boolean; results: { percentage: number; band: string; categoryAverages: Record<string, number> } }>("/api/quiz-results", data),

  freebieSignup: (data: { email: string; firstName?: string; source?: string }) =>
    post<{ success: boolean }>("/api/freebie-signup", data),

  waitlistSignup: (data: { email: string; firstName?: string; state?: string; seeking?: string; notes?: string }) =>
    post<{ success: boolean }>("/api/waitlist-signup", data),

  sendContact: (data: { name: string; email: string; message: string }) =>
    post<{ success: boolean }>("/api/contact", data),
};
