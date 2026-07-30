"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type DeadLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function DeadLink({ children, href = "#", onClick, ...rest }: DeadLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} role="link" {...rest}>
      {children}
    </a>
  );
}
