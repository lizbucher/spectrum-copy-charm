/**
 * Femme On the Spectrum - Cloudflare Pages Function (catch-all for /api/*)
 *
 * Endpoints:
 *   POST /api/quiz-results
 *   POST /api/freebie-signup
 *   POST /api/waitlist-signup
 *   POST /api/contact
 *   GET  /api/health
 *
 * Bindings (configured in Cloudflare Pages dashboard):
 *   DB:     D1Database (femme-on-the-spectrum)
 *   ASSETS: R2Bucket (femme-on-the-spectrum-assets)
 *
 * Secrets (Pages dashboard -> Settings -> Environment variables):
 *   RESEND_API_KEY, FROM_EMAIL, CONTACT_TO_EMAIL
 */

interface Env {
  DB: D1Database;
  ASSETS?: R2Bucket;
  RESEND_API_KEY: string;
  FROM_EMAIL: string;
  CONTACT_TO_EMAIL: string;
}

interface PagesContext {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
}

const corsHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });

const isValidEmail = (e: string) =>
  typeof e === "string" && e.length <= 255 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const clean = (s: unknown, max = 500): string =>
  typeof s === "string" ? s.trim().slice(0, max) : "";

async function sendEmail(env: Env, opts: { to: string; subject: string; html: string; replyTo?: string; }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.FROM_EMAIL, to: opts.to, subject: opts.subject, html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text());
    throw new Error(`Resend ${res.status}`);
  }
}

interface QuizResponse { questionId: number; category: string; value: number; }

function scoreQuiz(responses: QuizResponse[]) {
  const total = responses.reduce((s, r) => s + (r.value || 0), 0);
  const max = responses.length * 5;
  const pct = max > 0 ? Math.round((total / max) * 100) : 0;
  const byCategory: Record<string, { sum: number; count: number }> = {};
  for (const r of responses) {
    if (!byCategory[r.category]) byCategory[r.category] = { sum: 0, count: 0 };
    byCategory[r.category].sum += r.value || 0;
    byCategory[r.category].count += 1;
  }
  const categoryAverages = Object.fromEntries(
    Object.entries(byCategory).map(([k, v]) => [k, +(v.sum / v.count).toFixed(2)])
  );
  let band = "Reflective";
  if (pct >= 80) band = "Strong resonance";
  else if (pct >= 65) band = "Significant resonance";
  else if (pct >= 50) band = "Moderate resonance";
  else if (pct >= 35) band = "Some resonance";
  return { total, max, pct, band, categoryAverages };
}

function quizResultHtml(opts: { firstName?: string; pct: number; band: string; categoryAverages: Record<string, number>; }) {
  const name = opts.firstName ? `, ${opts.firstName}` : "";
  const sorted = Object.entries(opts.categoryAverages).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3).map(([k]) => k).join(", ");
  const rows = sorted.map(([cat, avg]) =>
    `<tr><td style="padding:8px 0;color:#4A3170;font-weight:500;">${cat}</td><td style="padding:8px 0;text-align:right;">${avg} / 5</td></tr>`
  ).join("");
  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#1A1A1A;max-width:560px;margin:0 auto;padding:24px;">
<h1 style="color:#C04464;font-size:28px;margin:0 0 8px 0;">Your quiz results${name}</h1>
<p style="color:#555;margin:0 0 24px 0;">Thanks for taking the time. This is not a diagnosis, but it might be a doorway.</p>
<div style="background:#FFF4D6;padding:20px;border-radius:12px;margin-bottom:24px;">
  <div style="font-size:14px;color:#4A3170;font-weight:500;">Your overall resonance</div>
  <div style="font-size:36px;font-weight:600;color:#4A3170;">${opts.pct}%</div>
  <div style="font-size:16px;margin-top:4px;">${opts.band}</div>
</div>
<h2 style="font-size:20px;color:#4A3170;">Where you scored highest</h2>
<p style="color:#555;">Your top three: <strong>${top3}</strong>. These are the areas where your experience most resonates with what late-diagnosed autistic women describe.</p>
<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${rows}</table>
<p style="line-height:1.6;">If any of this resonated, you are not alone, and you are not broken. I made the Femme On the Spectrum podcast for women who scored exactly like you. Come listen.</p>
<p style="margin:24px 0;"><a href="https://femmeonthespectrum.com/episodes" style="background:#C04464;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:500;display:inline-block;">Listen to the podcast</a></p>
<p style="color:#555;font-size:14px;border-top:1px solid #eee;padding-top:16px;">A note from Liz: I am currently working toward becoming a licensed therapist. If you want to work with me when I am licensed, <a href="https://femmeonthespectrum.com/waitlist" style="color:#C04464;">join my waitlist</a>.</p>
</body></html>`;
}

async function handleQuizResults(request: Request, env: Env): Promise<Response> {
  const body = await request.json().catch(() => null) as any;
  if (!body) return json({ error: "Invalid JSON" }, 400);
  const email = clean(body.email, 255).toLowerCase();
  const firstName = clean(body.firstName, 100) || null;
  const responses = Array.isArray(body.responses) ? body.responses : [];
  if (!isValidEmail(email)) return json({ error: "Valid email required" }, 400);
  if (responses.length === 0) return json({ error: "Responses required" }, 400);
  const scored = scoreQuiz(responses);
  await env.DB.prepare(
    `INSERT INTO quiz_signups (email, first_name, responses_json, total_score, result_band, user_agent, referrer) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(email, firstName, JSON.stringify(responses), scored.total, scored.band,
    request.headers.get("User-Agent")?.slice(0, 500) || null,
    request.headers.get("Referer")?.slice(0, 500) || null).run();
  await env.DB.prepare(`INSERT OR IGNORE INTO freebie_signups (email, first_name, source) VALUES (?, ?, ?)`)
    .bind(email, firstName, "quiz").run();
  try {
    await sendEmail(env, {
      to: email,
      subject: `Your Femme On the Spectrum quiz results${firstName ? ", " + firstName : ""}`,
      html: quizResultHtml({ firstName: firstName || undefined, ...scored }),
    });
  } catch (e) { console.error("quiz email failed", e); }
  return json({ success: true, results: { percentage: scored.pct, band: scored.band, categoryAverages: scored.categoryAverages } });
}

