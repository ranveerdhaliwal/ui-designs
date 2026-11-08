import { startAnimationLoop } from '@/lib/animation';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { getAssetUrl } from '@/lib/assetUtils';
import { Check, Eye, EyeOff, Sparkle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import styles from './CinematicFilmAuth.module.css';

export interface CinematicFilmAuthProps {
  title?: string;
  loginPrompt?: string;
  signupPrompt?: string;
  defaultMode?: 'login' | 'signup';
  mediaSrc?: string;
  showGrainOverlay?: boolean;
  showBokehAnimation?: boolean;
  badgeText?: string;
  onAuthenticate?: (data: {
    mode: 'login' | 'signup';
    email: string;
    password?: string;
  }) => Promise<boolean | void> | void;
  onSocialAuth?: (provider: 'google' | 'twitter') => void;
  className?: string;
  style?: React.CSSProperties;
}

export function CinematicFilmAuth({
  title = 'Welcome back.',
  loginPrompt = "Don't have an account?",
  signupPrompt = 'Already have an account?',
  defaultMode = 'login',
  mediaSrc = '/assets/motionsites/cinema_hd_night.jpg',
  showGrainOverlay = true,
  showBokehAnimation = true,
  badgeText = 'ISO 800 • 35mm Tri-X',
  onAuthenticate,
  onSocialAuth,
  className,
  style,
}: CinematicFilmAuthProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    status,
    error: errorMessage,
    run,
    reset,
    fail,
  } = useAsyncAction('Authentication failed. Please verify credentials.');
  const bokehCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      fail('Please enter a valid email address.');
      return;
    }
    await run(() => onAuthenticate?.({ mode, email, password }));
  };

  // Subtle starry bokeh twinkle animation on the cinema photo
  useEffect(() => {
    if (!showBokehAnimation) return;
    const canvas = bokehCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 360);
    let height = (canvas.height = canvas.offsetHeight || 500);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 360;
      height = canvas.height = canvas.offsetHeight || 500;
    };
    window.addEventListener('resize', resize);

    // Starry bokeh specs
    const stars = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.55), // Keep mostly in the sky region
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.phase += s.pulseSpeed;
        const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 2.5);
        grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animation = startAnimationLoop(render, { element: canvas });

    return () => {
      animation.dispose();
      window.removeEventListener('resize', resize);
    };
  }, [showBokehAnimation]);

  return (
    <div className={`${styles.container} ${className || ''}`} style={style}>
      {/* 1. Left Auth Card */}
      <div className={styles.leftColumn}>
        <div className={styles.cardContent}>
          <div className={styles.topIcon}>
            <Sparkle size={26} fill="currentColor" />
          </div>

          <h1 className={styles.title}>{mode === 'login' ? title : 'Create an Account'}</h1>

          <p className={styles.subPrompt}>
            {mode === 'login' ? loginPrompt : signupPrompt}
            <button
              type="button"
              className={styles.toggleLink}
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                reset();
              }}
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>

          {status === 'success' ? (
            <div
              style={{
                background: '#f0fdf4',
                color: '#15803d',
                padding: '1rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
              }}
            >
              <Check size={18} />
              <span>
                {onAuthenticate
                  ? mode === 'login'
                    ? 'Logged in successfully!'
                    : 'Account created!'
                  : 'Preview complete. No account was accessed or created.'}
              </span>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    aria-label="Email address"
                    autoComplete="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    aria-label="Password"
                    minLength={8}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={status === 'loading'}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p role="alert" style={{ color: '#d93838', fontSize: '0.8rem', margin: '0' }}>
                  {errorMessage}
                </p>
              )}

              <button type="submit" className={styles.loginBtn} disabled={status === 'loading'}>
                {status === 'loading'
                  ? 'Authenticating...'
                  : mode === 'login'
                    ? 'Login'
                    : 'Create Account'}
              </button>
            </form>
          )}

          {!onAuthenticate && (
            <p style={{ fontSize: 12, opacity: 0.7 }}>
              Interactive preview. Use a sample email and password.
            </p>
          )}
          <div className={styles.dividerRow}>
            <span className={styles.dividerText}>OR</span>
          </div>

          <div className={styles.socialRow}>
            <button
              type="button"
              className={styles.socialBtn}
              disabled={!onSocialAuth}
              title={!onSocialAuth ? 'Social sign-in is not connected in this preview' : undefined}
              onClick={() => onSocialAuth && onSocialAuth('google')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className={styles.socialBtn}
              disabled={!onSocialAuth}
              title={!onSocialAuth ? 'Social sign-in is not connected in this preview' : undefined}
              onClick={() => onSocialAuth && onSocialAuth('twitter')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Right Cinematic Film Column */}
      <div className={styles.rightColumn}>
        <img
          src={getAssetUrl(mediaSrc)}
          alt="Contemplative figure sitting on grassy ridge under starry night sky"
          className={styles.cinemaMedia}
        />
        {showBokehAnimation && <canvas ref={bokehCanvasRef} className={styles.bokehCanvas} />}
        {showGrainOverlay && <div className={styles.grainOverlay} />}
        {badgeText && <div className={styles.filmBadge}>{badgeText}</div>}
      </div>
    </div>
  );
}
