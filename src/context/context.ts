"use client"
// Custom Hook to trigger animation only once
import { useRef, useState, useEffect } from "react";
const useInViewOnce = (threshold: number = 0.5) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLElement | null>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    observer.disconnect(); // Stop observing after first trigger
                }
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [threshold, hasAnimated]);

    return { ref, hasAnimated };
};
export default useInViewOnce;