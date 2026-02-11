export function countUp(
    node: HTMLElement,
    { value, duration = 2000 }: { value: string | number; duration?: number }
) {
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
    const suffix = typeof value === 'string' ? value.replace(/[0-9.]/g, '') : '';


    let current = 0;
    let startTime: number | null = null;
    let observer: IntersectionObserver | null = null;

    const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Easing function (easeOutExpo) for smoother effect
        const easeOut = (x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        current = Math.floor(easeOut(progress) * numericValue);
        node.textContent = `${current}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            node.textContent = `${numericValue}${suffix}`;
        }
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            requestAnimationFrame(animate);
            observer?.disconnect();
        }
    };

    observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 });
    observer.observe(node);

    return {
        destroy() {
            observer?.disconnect();
        },

    };
}
