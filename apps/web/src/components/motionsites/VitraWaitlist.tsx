import { useAsyncAction } from '@/hooks/useAsyncAction';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowRight, Check, Mail, Sparkles } from 'lucide-react';
import React, { useRef, useState } from 'react';
import styles from './VitraWaitlist.module.css';

export interface VitraWaitlistProps {
  brandName?: string;
  brandIcon?: React.ReactNode;
  headline?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  socialProofCount?: string;
  avatars?: string[];
  illustrationSrc?: string;
  illustrationAlt?: string;
  illustrationBadge?: string;
  enableParallax?: boolean;
  onJoinWaitlist?: (email: string) => Promise<boolean | void> | void;
  className?: string;
  style?: React.CSSProperties;
}

export function VitraWaitlist({
  brandName = 'Vitra',
  brandIcon,
  headline = 'Good things are on the way.',
  description = "We're building something meaningful. Join the waitlist and be the first to know when we launch.",
  placeholder = 'Enter your email',
  buttonText = 'Join Waitlist',
  socialProofCount = 'A quieter kind of launch',
  avatars = [],
  illustrationSrc = '/assets/motionsites/vitra_hd_art.jpg',
  illustrationAlt = 'Sunlit Mediterranean courtyard with lush greenery and relaxed figure',
  illustrationBadge = 'MotionSites Vitra',
  enableParallax = true,
  onJoinWaitlist,
  className,
  style,
}: VitraWaitlistProps) {
  const [email, setEmail] = useState('');
  const {
    status,
    error: errorMessage,
    run,
    fail,
  } = useAsyncAction('Something went wrong. Please try again.');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      fail('Please enter a valid email address.');
      return;
    }
    await run(() => onJoinWaitlist?.(email));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !enableParallax ||
      !imageRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    imageRef.current.style.transform = `scale(1.04) translate(${x * 12}px, ${y * 12}px)`;
  };

  const handleMouseLeave = () => {
    if (
      !enableParallax ||
      !imageRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    imageRef.current.style.transform = 'scale(1) translate(0px, 0px)';
  };

  return (
    <div className={`${styles.container} ${className || ''}`} style={style}>
      {/* Left Content Column */}
      <div className={styles.leftColumn}>
        <div className={styles.nav}>
          <div className={styles.brandLogo}>
            {brandIcon || (
              <span className={styles.brandIcon}>
                <Sparkles size={18} />
              </span>
            )}
            <span>{brandName}</span>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.description}>{description}</p>

          {status === 'success' ? (
            <div className={styles.successBadge}>
              <Check size={18} />
              <span role="status">
                {onJoinWaitlist
                  ? "You're on the list."
                  : 'Preview complete. No email was submitted.'}
              </span>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <span className={styles.inputIcon}>
                <Mail size={18} />
              </span>
              <input
                type="email"
                aria-label="Email address"
                autoComplete="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                disabled={status === 'loading'}
              />
              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? 'Joining...' : buttonText}
                {status !== 'loading' && <ArrowRight size={15} />}
              </button>
            </form>
          )}

          {errorMessage && (
            <p
              role="alert"
              style={{ color: '#d93838', fontSize: '0.85rem', margin: '-1rem 0 1.5rem 0.5rem' }}
            >
              {errorMessage}
            </p>
          )}

          <div className={styles.socialProof}>
            <div className={styles.avatarStack}>
              {avatars.slice(0, 4).map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Waitlist member ${index + 1}`}
                  className={styles.avatar}
                />
              ))}
            </div>
            <span className={styles.socialProofText}>{socialProofCount}</span>
          </div>
        </div>
      </div>

      {/* Right Visual Column */}
      <div
        className={styles.rightColumn}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.illustrationWrapper}>
          <img
            ref={imageRef}
            src={getAssetUrl(illustrationSrc)}
            alt={illustrationAlt}
            className={styles.illustration}
            loading="lazy"
          />
        </div>
        {illustrationBadge && <div className={styles.badgeOverlay}>{illustrationBadge}</div>}
      </div>
    </div>
  );
}
