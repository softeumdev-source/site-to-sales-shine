import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-PB31ZSS995";

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    const pagePath = `${location.pathname}${location.search}${location.hash}`;

    window.gtag("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default GoogleAnalytics;
