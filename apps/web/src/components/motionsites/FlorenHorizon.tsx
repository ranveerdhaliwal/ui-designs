import { useAsyncAction } from '@/hooks/useAsyncAction';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowUpRight, Check, Sun } from 'lucide-react';
import React, { useRef, useState } from 'react';
import styles from './FlorenHorizon.module.css';

export interface NavLinkItem {
  label: string;
  href?: string;
}

export interface NavColumn {
  title: string;
  links: NavLinkItem[];
}

export interface FlorenHorizonProps {
  brandName?: string;
  brandIcon?: React.ReactNode;
  brandTagline?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  navColumns?: NavColumn[];
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  placeholder?: string;
  villageImageSrc?: string;
  characterImageSrc?: string;
  copyrightText?: string;
  legalLinks?: NavLinkItem[];
  onSubmitNewsletter?: (email: string) => Promise<boolean | void> | void;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_NAV_COLUMNS: NavColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Overview' },
      { label: 'Features' },
      { label: 'Pricing' },
      { label: 'Integrations' },
      { label: "What's New" },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us' },
      { label: 'Careers' },
      { label: 'Customers' },
      { label: 'Blog' },
      { label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center' },
      { label: 'Guides' },
      { label: 'Templates' },
      { label: 'Api Docs' },
      { label: 'Community' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Services' },
      { label: 'Cookie Policy' },
      { label: 'Security' },
    ],
  },
];

const DEFAULT_LEGAL_LINKS: NavLinkItem[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export function FlorenHorizon({
  brandName = 'Floren',
  brandIcon,
  brandTagline = 'Helping teams collaborate, communicate, and achieve more together.',
  socialLinks = {},
  navColumns = DEFAULT_NAV_COLUMNS,
  newsletterTitle = 'Stay in the loop',
  newsletterSubtitle = 'Get the latest updates, tips, and news delivered to your inbox.',
  placeholder = 'Enter your email',
  villageImageSrc = '/assets/motionsites/floren_village.png',
  characterImageSrc = '/assets/motionsites/floren_character.png',
  copyrightText = '© 2026 Floren. All rights reserved.',
  legalLinks = DEFAULT_LEGAL_LINKS,
  onSubmitNewsletter,
  className,
  style,
}: FlorenHorizonProps) {
  const [email, setEmail] = useState('');
  const {
    status,
    error: error,
    run,
    fail,
  } = useAsyncAction('Failed to subscribe. Please try again.');
  const peekerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      fail('Please enter a valid email address.');
      return;
    }
    await run(() => onSubmitNewsletter?.(email));
  };

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!peekerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    // Subtle head tilt / tracking
    const tilt = (xRatio - 0.5) * 16;
    peekerRef.current.style.transform = `translateX(${tilt}px) rotate(${tilt * 0.4}deg)`;
  };

  const handleContainerMouseLeave = () => {
    if (!peekerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    peekerRef.current.style.transform = `translateX(0px) rotate(0deg)`;
  };

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      style={style}
      onMouseMove={handleContainerMouseMove}
      onMouseLeave={handleContainerMouseLeave}
    >
      {/* 1. Upper Sky Section */}
      <section className={styles.skySection}>
        <div className={styles.skyGrid}>
          {/* Brand Info */}
          <div className={styles.brandBlock}>
            <div className={styles.brandHeader}>
              {brandIcon || (
                <span className={styles.brandIcon}>
                  <Sun size={24} />
                </span>
              )}
              <span className={styles.brandLogo}>{brandName}</span>
            </div>
            <p className={styles.tagline}>{brandTagline}</p>

            {/* Social Links */}
            <div className={styles.socialRow}>
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  className={styles.socialBtn}
                  aria-label="X (formerly Twitter)"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className={styles.socialBtn} aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0-.01-2.92 1.46 1.46 0 0 0 .01 2.92m1.37 9.74v-8.37H5.09v8.37h2.74z" />
                  </svg>
                </a>
              )}
              {socialLinks.github && (
                <a href={socialLinks.github} className={styles.socialBtn} aria-label="GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Nav Columns */}
          {navColumns.map((col, idx) => (
            <div key={idx} className={styles.navColumn}>
              <span className={styles.columnTitle}>{col.title}</span>
              <ul className={styles.columnList}>
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.href && link.href !== '#' ? (
                      <a href={link.href} className={styles.columnLink}>
                        {link.label}
                      </a>
                    ) : (
                      <span className={styles.columnLink}>{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Terracotta Horizon Strip */}
      <div
        className={styles.horizonStrip}
        style={{
          backgroundImage: `url(${getAssetUrl(villageImageSrc)})`,
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* 3. Lower Wheat Field Section */}
      <section className={styles.wheatSection}>
        <div className={styles.wheatContent}>
          {/* Stylized Peeking Character */}
          <div ref={peekerRef} className={styles.characterPeeker}>
            <img
              src={getAssetUrl(characterImageSrc)}
              alt="Character peering over wheat field"
              className={styles.characterImg}
            />
          </div>

          {/* Newsletter Box */}
          <div className={styles.newsletterWrapper}>
            <h2 className={styles.newsletterTitle}>{newsletterTitle}</h2>
            <p className={styles.newsletterSubtitle}>{newsletterSubtitle}</p>

            {status === 'success' ? (
              <div className={styles.successMessage}>
                <Check size={18} />
                <span role="status">
                  {onSubmitNewsletter
                    ? 'Thank you for subscribing.'
                    : 'Preview complete. No email was submitted.'}
                </span>
              </div>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                <input
                  type="email"
                  aria-label="Email address"
                  autoComplete="email"
                  className={styles.newsletterInput}
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  required
                />
                <button
                  type="submit"
                  className={styles.arrowBtn}
                  disabled={status === 'loading'}
                  aria-label="Submit newsletter"
                >
                  <ArrowUpRight size={20} />
                </button>
              </form>
            )}

            {error && (
              <p role="alert" style={{ color: '#fff', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                {error}
              </p>
            )}
          </div>
        </div>

        {/* 4. Bottom Legal Footer */}
        <div className={styles.bottomBar}>
          <div>{copyrightText}</div>
          <div className={styles.legalLinks}>
            {legalLinks.map((link, idx) =>
              link.href && link.href !== '#' ? (
                <a key={idx} href={link.href} className={styles.legalLink}>
                  {link.label}
                </a>
              ) : (
                <span key={idx} className={styles.legalLink}>
                  {link.label}
                </span>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
