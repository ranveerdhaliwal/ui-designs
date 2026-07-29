import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './BigBoldHeroLanding.module.css';

type Theme = 'oasis' | 'haven' | 'harmoniq' | 'arive' | 'ostra' | 'lumen' | 'vanta';

export function BigBoldHeroLanding() {
  const [theme, setTheme] = useState<Theme>('oasis');

  const renderOasis = () => (
    <div className={`${styles.themeWrapper} ${styles.oasis}`}>
      <header className={styles.headerOasis}>
        <div className={styles.logoOasis}>Oasis.</div>
        <nav className={styles.navLinks}>
          <span>Product</span>
          <span>Pricing</span>
          <span>Careers</span>
          <span>Contact</span>
        </nav>
        <button className={styles.btnOasisDark}>Schedule call</button>
      </header>
      <main className={styles.heroOasis}>
        <h1 className={styles.titleSerifOasis}>
          A calmer way to<br/>ship software.
        </h1>
        <p className={styles.subtitleOasis}>
          A <strong>focused platform</strong> for teams that<br/>value clarity over chaos.
        </p>
        <button className={styles.btnOasisLight}>Explore</button>
      </main>
      <div className={styles.bottomScroll}>START YOUR JOURNEY &darr;</div>
    </div>
  );

  const renderHaven = () => (
    <div className={`${styles.themeWrapper} ${styles.haven}`}>
      <header className={styles.headerFloatingCenter}>
        <div className={styles.floatingNavContainer}>
          <div className={styles.logoHaven}>
            <span className={styles.havenIcon}>&#11042;</span> Haven
          </div>
          <nav className={styles.navLinksCenter}>
            <span>Home</span>
            <span>Usecases</span>
            <span>Pricing</span>
            <span>Careers</span>
            <span>Contact</span>
          </nav>
          <button className={styles.btnHavenDark}>Login</button>
        </div>
      </header>
      <main className={styles.heroCenter}>
        <div className={styles.pillBadge}>We just raised 20M 🚀</div>
        <h1 className={styles.titleSansLarge}>Design with ease.</h1>
        <p className={styles.subtitleCenter}>
          Design smarter with AI that understands you.<br/>So you can take a breath.
        </p>
        <div className={styles.actionRow}>
          <button className={styles.btnHavenLight}>Get Started &rarr;</button>
          <span className={styles.textLink}>Watch Demo</span>
        </div>
      </main>
      <div className={styles.bottomScrollPill}>SCROLL &darr;</div>
    </div>
  );

  const renderHarmoniq = () => (
    <div className={`${styles.themeWrapper} ${styles.harmoniq}`}>
      <header className={styles.headerOasis}>
        <div className={styles.logoHarmoniq}>
          <span className={styles.harmoniqIcon}>&#10033;</span> Harmoniq
        </div>
        <nav className={styles.navLinks}>
          <span>Home</span>
          <span>Pricing</span>
          <span>About</span>
          <span>Contact</span>
        </nav>
        <button className={styles.btnOasisDark}>Book a demo</button>
      </header>
      <main className={styles.heroCenterTop}>
        <div className={styles.pillBadgeLight}>We just raised 20M 🚀</div>
        <h1 className={styles.titleSerifElegant}>
          Your Haven for<br/>Seamless AI Solutions
        </h1>
        <p className={styles.subtitleHarmoniq}>
          Empowering you with intelligent, effortless tools to streamline your workflow, enhance<br/>collaboration, and achieve more—seamlessly.
        </p>
        <div className={styles.actionRowCenter}>
          <button className={styles.btnOasisDark}>Book a demo</button>
          <button className={styles.btnPlay}>&#9654;</button>
        </div>
      </main>
    </div>
  );

  const renderArive = () => (
    <div className={`${styles.themeWrapper} ${styles.arive}`}>
      <header className={styles.headerFloatingCenter}>
        <div className={styles.floatingNavDark}>
          <div className={styles.logoArive}>&#10041;</div>
          <nav className={styles.navLinksCenterDark}>
            <span>Home</span>
            <span>Features</span>
            <span>Careers</span>
          </nav>
          <button className={styles.btnAriveBlue}>Login</button>
        </div>
      </header>
      <main className={styles.heroArive}>
        <div className={styles.pillBadgeLight}>We just raised 20M 🚀</div>
        <h1 className={styles.titleArive}>
          Email for modern<br/>tech companies
        </h1>
        <div className={styles.actionRowArive}>
          <button className={styles.btnAriveWhite}>Get Started</button>
          <span className={styles.textLinkArive}>Read Docs &rarr;</span>
        </div>
        
        {/* Logos */}
        <div className={styles.logosRow}>
          <span>INTERCOM</span>
          <span>Raycast</span>
          <span>Linear</span>
          <span>airbnb</span>
          <span>loom</span>
        </div>

        {/* Glass Dashboard Mockup */}
        <div className={styles.glassDashboard}>
          <div className={styles.dashSidebar}>
            <div className={styles.dashLogo}>arive</div>
            <div className={styles.dashMenu}>
              <div className={styles.dashActive}>Dashboard</div>
              <div>Products</div>
              <div>Orders</div>
            </div>
          </div>
          <div className={styles.dashMain}>
            <div className={styles.dashHeader}>
              <div className={styles.dashSearch}>Search orders...</div>
              <div className={styles.dashProfile}>Hussein Ahmed</div>
            </div>
            <h3 className={styles.dashTitle}>Dashboard</h3>
            <div className={styles.dashWidgets}>
              <div className={styles.widgetGreen}>95,800</div>
              <div className={styles.widgetPurple}>95,800</div>
              <div className={styles.widgetOrange}>95,800</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const renderOstra = () => (
    <div className={`${styles.themeWrapper} ${styles.ostra}`}>
      <header className={styles.headerOstra}>
        <div className={styles.logoOstra}>
          <span className={styles.ostraIcon}>&#10022;</span> OSTRA
        </div>
        <nav className={styles.navLinksOstra}>
          <span>Home</span>
          <span>Platform</span>
          <span>Technology</span>
          <span>About</span>
        </nav>
        <button className={styles.btnOstraOutline}>Start Free</button>
      </header>
      <main className={styles.heroOstra}>
        <div className={styles.badgeOstra}>
          <span className={styles.badgeOstraNew}>New</span> AI Universe Visualization Platform
        </div>
        <h1 className={styles.titleOstra}>
          See The Universe With<br/>Smart Visualization
        </h1>
        <p className={styles.subtitleOstra}>
          OSTRA transforms space data into immersive AI-powered visuals. Explore<br/>galaxies and cosmic patterns like never before.
        </p>
        <div className={styles.actionRowOstra}>
          <button className={styles.btnOstraPrimary}>Start Free &rarr;</button>
          <button className={styles.btnOstraSecondary}>Watch Demo</button>
        </div>
      </main>
    </div>
  );

  const renderLumen = () => (
    <div className={`${styles.themeWrapper} ${styles.lumen}`}>
      <header className={styles.headerLumen}>
        <div className={styles.logoLumen}>
          <span className={styles.lumenIcon}>&#11822;</span> Lumen Gate
        </div>
        <nav className={styles.navLinksLumen}>
          <span>Product</span>
          <span>Intelligence</span>
          <span>Pricing</span>
        </nav>
        <button className={styles.btnLumenLight}>Enter Intelligence</button>
      </header>
      <main className={styles.heroLumen}>
        <h1 className={styles.titleLumen}>
          Work smarter. Move faster.<br/>Grow with AI.
        </h1>
        <p className={styles.subtitleLumen}>
          Automate tasks and make smarter decisions with intelligent workflows.<br/>Lumen Gate helps you save time and focus on what matters.
        </p>
        <div className={styles.actionRowLumen}>
          <button className={styles.btnLumenLightLg}>Enter Intelligence</button>
          <button className={styles.btnLumenOutline}>See It In Action &gt;</button>
        </div>
        
        <div className={styles.lumenLogosBox}>
          <div className={styles.lumenLogosLabel}>Inspired by Teams at:</div>
          <div className={styles.lumenLogos}>
            <span>Google</span>
            <span>Microsoft</span>
            <span>Figma</span>
            <span>Framer</span>
          </div>
        </div>
      </main>
    </div>
  );

  const renderVanta = () => (
    <div className={`${styles.themeWrapper} ${styles.vanta}`}>
      <header className={styles.headerVanta}>
        <div className={styles.vantaBracketNav}>
          <span className={styles.vantaBracket}>&#9487;</span>
          <nav className={styles.navLinksVanta}>
            <span>Home</span>
            <span>Platform</span>
            <span>Contact</span>
          </nav>
          <span className={styles.vantaBracket}>&#9491;</span>
        </div>
        <div className={styles.logoVanta}>
          <span className={styles.vantaIcon}>&#11270;</span> vanta
        </div>
        <div className={styles.vantaBracketNavRight}>
          <span className={styles.vantaBracket}>&#9487;</span>
          <button className={styles.btnVantaOutline}>Get Access</button>
          <span className={styles.vantaBracket}>&#9491;</span>
        </div>
      </header>
      <main className={styles.heroVanta}>
        <div className={styles.vantaBracketBadge}>
          <span className={styles.vantaBracketSm}>&#9487;</span>
          Future Business Systems
          <span className={styles.vantaBracketSm}>&#9491;</span>
        </div>
        <h1 className={styles.titleVanta}>
          <span className={styles.vantaSans}>Smart AI Systems For</span><br/>
          <span className={styles.vantaSerif}>Modern Business Operations</span>
        </h1>
        <p className={styles.subtitleVanta}>
          Automate Operations, Workflows, And Business Decisions With<br/>
          Intelligent Systems Built For The Future.
        </p>
        <div className={styles.actionRowVanta}>
          <div className={styles.vantaBracketBtnBox}>
            <span className={styles.vantaBracketSm}>&#9487;</span>
            <button className={styles.btnVantaDark}>Start Building &nearr;</button>
            <span className={styles.vantaBracketSm}>&#9491;</span>
          </div>
          <div className={styles.vantaBracketBtnBox}>
            <span className={styles.vantaBracketSm}>&#9487;</span>
            <button className={styles.btnVantaGhost}>Learn More</button>
            <span className={styles.vantaBracketSm}>&#9491;</span>
          </div>
        </div>
        
        <div className={styles.vantaTrusted}>
          <div className={styles.vantaTrustedLabel}>Trusted By Teams</div>
          <div className={styles.vantaBracketLogos}>
            <span className={styles.vantaBracket}>&#9487;</span>
            <div className={styles.vantaLogosInner}>
              <span>stripe</span>
              <span>Framer</span>
              <span>Linear</span>
              <span>OpenAI</span>
            </div>
            <span className={styles.vantaBracket}>&#9491;</span>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>&larr; Hub</Link>
      
      {theme === 'oasis' && renderOasis()}
      {theme === 'haven' && renderHaven()}
      {theme === 'harmoniq' && renderHarmoniq()}
      {theme === 'arive' && renderArive()}
      {theme === 'ostra' && renderOstra()}
      {theme === 'lumen' && renderLumen()}
      {theme === 'vanta' && renderVanta()}

      {/* Theme Switcher Controls */}
      <div className={styles.themeControls}>
        <div className={styles.controlsLabel}>Select Theme</div>
        <div className={styles.controlsRow}>
          <button className={theme === 'oasis' ? styles.btnActive : ''} onClick={() => setTheme('oasis')}>Oasis</button>
          <button className={theme === 'haven' ? styles.btnActive : ''} onClick={() => setTheme('haven')}>Haven</button>
          <button className={theme === 'harmoniq' ? styles.btnActive : ''} onClick={() => setTheme('harmoniq')}>Harmoniq</button>
          <button className={theme === 'arive' ? styles.btnActive : ''} onClick={() => setTheme('arive')}>Arive</button>
          <button className={theme === 'ostra' ? styles.btnActive : ''} onClick={() => setTheme('ostra')}>Ostra</button>
          <button className={theme === 'lumen' ? styles.btnActive : ''} onClick={() => setTheme('lumen')}>Lumen</button>
          <button className={theme === 'vanta' ? styles.btnActive : ''} onClick={() => setTheme('vanta')}>Vanta</button>
        </div>
      </div>
    </div>
  );
}
