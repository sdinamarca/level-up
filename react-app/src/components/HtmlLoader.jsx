import React, { useEffect, useState, useRef } from "react";

export default function HtmlLoader({ src }) {
  const [content, setContent] = useState("Loading...");
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const appendedScripts = [];

    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;

        // extract body content if it's a full HTML
        const bodyMatch = text.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const full = bodyMatch ? bodyMatch[1] : text;

        // extract scripts and remove them from the html content
        const scripts = [];
        const cleaned = full.replace(
          /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
          (_, attrs, inner) => {
            const srcMatch = attrs && attrs.match(/src=(['"])\s*([^"']+)\s*\1/);
            scripts.push({
              src: srcMatch ? srcMatch[2] : null,
              content: inner,
            });
            return ""; // remove script from content
          }
        );

        setContent(cleaned);

        // execute scripts after the HTML has been injected
        // small timeout to ensure the DOM node has the innerHTML applied
        setTimeout(() => {
          if (cancelled) return;
          const base = new URL(src, window.location.href);

          scripts.forEach((s) => {
            const el = document.createElement("script");
            el.async = false;
            if (s.src) {
              // resolve relative script URLs
              try {
                el.src = new URL(s.src, base).href;
              } catch (e) {
                el.src = s.src;
              }
            } else {
              el.text = s.content;
            }

            // append to the container so the script runs in page context
            try {
              (containerRef.current || document.body).appendChild(el);
              appendedScripts.push(el);
            } catch (e) {
              // fallback: append to body
              document.body.appendChild(el);
              appendedScripts.push(el);
            }
          });

          // If the injected content doesn't include the Google Maps iframe, append it as a fallback
          try {
            const container = containerRef.current;
            const hasMap =
              container &&
              container.querySelector &&
              container.querySelector('iframe[src*="google.com/maps"]');
            if (!hasMap && container) {
              const map = document.createElement("iframe");
              map.src =
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1614.3218665764903!2d-70.6846115622053!3d-33.5988123187725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d97348990efd%3A0xce94f054c9e23bbf!2sCarlos%20Condell%2C%20San%20Bernardo%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1757420353991!5m2!1ses-419!2scl";
              map.width = "100%";
              map.height = "450";
              map.style.border = "0";
              map.loading = "lazy";
              map.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
              container.appendChild(map);
              appendedScripts.push(map);
            }
          } catch (e) {
            // ignore fallback failure
          }
        }, 0);
      })
      .catch((err) =>
        setContent('<pre style="color:red">Error loading content</pre>')
      );

    return () => {
      cancelled = true;
      // remove appended scripts
      appendedScripts.forEach((s) => s.remove());
    };
  }, [src]);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: content }} />
  );
}
