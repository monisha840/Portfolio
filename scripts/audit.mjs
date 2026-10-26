/**
 * Responsive + accessibility audit for the built site.
 *
 *   npm run build && npm start      # in one terminal
 *   npm run audit                   # in another
 *
 * Override the target with AUDIT_URL=http://localhost:3100 npm run audit
 * Screenshots land in .audit/ (gitignored).
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.AUDIT_URL ?? "http://localhost:3000";
const OUT = ".audit";
const WIDTHS = [320, 375, 768, 1024, 1440, 1920];
const ROUTES = ["/", "/work/sirah-voice-ai"];

mkdirSync(OUT, { recursive: true });

const pass = [];
const fail = [];
const check = (ok, label) => (ok ? pass : fail).push(label);

/** wait until scrolling has genuinely stopped, rather than guessing a delay */
async function settle(page, timeout = 6000) {
  const start = Date.now();
  let last = -1;
  let stable = 0;
  while (Date.now() - start < timeout) {
    const y = await page.evaluate(() => Math.round(window.scrollY));
    if (y === last) {
      if (++stable >= 3) return y;
    } else {
      stable = 0;
      last = y;
    }
    await page.waitForTimeout(120);
  }
  return last;
}

const browser = await chromium.launch();

/* ---------- layout + semantics at every breakpoint ---------- */
for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: width < 500 ? 740 : 900 },
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 140)));

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      return {
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        h1: document.querySelectorAll("h1").length,
        levels: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
          Number(h.tagName[1]),
        ),
        imgNoAlt: [...document.querySelectorAll("img")].filter(
          (i) => i.getAttribute("alt") === null,
        ).length,
        namelessLinks: [...document.querySelectorAll("a")].filter(
          (a) =>
            !((a.innerText || "").trim() || a.getAttribute("aria-label") || "")
              .length,
        ).length,
        unsafeExternal: [...document.querySelectorAll('a[target="_blank"]')]
          .filter((a) => !(a.rel || "").includes("noopener")).length,
      };
    });

    const tag = `${width}px ${route}`;
    check(m.scrollW <= m.clientW + 1, `${tag} — no horizontal overflow (${m.scrollW}/${m.clientW})`);
    check(m.h1 === 1, `${tag} — exactly one h1 (found ${m.h1})`);
    check(
      m.levels.every((l, i) => i === 0 || l - m.levels[i - 1] <= 1),
      `${tag} — no skipped heading levels`,
    );
    check(m.imgNoAlt === 0, `${tag} — every img has an alt attribute`);
    check(m.namelessLinks === 0, `${tag} — every link has an accessible name`);
    check(m.unsafeExternal === 0, `${tag} — external links carry rel=noopener`);

    if (route === "/") {
      await page.screenshot({ path: `${OUT}/home-${width}.png` });
    }
  }

  check(errors.length === 0, `${width}px — no uncaught page errors`);
  await ctx.close();
}

/* ---------- key journeys ---------- */
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.click('header nav a[href="/#projects"]');
await settle(page);
check(
  await page.evaluate(
    () => Math.abs(document.getElementById("projects").getBoundingClientRect().top) < 140,
  ),
  "nav anchor scrolls to the right section, clear of the fixed navbar",
);

await page.click('a[href="/work/sirah-voice-ai"]');
await page.waitForURL("**/work/sirah-voice-ai");
check(
  (await page.locator("h1").first().innerText()).includes("Sirah Voice AI"),
  "case-study route renders",
);
check(
  (await page.locator('header nav a[aria-current="true"]').count()) === 0,
  "no nav item is marked current on a case study",
);

await page.goto(BASE + "/", { waitUntil: "networkidle" });
const resume = await page.getAttribute('a[href$=".pdf"]', "href");
const pdf = await page.request.get(BASE + resume);
check(pdf.status() === 200, `résumé downloads (${resume} -> ${pdf.status()})`);

for (const route of ["/sitemap.xml", "/robots.txt", "/opengraph-image", "/icon"]) {
  const r = await page.request.get(BASE + route);
  check(r.status() === 200, `${route} responds 200`);
}

const notFound = await page.request.get(BASE + "/no-such-page");
check(notFound.status() === 404, `unknown route returns 404 (${notFound.status()})`);

await page.keyboard.press("Tab");
check(
  (await page.evaluate(() => document.activeElement.getAttribute("href"))) ===
    "#main-content",
  "skip-to-content is the first tab stop",
);
await ctx.close();

/* ---------- reduced motion must not hide content ---------- */
const rmCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const rmPage = await rmCtx.newPage();
await rmPage.goto(BASE + "/", { waitUntil: "networkidle" });
await rmPage.waitForTimeout(400);
check(
  (await rmPage.evaluate(() => {
    const p = document.querySelector("#about p");
    return p ? Number(getComputedStyle(p).opacity) : 0;
  })) === 1,
  "prefers-reduced-motion: content is visible without scrolling",
);
await rmCtx.close();

await browser.close();

console.log(`\n${pass.length} passed`);
pass.forEach((l) => console.log("  ok    " + l));
console.log(`\n${fail.length} failed`);
fail.forEach((l) => console.log("  FAIL  " + l));
process.exit(fail.length ? 1 : 0);
