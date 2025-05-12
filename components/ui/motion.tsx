"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
}

export const FadeIn = React.forwardRef<HTMLDivElement, MotionProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-in fade-in duration-500 ease-in-out",
          delay > 0 && `delay-${delay}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FadeIn.displayName = "FadeIn";

export const SlideInFromLeft = React.forwardRef<HTMLDivElement, MotionProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-in slide-in-from-left-20 duration-500 ease-in-out",
          delay > 0 && `delay-${delay}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SlideInFromLeft.displayName = "SlideInFromLeft";

export const SlideInFromRight = React.forwardRef<HTMLDivElement, MotionProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-in slide-in-from-right-20 duration-500 ease-in-out",
          delay > 0 && `delay-${delay}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SlideInFromRight.displayName = "SlideInFromRight";

export const SlideInFromTop = React.forwardRef<HTMLDivElement, MotionProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-in slide-in-from-top-10 duration-500 ease-in-out",
          delay > 0 && `delay-${delay}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SlideInFromTop.displayName = "SlideInFromTop";

export const SlideInFromBottom = React.forwardRef<HTMLDivElement, MotionProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-in slide-in-from-bottom-10 duration-500 ease-in-out",
          delay > 0 && `delay-${delay}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SlideInFromBottom.displayName = "SlideInFromBottom";

export const ScaleIn = React.forwardRef<HTMLDivElement, MotionProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-in zoom-in-95 duration-500 ease-in-out",
          delay > 0 && `delay-${delay}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ScaleIn.displayName = "ScaleIn";

export const PageTransition: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
      {children}
    </div>
  );
}; 