import { startAnimationLoop } from '@/lib/animation';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { getAssetUrl } from '@/lib/assetUtils';
import { ArrowRight, Check, Shield } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import styles from './CastleBrutalistWaitlist.module.css';

export interface CastleBrutalistWaitlistProps {
  brandName?: string;
  brandIcon?: React.ReactNode;
  headline?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  monumentSrc?: string;
  enableCanvasDither?: boolean;
  editionBadge?: string;
  onJoinWaitlist?: (email: string) => Promise<boolean | void> | void;
  className?: string;
  style?: React.CSSProperties;
}

export function CastleBrutalistWaitlist({
  brandName = 'Castle',
  brandIcon,
  headline = 'The waitlist is now open',
  subtitle = 'Be the first to know when we launch',
  placeholder = 'Enter your email',
  buttonText = 'Join Waitlist',
  monumentSrc = '/assets/motionsites/castle_hd_monument.jpg',
  enableCanvasDither = true,
  editionBadge = '1-Bit Dithered Edition',
  onJoinWaitlist,
  className,
  style,
}: CastleBrutalistWaitlistProps) {
  const [email, setEmail] = useState('');
  const { status, error: error, run, fail } = useAsyncAction('Failed to join. Please try again.');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      fail('Please enter a valid email address.');
      return;
    }
    await run(() => onJoinWaitlist?.(email));
  };

  // Interactive Dither Canvas Effect
  useEffect(() => {
    if (!enableCanvasDither) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 350);
    let height = (canvas.height = canvas.offsetHeight || 500);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 350;
      height = canvas.height = canvas.offsetHeight || 500;
    };
    window.addEventListener('resize', resize);

    // Stipple particles
    const particleCount = 80;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() < 0.7 ? 1.5 : 2.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle stipple grid around mouse if active
      if (mousePos.current.active) {
        const mx = mousePos.current.x;
        const my = mousePos.current.y;
        const radius = 90;
        const step = 8;

        ctx.fillStyle = '#000000';
        for (let gx = mx - radius; gx <= mx + radius; gx += step) {
          for (let gy = my - radius; gy <= my + radius; gy += step) {
            const dist = Math.hypot(gx - mx, gy - my);
            if (dist < radius) {
              const prob = 1 - dist / radius;
              if (Math.random() < prob * 0.45) {
                ctx.fillRect(Math.floor(gx), Math.floor(gy), 2, 2);
              }
            }
          }
        }
      }

      // Draw floating stipple dots
      ctx.fillStyle = '#111111';
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }
      ctx.globalAlpha = 1;
    };

    const animation = startAnimationLoop(render, { element: canvas });

    return () => {
      animation.dispose();
      window.removeEventListener('resize', resize);
    };
  }, [enableCanvasDither]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mousePos.current.active = false;
  };

  return (
    <div className={`${styles.container} ${className || ''}`} style={style}>
      {/* Left Editorial Content */}
      <div className={styles.leftColumn}>
        <div className={styles.brandLogo}>
          {brandIcon || (
            <span className={styles.brandIcon}>
              <Shield size={20} strokeWidth={2.2} />
            </span>
          )}
          <span>{brandName}</span>
        </div>

        <div className={styles.contentWrapper}>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          {status === 'success' ? (
            <div className={styles.successNotice}>
              <Check size={18} />
              <span role="status">
                {onJoinWaitlist
                  ? "You're on the list."
                  : 'Preview complete. No email was submitted.'}
              </span>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  aria-label="Email address"
                  autoComplete="email"
                  className={styles.input}
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? 'Joining...' : buttonText}
                {status !== 'loading' && <ArrowRight size={15} />}
              </button>
            </form>
          )}

          {error && (
            <p
              role="alert"
              style={{ color: '#d93838', fontSize: '0.85rem', margin: '-0.75rem 0 1rem 0' }}
            >
              {error}
            </p>
          )}
        </div>

        <div className={styles.badgeStack}>
          <span>Independent by design</span>
          <span>•</span>
          <span>Editorial 2026</span>
        </div>
      </div>

      {/* Right Dithered Monument Column */}
      <div
        className={styles.rightColumn}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={getAssetUrl(monumentSrc)}
          alt="1-bit dithered Castle monument"
          className={styles.monumentImg}
        />
        {enableCanvasDither && (
          <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.monumentCanvas} />
          </div>
        )}
        {editionBadge && <div className={styles.densityBadge}>{editionBadge}</div>}
      </div>
    </div>
  );
}
