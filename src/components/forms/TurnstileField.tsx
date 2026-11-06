import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileLoader: Promise<void> | null = null;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (turnstileLoader) return turnstileLoader;
  turnstileLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      turnstileLoader = null;
      reject(new Error("Could not load verification"));
    };
    document.head.appendChild(script);
  });
  return turnstileLoader;
}

const TurnstileField = ({ onToken }: { onToken: (token: string) => void }) => {
  const host = useRef<HTMLDivElement>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const node = host.current;
    if (!node || !siteKey) return;
    let widgetId = "";
    let ignore = false;

    loadTurnstile()
      .then(() => {
        if (ignore || !window.turnstile || !host.current) return;
        widgetId = window.turnstile.render(host.current, {
          sitekey: siteKey,
          callback: (token) => onToken(token),
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        });
      })
      .catch(() => onToken(""));

    return () => {
      ignore = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken, siteKey]);

  if (!siteKey) {
    return <p>Verification is not configured.</p>;
  }

  return <div ref={host} className="turnstile-host" />;
};

export default TurnstileField;
