/**
 * Single source of truth for identity + contact details.
 * Every value here is taken from the resume / professional profile document.
 */
export const site = {
  name: "Monisha S.S.",
  firstName: "Monisha",
  lastName: "S.S.",
  role: "Generative AI Engineer",
  roleLong:
    "Generative AI Engineer · LLM Application Developer · AI Automation Engineer",
  tagline: "I build AI systems that solve real problems.",
  location: "Chennai, Tamil Nadu, India",
  email: "monishasridhar14@gmail.com",
  phone: "+91 6381780846",
  phoneHref: "tel:+916381780846",
  github: "https://github.com/monisha840",
  linkedin: "https://www.linkedin.com/in/monisha-sridhar-773a142b7",
  resumePath: "/Monisha_SS_AI_Engineering_Resume.pdf",
  resumeFileName: "Monisha_SS_AI_Engineering_Resume.pdf",
  /**
   * Production origin. Set `NEXT_PUBLIC_SITE_URL` for a custom domain; on
   * Vercel the project URL is picked up automatically at build time. While it
   * is empty the site deliberately emits no canonical tag and no absolute
   * sitemap origin, rather than publishing a guessed URL.
   */
  url: resolveSiteUrl(),
} as const;

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  // Set by Vercel on every deployment; has no protocol.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "";
}

/**
 * Root-relative so the same links work from a case-study route, where the
 * sections do not exist. On the home page these are still same-document
 * fragment navigations, so smooth scrolling is preserved.
 */
export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;