async function handleFreebieSignup(request: Request, env: Env): Promise<Response> {
  const body = await request.json().catch(() => null) as any;
  if (!body) return json({ error: "Invalid JSON" }, 400);
  const email = clean(body.email, 255).toLowerCase();
  const firstName = clean(body.firstName, 100) || null;
  const source = clean(body.source, 100) || "homepage";
  if (!isValidEmail(email)) return json({ error: "Valid email required" }, 400);
  await env.DB.prepare(`INSERT OR IGNORE INTO freebie_signups (email, first_name, source) VALUES (?, ?, ?)`)
    .bind(email, firstName, source).run();
  try {
    await sendEmail(env, {
      to: email,
      subject: "Your free guide - The 12 Signs of Late-Diagnosed AuDHD",
      html: `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#1A1A1A;max-width:560px;margin:0 auto;padding:24px;">
<h1 style="color:#C04464;">Hey${firstName ? " " + firstName : ""},</h1>
<p style="line-height:1.6;">Welcome. Your free guide is ready. <em>The 12 Signs of Late-Diagnosed AuDHD in Women</em>, the ones your therapist probably missed.</p>
<p style="margin:24px 0;"><a href="https://femmeonthespectrum.com/freebie/12-signs.pdf" style="background:#C04464;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:500;display:inline-block;">Download your guide</a></p>
<p style="line-height:1.6;">A few things you should know:</p>
<ul style="line-height:1.8;"><li>I am a late-diagnosed autistic, ADHD mom of two boys</li><li>I am in my MSW program, working toward becoming a licensed therapist</li><li>I host the Femme On the Spectrum podcast</li></ul>
<p style="margin:24px 0;"><a href="https://femmeonthespectrum.com/episodes" style="color:#C04464;">-> Listen to the podcast</a><br><a href="https://femmeonthespectrum.com/waitlist" style="color:#C04464;">-> Join the waitlist for when I am licensed</a></p>
<p style="line-height:1.6;">Talk soon,<br>Liz</p>
</body></html>`,
    });
  } catch (e) { console.error("freebie email failed", e); }
  return json({ success: true });
}

async function handleWaitlistSignup(request: Request, env: Env): Promise<Response> {
  const body = await request.json().catch(() => null) as any;
  if (!body) return json({ error: "Invalid JSON" }, 400);
  const email = clean(body.email, 255).toLowerCase();
  const firstName = clean(body.firstName, 100) || null;
  const state = clean(body.state, 50) || null;
  const seeking = clean(body.seeking, 1000) || null;
  const notes = clean(body.notes, 2000) || null;
  if (!isValidEmail(email)) return json({ error: "Valid email required" }, 400);
  await env.DB.prepare(`INSERT OR IGNORE INTO waitlist_signups (email, first_name, state, seeking, notes) VALUES (?, ?, ?, ?, ?)`)
    .bind(email, firstName, state, seeking, notes).run();
  try {
    await sendEmail(env, {
      to: email,
      subject: "You are on the waitlist - Femme On the Spectrum",
      html: `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#1A1A1A;max-width:560px;margin:0 auto;padding:24px;">
<h1 style="color:#C04464;">You are on the list${firstName ? ", " + firstName : ""}.</h1>
<p style="line-height:1.6;">Thank you for trusting me with this.</p>
<div style="background:#FFF4D6;padding:16px;border-radius:12px;margin:16px 0;font-size:14px;line-height:1.6;"><strong>Important:</strong> I am not yet a licensed therapist. I am currently in my MSW program and expect to be fully licensed in 2028. This waitlist is for early access when that happens.</div>
<p style="line-height:1.6;">Until then, I will send you something real every couple of weeks. No fluff, no marketing.</p>
<p style="margin:24px 0;"><a href="https://femmeonthespectrum.com/episodes" style="color:#C04464;">-> While you wait, here is the podcast</a></p>
<p style="line-height:1.6;">Talk soon,<br>Liz</p>
</body></html>`,
    });
  } catch (e) { console.error("waitlist email failed", e); }
  return json({ success: true });
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const body = await request.json().catch(() => null) as any;
  if (!body) return json({ error: "Invalid JSON" }, 400);
  const name = clean(body.name, 100);
  const email = clean(body.email, 255).toLowerCase();
  const message = clean(body.message, 2000);
  if (!name) return json({ error: "Name required" }, 400);
  if (!isValidEmail(email)) return json({ error: "Valid email required" }, 400);
  if (!message) return json({ error: "Message required" }, 400);
  await env.DB.prepare(`INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`)
    .bind(name, email, message).run();
  try {
    await sendEmail(env, {
      to: env.CONTACT_TO_EMAIL,
      subject: `[FotS Contact] ${name}`,
      replyTo: email,
      html: `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#1A1A1A;max-width:560px;margin:0 auto;padding:24px;">
<h2>New message from femmeonthespectrum.com</h2>
<table style="border-collapse:collapse;margin:16px 0;"><tr><td style="padding:6px 12px 6px 0;color:#555;">From:</td><td>${name}</td></tr><tr><td style="padding:6px 12px 6px 0;color:#555;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr></table>
<div style="background:#f7f7f7;padding:16px;border-radius:8px;white-space:pre-wrap;line-height:1.6;">${message.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</div>
</body></html>`,
    });
  } catch (e) { console.error("contact email failed", e); }
  return json({ success: true });
}

