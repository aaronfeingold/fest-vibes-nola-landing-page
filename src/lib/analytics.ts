// Google Analytics 4 implementation
declare global {
  interface Window {
    gtag: any;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize GA
export const initGA = () => {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Generic event tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific SIP analytics events
export const analytics = {
  // Page views
  pageView: (page: string) => {
    trackEvent("page_view", "navigation", page);
  },

  // Beta signup funnel
  betaSignup: {
    modalOpened: () => trackEvent("modal_opened", "beta_signup", "hero_button"),
    emailEntered: (isValid: boolean) =>
      trackEvent("email_entered", "beta_signup", isValid ? "valid" : "invalid"),
    gmailButtonClicked: () =>
      trackEvent("gmail_button_clicked", "beta_signup", "auto_complete"),
    submitted: (hasError: boolean) =>
      trackEvent(
        "form_submitted",
        "beta_signup",
        hasError ? "error" : "success"
      ),
    completed: () =>
      trackEvent("signup_completed", "conversion", "beta_signup"),
  },

  // Donation funnel
  donation: {
    modalShown: () =>
      trackEvent("donation_modal_shown", "donation", "after_email"),
    accepted: () =>
      trackEvent("donation_accepted", "conversion", "venmo_redirect"),
    declined: () => trackEvent("donation_declined", "donation", "maybe_later"),
    venmoOpened: () => trackEvent("venmo_opened", "external_link", "payment"),
  },

  // Email engagement (track with UTM parameters)
  email: {
    opened: (campaignName: string) =>
      trackEvent("email_opened", "email", campaignName),
    linkClicked: (linkName: string, campaignName: string) =>
      trackEvent("email_link_clicked", "email", `${campaignName}_${linkName}`),
  },

  // General engagement
  engagement: {
    scrollDepth: (percentage: number) =>
      trackEvent("scroll_depth", "engagement", `${percentage}%`, percentage),
    timeOnPage: (seconds: number) =>
      trackEvent("time_on_page", "engagement", "duration", seconds),
    owlClicked: () =>
      trackEvent("owl_clicked", "engagement", "sip_owl_animation"),
    externalLinkClicked: (url: string) =>
      trackEvent("external_link_clicked", "engagement", url),
  },

  // Error tracking
  error: {
    apiError: (endpoint: string, error: string) =>
      trackEvent("api_error", "errors", `${endpoint}_${error}`),
    validationError: (field: string, error: string) =>
      trackEvent("validation_error", "errors", `${field}_${error}`),
  },
};

// Scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === "undefined") return;

  const scrollDepths = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100
    );

    scrollDepths.forEach((depth) => {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        analytics.engagement.scrollDepth(depth);
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
};

// Time on page tracking
export const initTimeTracking = () => {
  if (typeof window === "undefined") return;

  const startTime = Date.now();
  const intervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
  const tracked = new Set<number>();

  const checkTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    intervals.forEach((interval) => {
      if (timeSpent >= interval && !tracked.has(interval)) {
        tracked.add(interval);
        analytics.engagement.timeOnPage(interval);
      }
    });
  };

  const timer = setInterval(checkTime, 10000); // Check every 10 seconds
  return () => clearInterval(timer);
};
