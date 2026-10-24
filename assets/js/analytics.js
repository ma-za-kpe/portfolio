/*
 * Analytics: Google Analytics 4 plus custom engagement events.
 *
 * Setup: paste your GA4 Measurement ID (analytics.google.com → Admin → Data streams)
 * into GA4_ID below. With it empty, nothing loads and every call is a no-op.
 *
 * Events sent:
 *   book_call, cta_click, project_click, profile_click, social_click, email_copy, resume_download, crew_interest  (from [data-track])
 *   outbound_click   any external link without data-track
 *   scroll_depth     25 / 50 / 75 / 100 %
 *   section_view     each main section as it scrolls into view
 * Mark book_call, email_copy, resume_download and crew_interest as key events in GA4 to track conversions.
 */
(() => {
  const GA4_ID = ""; // e.g. "G-XXXXXXXXXX"

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  const track = (name, params = {}) => GA4_ID && gtag("event", name, params);
  window.makuTrack = track;

  if (!GA4_ID) return;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);
  gtag("js", new Date());
  gtag("config", GA4_ID, { anonymize_ip: true });

  document.addEventListener("click", (e) => {
    const el = e.target.closest("a, button");
    if (!el) return;
    if (el.dataset.track) {
      track(el.dataset.track, { label: el.dataset.trackLabel || el.textContent.trim().slice(0, 60), link_url: el.href || undefined });
    } else if (el.host && el.host !== location.host) {
      track("outbound_click", { link_url: el.href, link_domain: el.host });
    }
  });

  const marks = [25, 50, 75, 100];
  const hit = new Set();
  addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? (scrollY / max) * 100 : 100;
    marks.forEach((m) => {
      if (pct >= m - 1 && !hit.has(m)) { hit.add(m); track("scroll_depth", { percent: m }); }
    });
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        track("section_view", { section: entry.target.id });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    addEventListener("DOMContentLoaded", () => document.querySelectorAll("main section[id]").forEach((s) => io.observe(s)));
  }
})();
