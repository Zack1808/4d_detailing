const SELECTOR = ".reveal[data-reveal]";
const SCROLL_DELAY_MS = 100;

export const initReveal = () => {
  if (typeof window === "undefined") return;

  const reveal = (element: HTMLElement) => {
    element.dataset.revealed = "";
  };

  if (!("IntersectionObserver" in window)) {
    const showAll = () =>
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach(reveal);
    new MutationObserver(showAll).observe(document.body, {
      childList: true,
      subtree: true,
    });
    showAll();
    return;
  }

  const seen = new WeakSet<Element>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const firstCheck = !seen.has(element);

        seen.add(element);

        if (!entry.isIntersecting) continue;

        const delay = firstCheck
          ? Number(element.dataset.revealDelay ?? 0)
          : SCROLL_DELAY_MS;

        element.style.setProperty("--reveal-delay", `${delay}ms`);
        reveal(element);
        observer.unobserve(element);
      }
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );

  const observeAll = (root: ParentNode) => {
    root
      .querySelectorAll<HTMLElement>(`${SELECTOR}:not([data-revealed])`)
      .forEach((element) => observer.observe(element));
  };

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(SELECTOR)) observer.observe(node);
        observeAll(node);
      });
    }
  }).observe(document.body, { childList: true, subtree: true });

  observeAll(document);
};
