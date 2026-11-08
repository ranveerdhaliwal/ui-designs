import { Dialog } from '@/components/ui/Dialog';
import { useStoredState } from '@/hooks/useStoredState';
import { SectionLink } from '@/components/ui/SectionLink';
import { ArrowDown, ArrowUpRight, Minus, Plus } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import styles from './FlyingPapersLanding.module.css';
const products = [
  {
    name: 'Original papers',
    tag: 'The everyday original',
    color: '#ed593f',
    size: '32 leaves / natural fibre',
  },
  {
    name: 'The long roll',
    tag: 'Room for your imagination',
    color: '#e5c85a',
    size: 'One continuous paper roll',
  },
  {
    name: 'Pocket edition',
    tag: 'Good things. Small package.',
    color: '#a5bd99',
    size: 'Compact / unbleached paper',
  },
];
export function FlyingPapersLanding() {
  const [bag, setBag] = useStoredState(
    'flying-papers-bag-v1',
    [0, 0, 0],
    (v): v is number[] =>
      Array.isArray(v) && v.length === 3 && v.every((n) => Number.isInteger(n) && n >= 0 && n <= 9),
  );
  const [bagOpen, setBagOpen] = useState(false);
  const total = bag.reduce((a, b) => a + b, 0);
  const change = (i: number, d: number) =>
    setBag((prev) => prev.map((n, j) => (i === j ? Math.max(0, Math.min(9, n + d)) : n)));
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SectionLink target="collection">
          THE GOODS <ArrowDown size={14} />
        </SectionLink>
        <strong>
          FLYING
          <br />
          PAPERS®
        </strong>
        <button onClick={() => setBagOpen(true)}>BAG ({total})</button>
      </header>
      <section className={styles.hero}>
        <p>SMALL PAPER. BIG PERSONALITY.</p>
        <h1>
          GOOD THINGS
          <br />
          <em>TAKE FLIGHT.</em>
        </h1>
        <div className={styles.mascot} aria-hidden="true">
          <i />
          <i />
          <b />
        </div>
        <div className={styles.heroBottom}>
          <p>
            Made for the moments
            <br />
            that refuse to be ordinary.
          </p>
          <SectionLink target="collection">
            MEET THE COLLECTION <ArrowDown size={20} />
          </SectionLink>
          <span>
            INDEPENDENT SPIRIT.
            <br />
            SINCE THIS VERY MOMENT.
          </span>
        </div>
      </section>
      <div className={styles.ribbon} aria-hidden="true">
        FEEL GOOD. FLY HIGH. &nbsp; ✳ &nbsp; FEEL GOOD. FLY HIGH. &nbsp; ✳ &nbsp; FEEL GOOD. FLY
        HIGH.
      </div>
      <section id="collection" className={styles.collection}>
        <div className={styles.sectionTop}>
          <p>01 / PICK YOUR CO-PILOT</p>
          <h2>
            Little packages.
            <br />
            Loud personalities.
          </h2>
        </div>
        <div className={styles.products}>
          {products.map((product, i) => (
            <article key={product.name} style={{ '--pack': product.color } as CSSProperties}>
              <div className={styles.productStage}>
                <div className={styles.package}>
                  <span>FLYING PAPERS®</span>
                  <strong>{['ORIGINAL', 'LONG ROLL', 'POCKET'][i]}</strong>
                  <div className={styles.packFace}>
                    ••
                    <i />
                  </div>
                  <small>{product.size}</small>
                </div>
              </div>
              <div className={styles.productInfo}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.tag}</p>
                </div>
                <button aria-label={`Add ${product.name} to bag`} onClick={() => change(i, 1)}>
                  <Plus size={22} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.note} role="status">
          {total
            ? `${total} ${total === 1 ? 'item' : 'items'} in your sample bag.`
            : 'A product design concept. Build a sample bag and make it your own.'}
        </p>
      </section>
      <section className={styles.statement}>
        <span>02 / STAY A LITTLE WEIRD</span>
        <h2>
          Not everything
          <br />
          needs to be
          <br />
          <em>so serious.</em>
        </h2>
        <p>
          Thoughtful materials. Playful details.
          <br />A little everyday escape.
        </p>
        <SectionLink target="collection">
          FIND YOUR FAVOURITE <ArrowUpRight size={18} />
        </SectionLink>
      </section>
      <footer>
        FLYING PAPERS® <span>AN INDEPENDENT DESIGN STUDY / 2026</span>
      </footer>
      <Dialog
        open={bagOpen}
        onOpenChange={setBagOpen}
        title={`Your bag (${total})`}
        description="A sample collection, saved on this device."
      >
        {total === 0 ? (
          <p>Your bag is waiting for a little personality.</p>
        ) : (
          products.map(
            (product, i) =>
              bag[i] > 0 && (
                <div className={styles.bagRow} key={product.name}>
                  <strong>{product.name}</strong>
                  <div>
                    <button aria-label={`Remove one ${product.name}`} onClick={() => change(i, -1)}>
                      <Minus size={15} />
                    </button>
                    <output>{bag[i]}</output>
                    <button
                      aria-label={`Add one ${product.name}`}
                      onClick={() => change(i, 1)}
                      disabled={bag[i] >= 9}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              ),
          )
        )}
        <p className={styles.note}>This is a local preview. No orders or payments are taken.</p>
        <button className={styles.keepExploring} onClick={() => setBagOpen(false)}>
          KEEP EXPLORING <ArrowUpRight size={18} />
        </button>
      </Dialog>
    </div>
  );
}
