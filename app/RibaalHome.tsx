"use client";

/* eslint-disable @next/next/no-img-element -- Art-directed campaign crops and CSS sprite positioning require native images. */

import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Ribaal.module.css";

const featuredLooks = [
  {
    name: "Noor",
    note: "Midnight silk · silver aari",
    position: "100% 0%",
    className: styles.featureSideLeft,
  },
  {
    name: "Mehraab",
    note: "Wine velvet · antique zardozi",
    position: "0% 0%",
    className: styles.featureLead,
  },
  {
    name: "Ziya",
    note: "Emerald brocade · bronze resham",
    position: "100% 100%",
    className: styles.featureSideRight,
  },
];

const collections = [
  {
    index: "01",
    name: "The Wedding Icons",
    note: "Wine & antique gold",
    position: "0% 0%",
  },
  {
    index: "02",
    name: "The Evening Court",
    note: "Midnight & silver",
    position: "100% 0%",
  },
  {
    index: "03",
    name: "The Heirloom Ivory",
    note: "Ivory & soft gold",
    position: "0% 100%",
  },
  {
    index: "04",
    name: "The Emerald Majlis",
    note: "Emerald & bronze",
    position: "100% 100%",
  },
];

const footerLinks = {
  Discover: ["New arrivals", "Sherwanis", "Wedding edit", "Accessories"],
  Ribaal: ["Our story", "Craft journal", "Appointments", "Contact"],
  Service: ["Shipping", "Returns", "Care guide", "Size assistance"],
};

