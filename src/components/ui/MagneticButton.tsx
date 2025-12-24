import React, { useRef, useCallback, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  as?: "button" | "a" | "div";
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  strength = 0.3,
  as = "button",
}: MagneticButtonProps) {
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

      const magnetX = distanceX * strength;
      const magnetY = distanceY * strength;
      element.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
      element.style.transition = "transform 0.15s ease-out";
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      element.style.transform = "translate(0px, 0px)";
      element.style.transition = "transform 0.3s ease-out";
    }
  }, []);

  const Component = as as any;

  return (
    <Component
      ref={elementRef}
      className={className}
      onClick={onClick}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Component>
  );
}
