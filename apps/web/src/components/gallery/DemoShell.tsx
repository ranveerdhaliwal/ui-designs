import { demos } from '@/data/demos';
import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Grid2X2 } from 'lucide-react';
import { useEffect } from 'react';
import styles from './Gallery.module.css';
export function DemoShell() {
  const { pathname } = useLocation();
  const index = demos.findIndex((demo) => demo.path === pathname);
  const demo = demos[index];
  useEffect(() => {
    document.title = demo
      ? `${demo.title} / Browser Designs`
      : 'Browser Designs / An independent interface collection';
  }, [demo]);
  return (
    <>
      <a
        className="skip-link"
        href="#demo-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('demo-content')?.focus();
        }}
      >
        Skip to content
      </a>
      {demo && (
        <header className={styles.demoBar}>
          <Link to="/" className={styles.homeLink}>
            <Grid2X2 size={15} /> <span>Browser Designs</span>
          </Link>
          <span className={styles.demoName}>{demo.title}</span>
          <nav aria-label="Browse demos">
            <Link
              to={demos[(index - 1 + demos.length) % demos.length]!.path}
              aria-label="Previous demo"
            >
              <ArrowLeft size={16} />
            </Link>
            <span>
              {String(index + 1).padStart(2, '0')} / {demos.length}
            </span>
            <Link to={demos[(index + 1) % demos.length]!.path} aria-label="Next demo">
              <ArrowRight size={16} />
            </Link>
          </nav>
        </header>
      )}
      <div id="demo-content" tabIndex={-1} className={demo ? styles.demoContent : undefined}>
        <Outlet />
      </div>
    </>
  );
}
export function RouteError({ reset }: { reset?: () => void }) {
  return (
    <main className="route-message">
      <h1>This study couldn’t open.</h1>
      <p>Try again, or explore another design.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
      <Link to="/">Return to gallery</Link>
    </main>
  );
}
export function RouteNotFound() {
  return (
    <main className="route-message">
      <h1>That study isn’t in the collection.</h1>
      <Link to="/">Browse all designs</Link>
    </main>
  );
}