export function RibaalHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const accountDialogRef = useRef<HTMLDialogElement>(null);
  const lenisRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const scrollLockRef = useRef<{
    bodyOverflow: string;
    htmlOverflow: string;
  } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [curtainPinned, setCurtainPinned] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState("");

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const lockPageScroll = () => {
    if (!scrollLockRef.current) {
      scrollLockRef.current = {
        bodyOverflow: document.body.style.overflow,
        htmlOverflow: document.documentElement.style.overflow,
      };
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    lenisRef.current?.stop();
  };

  const unlockPageScroll = () => {
    const savedOverflow = scrollLockRef.current;
    if (savedOverflow) {
      document.body.style.overflow = savedOverflow.bodyOverflow;
      document.documentElement.style.overflow = savedOverflow.htmlOverflow;
      scrollLockRef.current = null;
    }
    lenisRef.current?.start();
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.body.classList.add("Ribaal-page");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let cancelled = false;
    let disposeMotion: (() => void) | undefined;

    const updateNativeScroll = () => setScrolled(window.scrollY > 54);
    updateNativeScroll();

    if (reducedMotion.matches) {
      window.addEventListener("scroll", updateNativeScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", updateNativeScroll);
        unlockPageScroll();
        document.body.classList.remove("Ribaal-page");
      };
    }

    const initialiseMotion = async () => {
      const [{ default: Lenis }, gsapModule, scrollTriggerModule] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      const { gsap } = gsapModule;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.05,
        anchors: { offset: -96 },
      });
      lenisRef.current = lenis;
      if (scrollLockRef.current) lenis.stop();

      const onLenisScroll = ({ scroll }: { scroll: number }) => {
        setScrolled(scroll > 54);
        ScrollTrigger.update();
      };
      const ticker = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", onLenisScroll);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        const heroMedia = root.querySelector<HTMLElement>("[data-hero-media]");
        const heroCopy = root.querySelector<HTMLElement>("[data-hero-copy]");
        const heroVeil = root.querySelector<HTMLElement>("[data-hero-veil]");

        if (heroMedia && heroCopy && heroVeil) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.querySelector("[data-hero]"),
                start: "top top",
                end: "bottom top",
                scrub: 1.05,
              },
            })
            .to(heroMedia, { scale: 1.085, yPercent: 5, ease: "none" }, 0)
            .to(
              heroCopy,
              { yPercent: -18, autoAlpha: 0.08, ease: "power1.inOut" },
              0,
            )
            .to(heroVeil, { opacity: 0.78, ease: "power1.inOut" }, 0);
        }

        const featuredCards = gsap.utils.toArray<HTMLElement>(
          "[data-feature-card]",
          root,
        );
        const featuredTitle = root.querySelector<HTMLElement>(
          "[data-feature-title]",
        );
        if (featuredCards.length === 3 && featuredTitle) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.querySelector("[data-featured]"),
                start: "top top",
                end: "bottom bottom",
                scrub: 1.15,
              },
            })
            .fromTo(
              featuredTitle,
              { yPercent: 24, opacity: 0.55 },
              { yPercent: -12, opacity: 1, ease: "power2.out" },
              0,
            )
            .fromTo(
              featuredCards[0],
              { xPercent: -28, yPercent: 18, rotate: -4, scale: 0.88 },
              {
                xPercent: 0,
                yPercent: -4,
                rotate: -1.25,
                scale: 1,
                ease: "power2.out",
              },
              0,
            )
            .fromTo(
              featuredCards[1],
              { yPercent: 18, scale: 0.9 },
              { yPercent: -7, scale: 1, ease: "power2.out" },
              0.05,
            )
            .fromTo(
              featuredCards[2],
              { xPercent: 28, yPercent: 18, rotate: 4, scale: 0.88 },
              {
                xPercent: 0,
                yPercent: -4,
                rotate: 1.25,
                scale: 1,
                ease: "power2.out",
              },
              0,
            );
        }

        const storyImage = root.querySelector<HTMLElement>("[data-story-image]");
        const storyCopy = root.querySelector<HTMLElement>("[data-story-copy]");
        if (storyImage && storyCopy) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root.querySelector("[data-story]"),
                start: "top top",
                end: "bottom bottom",
                scrub: 1.1,
              },
            })
            .fromTo(
              storyImage,
              { scale: 1.02, yPercent: -3 },
              { scale: 1.14, yPercent: 6, ease: "none" },
              0,
            )
            .fromTo(
              storyCopy,
              { yPercent: 16, opacity: 0.68 },
              { yPercent: -8, opacity: 1, ease: "power2.out" },
              0,
            );
        }

        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", root)
          .forEach((element) => {
            gsap.fromTo(
              element,
              { y: 58, opacity: 0, scale: 0.985 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  end: "top 58%",
                  scrub: 0.8,
                },
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>("[data-parallax]", root)
          .forEach((element, index) => {
            gsap.fromTo(
              element,
              { yPercent: index % 2 ? 4 : -4 },
              {
                yPercent: index % 2 ? -5 : 5,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              },
            );
          });
      }, root);

      const refresh = () => {
        if (!cancelled) ScrollTrigger.refresh();
      };
      const imageReady = Array.from(root.querySelectorAll("img")).map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            }),
      );
      Promise.all(imageReady).then(refresh);
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });

      disposeMotion = () => {
        window.removeEventListener("load", refresh);
        context.revert();
        gsap.ticker.remove(ticker);
        gsap.ticker.lagSmoothing(500, 33);
        ScrollTrigger.config({ ignoreMobileResize: false });
        lenis.off("scroll", onLenisScroll);
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    void initialiseMotion();

    return () => {
      cancelled = true;
      unlockPageScroll();
      disposeMotion?.();
      document.body.classList.remove("Ribaal-page");
    };
  }, []);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = String(data.get("query") ?? "").trim();
    setSearchFeedback(
      query
        ? `Showing the atelier edit for “${query}”.`
        : "Enter a style, colour, or occasion to search.",
    );
  };

  const curtainIsOpen = !scrolled || curtainPinned;

  return (
    <div className={styles.RibaalRoot} ref={rootRef}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>

      <header
        className={`${styles.siteHeader} ${scrolled ? styles.headerScrolled : ""}`}
      >
        <div className={styles.navBar}>
          <a className={styles.markLink} href="#top" aria-label="Ribaal home">
            <img src="/ribaal/brand-mark.svg" alt="" width="46" height="46" />
          </a>
          <a className={styles.wordmark} href="#top" aria-label="Ribaal home">
            Ribaal
          </a>
          <div className={styles.navActions}>
            <form
              className={`${styles.searchForm} ${searchOpen ? styles.searchOpen : ""}`}
              onSubmit={submitSearch}
              role="search"
            >
              <label className={styles.srOnly} htmlFor="Ribaal-search">
                Search Ribaal
              </label>
              <input
                id="Ribaal-search"
                name="query"
                ref={searchInputRef}
                type="search"
                placeholder="Search the atelier"
                tabIndex={searchOpen ? 0 : -1}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSearchOpen(false);
                    searchButtonRef.current?.focus();
                  }
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
              />
              <button
                className={styles.searchButton}
                ref={searchButtonRef}
                type={searchOpen ? "submit" : "button"}
                aria-expanded={searchOpen}
                aria-controls="Ribaal-search"
                onClick={() => setSearchOpen(true)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 5 5" />
                </svg>
                <span className={styles.srOnly}>Search</span>
              </button>
            </form>
            <button
              className={styles.loginButton}
              type="button"
              onClick={() => {
                accountDialogRef.current?.showModal();
                lockPageScroll();
              }}
            >
              Login
            </button>
          </div>
        </div>

        <div
          className={`${styles.curtain} ${curtainIsOpen ? styles.curtainOpen : ""}`}
          data-collapsed={scrolled && !curtainPinned}
        >
          <span className={styles.curtainPattern} aria-hidden="true" />
          <nav className={styles.curtainNav} aria-label="Primary navigation">
            <a href="#featured">Featured</a>
            <a href="#story">Our story</a>
            <a href="#collections">Collections</a>
            <a href="#footer">Contact</a>
          </nav>
          <span className={styles.curtainPattern} aria-hidden="true" />
          <button
            className={styles.curtainHandle}
            type="button"
            aria-label={curtainIsOpen ? "Collapse navigation curtain" : "Open navigation curtain"}
            aria-expanded={curtainIsOpen}
            onClick={() => setCurtainPinned((value) => !value)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.hero} id="top" data-hero>
          <div className={styles.heroMedia} data-hero-media>
            <img
              src="/ribaal/hero-sherwani.png"
              alt="A man wearing an ivory hand-embroidered sherwani"
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </div>
          <div className={styles.heroVeil} data-hero-veil aria-hidden="true" />
          <div className={styles.heroCopy} data-hero-copy>
            <p className={styles.eyebrow}>The ceremonial edit · volume I</p>
            <h1>Ribaal</h1>
            <p className={styles.heroSlogan}>
              Made slowly.
              <br />
              Remembered forever.
            </p>
            <a className={styles.heroCta} href="#featured">
              Discover the collection
              <span aria-hidden="true">↘</span>
            </a>
          </div>
          <div className={styles.heroIndex} aria-hidden="true">
            <span>RYB · 001</span>
            <span>New Delhi / 28.6139° N</span>
          </div>
          <a className={styles.scrollCue} href="#featured" aria-label="Scroll to featured collection">
            <span>Scroll to explore</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section className={styles.featured} id="featured" data-featured>
          <div className={styles.featuredSticky}>
            <header className={styles.featuredHeading} data-feature-title>
              <p className={styles.sectionKicker}>A hand-finished collection</p>
              <h2>
                For the rarest
                <br />
                kind of occasion
              </h2>
              <p>
                Ceremonial silhouettes, cut with restraint and embroidered with
                a patience you can feel.
              </p>
            </header>
            <div className={styles.featureStage} aria-label="Featured Ribaal looks">
              {featuredLooks.map((look) => (
                <article
                  className={`${styles.featureCard} ${look.className}`}
                  key={look.name}
                  data-feature-card
                >
                  <div
                    className={styles.spriteImage}
                    style={{ backgroundPosition: look.position }}
                    role="img"
                    aria-label={`${look.name}, ${look.note}`}
                  />
                  <div className={styles.featureCaption}>
                    <span>{look.name}</span>
                    <small>{look.note}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.story} id="story" data-story>
          <div className={styles.storySticky}>
            <figure className={styles.storyImageWrap}>
              <img
                src="/ribaal/craft-detail.png"
                alt="A close view of hand-worked gold embroidery on a sherwani"
                width="1122"
                height="1402"
                loading="lazy"
                data-story-image
              />
              <figcaption>One motif, hundreds of patient stitches.</figcaption>
            </figure>
            <article className={styles.storyCard} data-story-copy>
              <span className={styles.storyNumber}>Est. with intention · 2026</span>
              <p className={styles.sectionKicker}>The Ribaal story</p>
              <h2>Clothes for the moments that become heirlooms.</h2>
              <p>
                Ribaal began with a simple belief: ceremonial clothing should
                feel as personal as the rituals, promises, and memories it
                witnesses.
              </p>
              <p>
                Every sherwani moves through many hands—pattern cutters,
                embroiderers, button makers, and finishers—before it reaches
                yours. We honour that time with considered silhouettes,
                breathable textiles, and detail that rewards a closer look.
              </p>
              <a href="#collections">
                Enter the atelier <span aria-hidden="true">→</span>
              </a>
            </article>
          </div>
        </section>

        <section className={styles.collections} id="collections">
          <div className={styles.collectionWash} aria-hidden="true" />
          <header className={styles.collectionHeading} data-reveal>
            <p className={styles.sectionKicker}>Choose your chapter</p>
            <h2>The house collections</h2>
            <p>
              Four moods, one point of view—quietly regal, deeply Indian, and
              made to move with you.
            </p>
          </header>

          <div className={styles.collectionGrid}>
            {collections.map((collection) => (
              <article
                className={styles.collectionCard}
                key={collection.name}
                data-reveal
              >
                <div className={styles.archFrame} data-parallax>
                  <div
                    className={styles.spriteImage}
                    style={{ backgroundPosition: collection.position }}
                    role="img"
                    aria-label={`${collection.name}: ${collection.note}`}
                  />
                </div>
                <div className={styles.collectionMeta}>
                  <span>{collection.index}</span>
                  <h3>{collection.name}</h3>
                  <p>{collection.note}</p>
                  <a href="#footer" aria-label={`Enquire about ${collection.name}`}>
                    View edit <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <a className={styles.collectionCta} href="#footer" data-reveal>
            Explore all sherwanis
            <span aria-hidden="true">→</span>
          </a>
          <div className={styles.collectionAfterglow} aria-hidden="true" />
        </section>
      </main>

      <footer className={styles.footer} id="footer">
        <div className={styles.footerArch} aria-hidden="true" />
        <div className={styles.footerBody}>
          <div className={styles.footerIntro}>
            <img src="/ribaal/brand-mark.svg" alt="" width="64" height="64" />
            <p className={styles.footerWordmark}>Ribaal</p>
            <p>
              Ceremonial menswear, shaped by hand in India and made for a life
              well remembered.
            </p>
            <a href="mailto:atelier@Ribaal.example">atelier@Ribaal.example</a>
          </div>

          <div className={styles.footerLinks}>
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h2>{heading}</h2>
                {links.map((link) => (
                  <a href="#top" key={link}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.footerNote}>
            <p>Private fittings · New Delhi</p>
            <p>Worldwide consultations by appointment</p>
            <div>
              <a href="#top" aria-label="Instagram">ig</a>
              <a href="#top" aria-label="Pinterest">p</a>
              <a href="#top" aria-label="Facebook">f</a>
            </div>
          </div>
        </div>
        <div className={styles.footerLegal}>
          <span>© 2026 Ribaal Atelier</span>
          <span>Privacy · Terms · Accessibility</span>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className={styles.footerBorder} aria-hidden="true" />
      </footer>

      <p className={styles.searchFeedback} aria-live="polite">
        {searchFeedback}
      </p>

      <dialog
        className={styles.accountDialog}
        ref={accountDialogRef}
        aria-labelledby="Ribaal-account-title"
        onClose={unlockPageScroll}
        onClick={(event) => {
          if (event.currentTarget === event.target) event.currentTarget.close();
        }}
      >
        <button
          className={styles.dialogClose}
          type="button"
          onClick={() => accountDialogRef.current?.close()}
          aria-label="Close login dialog"
        >
          ×
        </button>
        <img src="/ribaal/brand-mark.svg" alt="" width="56" height="56" />
        <p className={styles.sectionKicker}>The Ribaal account</p>
        <h2 id="Ribaal-account-title">Your private atelier</h2>
        <p>
          Save measurements, appointments, and considered pieces in one place.
        </p>
        <form method="dialog">
          <label htmlFor="account-email">Email address</label>
          <input id="account-email" type="email" autoComplete="email" required />
          <button type="submit">Continue with email</button>
        </form>
        <small>Secure account services are shown as a storefront preview.</small>
      </dialog>
    </div>
  );
}
