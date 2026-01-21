import React from "react";
import { cn } from "@/lib/utils";

interface HomeSectionProps {
  id?: string;
  title?: string;
  description?: string;
  right?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  id,
  title,
  description,
  right,
  className,
  children,
}) => {
  return (
    <section id={id} className={cn("py-6", className)}>
      {(title || right || description) && (
        <header className="mb-4 flex items-end justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </header>
      )}
      {children}
    </section>
  );
};

export default HomeSection;
