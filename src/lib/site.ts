export const SITE = {
  name: "Learn Language Education Academy",
  brand: "Learn Language Education Academy",
  phoneIntl: "233205706589",
  email: "learngermanghana@gmail.com",
  instagram: "learngermanghana",
  location: "Awoshie, Accra",
  address: "Kwamisa Street GA 5808547, Awoshie, Accra",
  primaryDomain: "www.learngermanghana.com",
};

export const LINKS = {
  mainWebsite: "https://www.learngermanghana.com",
  falowen: "https://www.falowen.app",
  register: "https://register.falowen.app",
  blog: "https://blog.falowen.app",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/lleaghana/",
  youtube: "https://www.youtube.com/@LLEAGhana",
  tiktok: "https://www.tiktok.com/@lleaghana",
};

// WhatsApp support link
export const WHATSAPP_LINK =
  `https://api.whatsapp.com/send?phone=${SITE.phoneIntl}&text=` +
  encodeURIComponent(
    "Hello Learn Language Education Academy, I need help with enrollment on Falowen. My name is ____ and my level is (A1/A2/B1)."
  );

// ✅ Add CTA export back (used across pages)
export const CTA = {
  primary: { label: "Register / Contract", href: LINKS.register },
  secondary: { label: "Go to Falowen (Sign up)", href: LINKS.falowen },
  help: { label: "WhatsApp Support", href: WHATSAPP_LINK },
  blog: { label: "Blog", href: LINKS.blog },
};

export const BLOG_RSS_URL = "https://blog.falowen.app/feed.xml";
