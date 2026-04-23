"use client";

import React, { forwardRef, HTMLAttributes } from "react";

type SectionProps = {
  children: React.ReactNode;
  id: string;
} & HTMLAttributes<HTMLElement>;

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, id, className = "", ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`
          h-screen w-full 
          snap-start 
          flex items-center justify-center 
          ${className}
        `}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
