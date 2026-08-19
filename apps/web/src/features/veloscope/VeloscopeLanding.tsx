import React, { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { getAssetUrl } from '@/lib/assetUtils';
import styles from './VeloscopeLanding.module.css';

export function VeloscopeLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const solutionRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible || 'visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(`.${styles.revealUp}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Absolute Back Button */}
      <Link 
        to="/" 
        style={{ 
          position: 'fixed', 
          top: '1.5rem', 
          left: '1.5rem', 
          zIndex: 9999, 
          background: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(10px)',
          padding: '0.5rem 1rem', 
          borderRadius: '99px',
          textDecoration: 'none',
          color: '#fff',
          fontWeight: '500',
          fontSize: '0.875rem'
        }}
      >
        &larr; Back to Hub
      </Link>

      <section 
        ref={heroRef}
        className={styles.hero} 
        style={{ backgroundImage: `url(${getAssetUrl('/assets/veloscope_hero_bg.png')})` }}
      >
        <header className={styles.nav}>
          <div className={styles.logo}>VELOSCOPE</div>
          <nav className={styles.navLinks}>
            <a href="#">Platform</a>
            <a href="#">Solutions</a>
            <a href="#">Network</a>
            <a href="#">Docs</a>
          </nav>
          <div className={styles.navRight}>
            <button className={`${styles.btnPrimary} ${styles.pill}`}>Access Console</button>
          </div>
        </header>

        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} hero-anim`}>
            Encrypted edge routing for global organizations.
          </h1>
          <div className={`${styles.badges} hero-anim`}>
            <div className={`${styles.pill} ${styles.glass}`}>ISO 27001 Certified</div>
            <div className={`${styles.pill} ${styles.glass}`}>Zero-Trust Architecture</div>
          </div>
          <p className={`${styles.heroSub} hero-anim`}>
            Secure data pipelines that execute locally across your infrastructure. 
            Complete cryptographic isolation, unified access control, and automated billing.
          </p>
          <div className={`${styles.heroCtas} hero-anim`}>
            <button className={`${styles.btnPrimary} ${styles.pill}`}>Request Access</button>
            <button className={`${styles.btnSecondary} ${styles.pill}`}>Start a trial</button>
          </div>
        </div>
      </section>

      <section ref={solutionRef} className={styles.solution}>
        <div className={styles.solutionContainer}>
          <span className={`${styles.sectionEyebrow} reveal-up`}>The Problem</span>
          <h2 className={`${styles.solutionTitle} reveal-up`}>
            Legacy networks bleed data.<br/>We sealed the pipes.
          </h2>
          <p className={`${styles.solutionDesc} reveal-up`}>
            Traditional enterprise routing relies on centralized chokepoints and fragmented security policies. 
            Veloscope introduces a decentralized mesh that encrypts traffic end-to-end, enforcing zero-trust 
            policies at the very edge of your network. No backdoors. No compromises.
          </p>
        </div>
      </section>

      <section ref={benefitsRef} className={styles.benefits}>
        <div className={styles.bentoGrid}>
          <div className={`${styles.bentoCard} ${styles.bentoLarge} reveal-up`}>
            <div className={styles.bentoIcon}>🔒</div>
            <h3 className={styles.bentoTitle}>Cryptographic Isolation</h3>
            <p className={styles.bentoDesc}>
              Every packet is wrapped in AES-256 encryption before it leaves the source. 
              Our hardware-accelerated nodes route traffic without ever inspecting the payload, 
              guaranteeing absolute data privacy across public and private links.
            </p>
          </div>
          <div className={`${styles.bentoCard} ${styles.bentoSmall} reveal-up`}>
            <div className={styles.bentoIcon}>🛡️</div>
            <h3 className={styles.bentoTitle}>Unified Access Control</h3>
            <p className={styles.bentoDesc}>
              Manage identity and access policies from a single pane of glass. Instantly revoke 
              sessions or restrict IP ranges globally within milliseconds.
            </p>
          </div>
          <div className={`${styles.bentoCard} ${styles.bentoSmall} reveal-up`}>
            <div className={styles.bentoIcon}>⚡</div>
            <h3 className={styles.bentoTitle}>Automated Billing</h3>
            <p className={styles.bentoDesc}>
              Stop guessing your transit costs. Our edge nodes meter traffic down to the byte, 
              providing real-time cost attribution by team, service, or geographic region.
            </p>
          </div>
          <div className={`${styles.bentoCard} ${styles.bentoLarge} reveal-up`}>
            <div className={styles.bentoIcon}>🌐</div>
            <h3 className={styles.bentoTitle}>Global Edge Network</h3>
            <p className={styles.bentoDesc}>
              Deploy workloads across 150+ edge locations worldwide. Veloscope intelligently routes 
              traffic through the path of least resistance, minimizing latency and avoiding congested 
              internet exchanges automatically.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.metrics}>
        <div className={styles.metricsGrid}>
          <div className="reveal-up">
            <div className={styles.metricValue}>99.999%</div>
            <div className={styles.metricLabel}>Uptime SLA</div>
          </div>
          <div className="reveal-up">
            <div className={styles.metricValue}>12ms</div>
            <div className={styles.metricLabel}>Global Avg Latency</div>
          </div>
          <div className="reveal-up">
            <div className={styles.metricValue}>4Tbps</div>
            <div className={styles.metricLabel}>Network Capacity</div>
          </div>
        </div>
      </section>

      <section 
        className={styles.finalCta}
        style={{ backgroundImage: `url(${getAssetUrl('/assets/veloscope_footer_bg.png')})` }}
      >
        <div className={styles.finalCtaContent}>
          <h2 className={styles.finalCtaTitle}>
            Engineering digital systems that outpace market shifts.
          </h2>
          <button className={`${styles.btnPrimary} ${styles.pill}`}>View Our Projects</button>
        </div>
      </section>
    </div>
  );
}
