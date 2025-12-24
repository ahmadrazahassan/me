import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticEffect({ strength = 0.3, radius = 100 }: MagneticOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const magnetX = distanceX * strength;
        const magnetY = distanceY * strength;
        element.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      element.style.transform = "translate(0px, 0px)";
      element.style.transition = "transform 0.3s ease-out";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      element.style.transition = "transform 0.15s ease-out";
    }
  }, []);

  return {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
  };
}
