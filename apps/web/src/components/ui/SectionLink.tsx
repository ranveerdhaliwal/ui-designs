import type { AnchorHTMLAttributes } from 'react';
/** Hash routing owns the URL hash; in-page navigation must not replace it. */
export function SectionLink({
  target,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { target: string }) {
  return (
    <a
      {...props}
      href={`#${target}`}
      onClick={(e) => {
        e.preventDefault();
        const section = document.getElementById(target);
        section?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        });
      }}
    >
      {children}
    </a>
  );
}
