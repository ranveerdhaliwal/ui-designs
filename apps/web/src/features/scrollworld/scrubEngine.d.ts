export interface ScrollWorldConfig {
  brand?: { name: string; href?: string };
  diveScroll?: number;
  connScroll?: number;
  hint?: string;
  nav?: boolean;
  atmosphere?: boolean;
  sections: Array<{
    id: string;
    label?: string;
    still: string;
    stillMobile?: string;
    clip?: string;
    clipMobile?: string;
    accent?: string;
    scroll?: number;
    linger?: number;
    eyebrow?: string;
    title?: string;
    body?: string;
    tags?: string[];
    cta?: {
      primary?: { label: string; href: string };
      secondary?: { label: string; href: string };
    };
  }>;
  connectors?: Array<string | null>;
  connectorsMobile?: Array<string | null>;
}
export function mountScrollWorld(container: HTMLElement, config: ScrollWorldConfig): () => void;
