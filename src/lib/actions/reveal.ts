
const observerMap = new Map<string, IntersectionObserver>();

export function reveal(
    node: HTMLElement,
    { delay = 0, duration = 800, threshold = 0.15 }: { delay?: number; duration?: number; threshold?: number | number[] } = {}
) {
    node.classList.add('reveal');
    node.style.transitionDuration = `${duration}ms`;
    node.style.transitionDelay = `${delay}ms`;

    // Create a unique key for the observer options.
    // We key by threshold (and potentially root/rootMargin if added later)
    // to share observers across elements with identical configuration.
    const options = { threshold };
    // JSON.stringify handles number vs array of numbers correctly for keys
    const key = JSON.stringify(options);

    let observer = observerMap.get(key);

    if (!observer) {
        observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, options);
        observerMap.set(key, observer);
    }

    observer.observe(node);

    return {
        destroy() {
            observer?.unobserve(node);
        }
    };
}
