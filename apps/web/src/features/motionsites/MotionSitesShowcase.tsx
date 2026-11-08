import {
  CastleBrutalistWaitlist,
  CinematicFilmAuth,
  FlorenHorizon,
  VitraWaitlist,
} from '@/components/motionsites';
import {
  Check,
  Code,
  Copy,
  ExternalLink,
  Layers,
  Maximize2,
  Shield,
  Sparkles,
  Sun,
} from 'lucide-react';
import { useState } from 'react';
import styles from './MotionSitesShowcase.module.css';

type ShowcaseTab = 'grid' | 'vitra' | 'floren' | 'castle' | 'cinema';

export function MotionSitesShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('vitra');
  const [assetMode, setAssetMode] = useState<'hd' | 'ref'>('hd');
  const [showCodeDrawer, setShowCodeDrawer] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Asset paths based on assetMode
  const vitraAsset =
    assetMode === 'hd'
      ? '/assets/motionsites/vitra_hd_art.jpg'
      : '/assets/motionsites/vitra_illustration.png';

  const castleAsset =
    assetMode === 'hd'
      ? '/assets/motionsites/castle_hd_monument.jpg'
      : '/assets/motionsites/castle_monument.png';

  const florenVillageAsset = '/assets/motionsites/floren_village.png';
  const florenCharacterAsset = '/assets/motionsites/floren_character.png';

  const cinemaAsset =
    assetMode === 'hd'
      ? '/assets/motionsites/cinema_hd_night.jpg'
      : '/assets/motionsites/cinema_night_figure.png';

  const getCodeSnippet = () => {
    switch (activeTab) {
      case 'vitra':
        return `import { VitraWaitlist } from '@/components/motionsites';

export function MyLandingHero() {
  return (
    <VitraWaitlist
      brandName="Vitra"
      headline="Good things are on the way."
      description="We're building something meaningful. Join the waitlist and be the first to know when we launch."
      illustrationSrc="${vitraAsset}"
      enableParallax={true}
      onJoinWaitlist={async (email) => {
        console.log("Joined waitlist:", email);
      }}
    />
  );
}`;
      case 'floren':
        return `import { FlorenHorizon } from '@/components/motionsites';

export function MyFooterSection() {
  return (
    <FlorenHorizon
      brandName="Floren"
      brandTagline="Helping teams collaborate, communicate, and achieve more together."
      newsletterTitle="Stay in the loop"
      newsletterSubtitle="Get the latest updates, tips, and news delivered to your inbox."
      villageImageSrc="${florenVillageAsset}"
      characterImageSrc="${florenCharacterAsset}"
      onSubmitNewsletter={async (email) => {
        console.log("Subscribed:", email);
      }}
    />
  );
}`;
      case 'castle':
        return `import { CastleBrutalistWaitlist } from '@/components/motionsites';

export function MyEditorialWaitlist() {
  return (
    <CastleBrutalistWaitlist
      brandName="Castle"
      headline="The waitlist is now open"
      subtitle="Be the first to know when we launch"
      monumentSrc="${castleAsset}"
      enableCanvasDither={true}
      onJoinWaitlist={async (email) => {
        console.log("Waitlist entry:", email);
      }}
    />
  );
}`;
      case 'cinema':
        return `import { CinematicFilmAuth } from '@/components/motionsites';

export function MyLoginPage() {
  return (
    <CinematicFilmAuth
      title="Welcome Back !"
      mediaSrc="${cinemaAsset}"
      showGrainOverlay={true}
      showBokehAnimation={true}
      onAuthenticate={async ({ mode, email, password }) => {
        console.log("Auth attempt:", mode, email);
      }}
      onSocialAuth={(provider) => {
        console.log("Social login:", provider);
      }}
    />
  );
}`;
      default:
        return `// Reusable MotionSites Components
import { 
  VitraWaitlist, 
  FlorenHorizon, 
  CastleBrutalistWaitlist, 
  CinematicFilmAuth 
} from '@/components/motionsites';

// Copy each component with its CSS module, local artwork, and assetUrl helper.
// React and lucide-react are required. Connect the typed callbacks to your API.
// Without callbacks, forms run locally and never submit data.`;
    }
  };

  const [copyError, setCopyError] = useState('');
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(getCodeSnippet());
      setCopiedCode(true);
      setCopyError('');
    } catch {
      setCopyError('Copy unavailable. Select the code below to copy it.');
    }
  };

  return (
    <div className={styles.container}>
      {/* 1. Header */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Small moments. Richer worlds.</h1>
          <p className={styles.subtitle}>
            Four illustrated interfaces. Explore the art, try the forms, and inspect the reusable
            components.
          </p>
        </div>

        <a
          href="https://motionsites.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.sourceBadge}
        >
          <span>Inspiration: MotionSites AI</span>
          <ExternalLink size={14} />
        </a>
      </header>

      {/* 2. Tabs Bar */}
      <div className={styles.tabsBar}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'grid' ? styles.tabBtnActive : ''}`}
          aria-pressed={activeTab === 'grid'}
          onClick={() => {
            setActiveTab('grid');
            setCopiedCode(false);
          }}
        >
          <Layers size={16} /> All studies
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'vitra' ? styles.tabBtnActive : ''}`}
          aria-pressed={activeTab === 'vitra'}
          onClick={() => {
            setActiveTab('vitra');
            setCopiedCode(false);
          }}
        >
          <Sun size={16} /> Vitra
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'floren' ? styles.tabBtnActive : ''}`}
          aria-pressed={activeTab === 'floren'}
          onClick={() => {
            setActiveTab('floren');
            setCopiedCode(false);
          }}
        >
          <Sparkles size={16} /> Floren
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'castle' ? styles.tabBtnActive : ''}`}
          aria-pressed={activeTab === 'castle'}
          onClick={() => {
            setActiveTab('castle');
            setCopiedCode(false);
          }}
        >
          <Shield size={16} /> Castle
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'cinema' ? styles.tabBtnActive : ''}`}
          aria-pressed={activeTab === 'cinema'}
          onClick={() => {
            setActiveTab('cinema');
            setCopiedCode(false);
          }}
        >
          <Sparkles size={16} /> Cinema
        </button>
      </div>

      {/* 3. Controls & Code Inspector Bar */}
      <div className={styles.mainCanvas}>
        <div className={styles.controlsBar}>
          <div className={styles.controlsLeft}>
            <div className={styles.controlGroup}>
              <span>Art Assets:</span>
              <button
                className={`${styles.toggleBtn} ${assetMode === 'hd' ? styles.toggleBtnActive : ''}`}
                onClick={() => setAssetMode('hd')}
              >
                Painted
              </button>
              <button
                className={`${styles.toggleBtn} ${assetMode === 'ref' ? styles.toggleBtnActive : ''}`}
                onClick={() => setAssetMode('ref')}
              >
                Original crop
              </button>
            </div>
          </div>

          <button
            className={styles.codeToggleBtn}
            onClick={() => setShowCodeDrawer(!showCodeDrawer)}
          >
            <Code size={15} />
            {showCodeDrawer ? 'Hide React Code' : 'View Reusable Code'}
          </button>
        </div>

        {/* Reusable Code Drawer */}
        {showCodeDrawer && (
          <div className={styles.codeDrawer}>
            <div className={styles.codeHeader}>
              <span>Portable Component Import Snippet</span>
              <button className={styles.copyCodeBtn} onClick={handleCopyCode}>
                {copiedCode ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                {copiedCode ? 'Copied to Clipboard!' : 'Copy Snippet'}
              </button>
            </div>
            {copyError && <p role="status">{copyError}</p>}
            <pre className={styles.preBlock}>
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>
        )}

        {/* 4. Display Content */}
        {activeTab === 'grid' && (
          <div className={styles.galleryGrid}>
            {/* 1. Vitra Card */}
            <div className={styles.galleryCardWrapper}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Vitra • Sunny Editorial Waitlist</span>
                <button
                  className={styles.cardExpandBtn}
                  onClick={() => {
                    setActiveTab('vitra');
                    setCopiedCode(false);
                  }}
                >
                  <Maximize2 size={13} /> Expand
                </button>
              </div>
              <VitraWaitlist illustrationSrc={vitraAsset} />
            </div>

            {/* 2. Floren Card */}
            <div className={styles.galleryCardWrapper}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Floren • Tuscan Horizon & Directory Footer</span>
                <button
                  className={styles.cardExpandBtn}
                  onClick={() => {
                    setActiveTab('floren');
                    setCopiedCode(false);
                  }}
                >
                  <Maximize2 size={13} /> Expand
                </button>
              </div>
              <FlorenHorizon
                villageImageSrc={florenVillageAsset}
                characterImageSrc={florenCharacterAsset}
              />
            </div>

            {/* 3. Castle Card */}
            <div className={styles.galleryCardWrapper}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Castle • 1-Bit Dithered Brutalist Waitlist</span>
                <button
                  className={styles.cardExpandBtn}
                  onClick={() => {
                    setActiveTab('castle');
                    setCopiedCode(false);
                  }}
                >
                  <Maximize2 size={13} /> Expand
                </button>
              </div>
              <CastleBrutalistWaitlist monumentSrc={castleAsset} />
            </div>

            {/* 4. Cinema Auth Card */}
            <div className={styles.galleryCardWrapper}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Cinema • 35mm Grain Noir Auth Card</span>
                <button
                  className={styles.cardExpandBtn}
                  onClick={() => {
                    setActiveTab('cinema');
                    setCopiedCode(false);
                  }}
                >
                  <Maximize2 size={13} /> Expand
                </button>
              </div>
              <CinematicFilmAuth mediaSrc={cinemaAsset} />
            </div>
          </div>
        )}

        {activeTab === 'vitra' && (
          <div className={styles.deepDiveView}>
            <VitraWaitlist illustrationSrc={vitraAsset} style={{ minHeight: '640px' }} />
          </div>
        )}

        {activeTab === 'floren' && (
          <div className={styles.deepDiveView}>
            <FlorenHorizon
              villageImageSrc={florenVillageAsset}
              characterImageSrc={florenCharacterAsset}
              style={{ minHeight: '680px' }}
            />
          </div>
        )}

        {activeTab === 'castle' && (
          <div className={styles.deepDiveView}>
            <CastleBrutalistWaitlist monumentSrc={castleAsset} style={{ minHeight: '640px' }} />
          </div>
        )}

        {activeTab === 'cinema' && (
          <div className={styles.deepDiveView}>
            <CinematicFilmAuth mediaSrc={cinemaAsset} style={{ minHeight: '640px' }} />
          </div>
        )}
      </div>
    </div>
  );
}