const BUZZSPROUT_RSS_URL = "https://feeds.buzzsprout.com/2617075.rss";

interface RssEpisode {
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

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function parseDurationToSec(s: string): number | null {
  const t = s.trim();
  if (!t) return null;
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  const parts = t.split(":").map((p) => parseInt(p, 10));
  if (parts.some(isNaN)) return null;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

function pick(tag: string, block: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? decodeEntities(m[1]).trim() : "";
}

function pickAttr(tag: string, attr: string, block: string): string | null {
  const re = new RegExp(`<${tag}[^>]*\\b${attr}=["']([^"']+)["'][^>]*>`, "i");
  const m = block.match(re);
  return m ? m[1] : null;
}

function parseRss(xml: string): RssEpisode[] {
  const items: RssEpisode[] = [];
  const itemRe = /<item[\s\S]*?<\/item>/g;
  const blocks = xml.match(itemRe) || [];
  for (const block of blocks) {
    const title = pick("title", block);
    const descRaw = pick("description", block) || pick("itunes:summary", block);
    const description = stripHtml(descRaw).slice(0, 600);
    const pubDate = pick("pubDate", block);
    const guid = pick("guid", block) || pubDate + title;
    const audioUrl = pickAttr("enclosure", "url", block);
    const duration = pick("itunes:duration", block);
    const epNum = pick("itunes:episode", block);
    const artwork = pickAttr("itunes:image", "href", block);
    const link = pick("link", block);
    items.push({
      guid,
      title,
      description,
      pubDate,
      audioUrl,
      durationSec: duration ? parseDurationToSec(duration) : null,
      episodeNumber: epNum ? parseInt(epNum, 10) : null,
      artworkUrl: artwork,
      link: link || null,
    });
  }
  return items;
}

async function handleEpisodes(request: Request): Promise<Response> {
  const cache = (caches as any).default as Cache | undefined;
  const cacheKey = new Request(BUZZSPROUT_RSS_URL, { method: "GET" });
  if (cache) {
    const hit = await cache.match(cacheKey);
    if (hit) return hit;
  }
  const upstream = await fetch(BUZZSPROUT_RSS_URL, {
    headers: { "User-Agent": "FemmeOnTheSpectrum-Site/1.0" },
  });
  if (!upstream.ok) {
    return json({ error: "Failed to fetch RSS", status: upstream.status }, 502);
  }
  const xml = await upstream.text();
  const episodes = parseRss(xml);
  const showTitle = pick("title", xml.split("<item")[0] || "");
  const res = json({ show: { title: showTitle, feedUrl: BUZZSPROUT_RSS_URL }, episodes });
  res.headers.set("Cache-Control", "public, max-age=900, s-maxage=900");
  if (cache) {
    try { await cache.put(cacheKey, res.clone()); } catch {}
  }
  return res;
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders() });
  const path = new URL(request.url).pathname;
  try {
    if (path === "/api/health") return json({ ok: true, time: new Date().toISOString() });
    if (path === "/api/episodes" && request.method === "GET") return await handleEpisodes(request);
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    switch (path) {
      case "/api/quiz-results": return await handleQuizResults(request, env);
      case "/api/freebie-signup": return await handleFreebieSignup(request, env);
      case "/api/waitlist-signup": return await handleWaitlistSignup(request, env);
      case "/api/contact": return await handleContact(request, env);
      default: return json({ error: "Not found" }, 404);
    }
  } catch (err: any) {
    console.error("Pages Function error:", err);
    return json({ error: "Server error", detail: err?.message }, 500);
  }
};
