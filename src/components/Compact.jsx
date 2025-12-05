import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { sphere, water, forest, question } from "../assets";
import { benefits } from "../constants";
import { client, urlFor } from "../lib/sanity";

/**
 * SectionBlock : bloc centré + fade-in + palette par section
 */
const SectionBlock = ({ children, tone = "neutral", className = "" }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let bgStyle;

  switch (tone) {
    case "intro":
      bgStyle = {
        background:
          "linear-gradient(to bottom,#FCFDFE 0%,#E6F1F8 38%,#C7E1F2 100%)",
      };
      break;

    case "forest-transition":
      bgStyle = {
        background:
          "linear-gradient(to bottom,#C7E1F2 0%,#D3E9E4 38%,#E2F0EA 82%,#EEF5F0 100%)",
      };
      break;

    case "forest":
      bgStyle = {
        background:
          "linear-gradient(to bottom,#EEF5F0 0%,#B8D9C3 38%,#8CB69F 100%)",
      };
      break;

    case "to-red":
      bgStyle = {
        background:
          "linear-gradient(to bottom,#8CB69F 0%,#A9C5B2 38%,#F2B7B0 100%)",
      };
      break;

    case "red":
      bgStyle = {
        background:
          "linear-gradient(to bottom,#F2B7B0 0%,#d96b6b 38%,#8b1e23 100%)",
      };
      break;

    case "neutral-soft":
      bgStyle = {
        background:
          "linear-gradient(to bottom,#8b1e23 0%,#2c2c2c 38%,#1c1c1c 100%)",
      };
      break;

    default:
      bgStyle = undefined;
  }

  return (
    <section
      ref={ref}
      style={bgStyle}
      className={`
        w-full
        flex flex-col items-center
        text-center
        px-6 md:px-10 lg:px-16
        py-16 md:py-20
        transition-all duration-[1000ms] ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        ${className}
      `}
    >
      <div className="w-full max-w-5xl mx-auto">{children}</div>
    </section>
  );
};

/**
 * Cadre thématique pour les IMAGES (gradients seulement)
 * - variant = "sky" | "forest" | "silk"
 */
const ThemedFrame = ({ variant, children, className = "" }) => {
  let outerStyle = {};
  let outerClass = "";
  const innerClass =
    "rounded-[22px] overflow-hidden relative bg-black/10 flex items-stretch justify-stretch";

  switch (variant) {
    case "sky":
      outerClass =
        "rounded-[26px] p-[2px] shadow-[0_0_35px_rgba(120,150,190,0.45)]";
      outerStyle = {
        background:
          "linear-gradient(135deg,#ffffff,#e4f0fb,#c2d9f3,#8eb4da)",
      };
      break;

    case "forest":
      outerClass =
        "rounded-[26px] p-[2px] shadow-[0_0_35px_rgba(32,64,48,0.7)]";
      outerStyle = {
        background:
          "linear-gradient(135deg,#172218,#283627,#111810,#384f3a)",
      };
      break;

    case "silk":
      outerClass =
        "rounded-[26px] p-[2px] shadow-[0_0_38px_rgba(130,20,32,0.8)]";
      outerStyle = {
        background:
          "linear-gradient(135deg,#3e0508,#8b1e23,#d86c6b,#f6c9b8)",
      };
      break;

    default:
      outerClass = "rounded-[26px] p-[2px]";
      outerStyle = {};
  }

  return (
    <div className={`${outerClass} ${className}`} style={outerStyle}>
      <div className={innerClass}>{children}</div>
    </div>
  );
};

const Compact = () => {
  const thumbs = benefits.slice(0, 6); // fallback pour Écrin de Verdure
  const [content, setContent] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "landingPage"][0]`)
      .then((data) => setContent(data))
      .catch((err) => console.error("Sanity error:", err));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-white font-serif">
      {/* Vignette globale sur les côtés */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(120% 100% at 0% 50%, rgba(0,0,0,.4), transparent 60%),
            radial-gradient(120% 100% at 100% 50%, rgba(0,0,0,.4), transparent 60%)
          `,
        }}
      />

      <main className="flex flex-col items-stretch">
        {/* 1) INTRO – PALETTE CLAIRE + CADRE CIEL */}
        <SectionBlock tone="intro">
          <h1
            className="text-[48px] lg:text-[80px] tracking-wide mb-10 mt-10 text-[#1A2A36] font-semibold"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              letterSpacing: "0.2rem",
            }}
          >
            {content?.introTitle || "Sphèora"}
          </h1>

          <p
            className="max-w-3xl mx-auto text-[#5B6E7C] text-lg mb-12 mt-4 leading-relaxed text-[15px] lg:text-[18px]"
            style={{
              fontFamily: "Montserrat Light, serif",
              letterSpacing: "0.1rem",
            }}
          >
            {content?.introText ||
              "Sphèora — Dans un ciel vaste et lumineux, des sphères flottaient doucement, portées par un souffle invisible. Elles glissaient entre les nuages, chacune avec une histoire à raconter, un monde à dévoiler. Certaines brillaient d’une lumière douce, d’autres rougissaient comme un cœur qui bat."}
          </p>

          <div className="w-full flex justify-center mt-12">
            <ThemedFrame
              variant="sky"
              className="max-w-[520px] w-full aspect-[4/3] animate-float-soft"
            >
              <img
                src={
                  content?.introImage
                    ? urlFor(content.introImage).width(900).url()
                    : water
                }
                className="w-full h-full object-cover"
                alt="Sphères dans le ciel"
              />
            </ThemedFrame>
          </div>
        </SectionBlock>

        {/* 2) TRANSITION → FORÊT */}
        <SectionBlock tone="forest-transition">
          <p
            className="max-w-3xl mx-auto text-[#7C948B] text-lg mb-12 mt-4 text-[17px]"
            style={{
              fontFamily: "Montserrat Light, serif",
              letterSpacing: "0.1rem",
            }}
          >
            {content?.transitionForestText ||
              "La première sphère s’approcha d’une forêt silencieuse. Elle descendit entre les branches et la mousse, comme attirée par un murmure ancien. Elle se posa délicatement, prête à révéler son univers."}
          </p>
        </SectionBlock>

        {/* 3) CHAPITRE 1 – Écrin de Verdure (ENCADRÉ PAR LE CADRE BOIS) */}
        <SectionBlock tone="forest">
          <div className="relative w-full">
            {/* cadre bois de section */}

            <div className="relative z-10">
              <h2
                className="text-[36px] lg:text-[60px] tracking-wide mt-10 text-[#3E5A48] font-semibold mb-[40px] animate-zoom-soft"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  letterSpacing: "0.2rem",
                }}
              >
                {content?.chapter1Title || "Chapitre 1 - Écrin de Verdure"}
              </h2>

              <p
                className="max-w-3xl mx-auto mt-[40px] text-[#4F6B57] text-lg mb-[60px] text-[15px] lg:text-[18px] animate-micro-vertical"
                style={{
                  fontFamily: "Montserrat Light, serif",
                  letterSpacing: "0.1rem",
                }}
              >
                {content?.chapter1Text ||
                  `Dès que vous posez les yeux sur cette sphère, vous sentez la forêt
s’éveiller. À travers le verre transparent, un cerf au bois majestueux se tient immobile, tel un roi silencieux veillant sur son royaume.
À ses pieds, un champignon cèpe en feutrine surgit dans un creux,
et plusieurs gouttes d’eau semblent suspendues sur de petites
pierres d’agate mousse, comme si la pluie avait été figée par magie.

L’air semble empli du parfum subtil de la mousse et du bois,
tandis que de petites fougères séchées et quelques feuilles de
chêne ajoutent des touches de vert et de brun. Une bougie en forme
de pomme de pin diffuse une lumière douce et chaleureuse. Chaque
détail a été pensé pour éveiller vos sens, comme si la nature
entière était capturée dans ce fragile écrin.`}
              </p>

              {/* Image principale encadrée gradient forêt */}
              <div className="w-full flex justify-center mt-[40px]">
                <ThemedFrame
                  variant="forest"
                  className="max-w-[520px] w-full aspect-[4/3] animate-float-soft"
                >
                  <img
                    src={
                      content?.chapter1Image
                        ? urlFor(content.chapter1Image).width(900).url()
                        : forest
                    }
                    className="w-full h-full object-cover"
                    alt="Écrin de Verdure"
                  />
                </ThemedFrame>
              </div>

              {/* Galerie visible sans scroll horizontal : grille 3x2 */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
                {(content?.chapter1Gallery?.length
                  ? content.chapter1Gallery
                  : thumbs
                ).map((item, index, arr) => {
                  const src = item.asset
                    ? urlFor(item)
                        .width(600)
                        .height(600)
                        .fit("crop")
                        .crop("center")
                        .url()
                    : item.image;

                  const total = arr.length;

                  let positionClasses = "";
                  if (total === 5) {
                    if (index === 3) positionClasses = " lg:col-start-2";
                    if (index === 4) positionClasses = " lg:col-start-4";
                  }

                  return (
                    <ThemedFrame
                      key={index}
                      variant="forest"
                      className={
                        "w-full lg:col-span-2 hover:scale-[1.02] transition-transform duration-300" +
                        positionClasses
                      }
                    >
                      <div className="relative w-full aspect-square">
                        <div className="absolute inset-0" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={src}
                            className="max-w-full max-h-full object-contain"
                            alt={`Écrin de Verdure ${index + 1}`}
                          />
                        </div>
                      </div>
                    </ThemedFrame>
                  );
                })}
              </div>

              {/* Bouton d’achat */}
              <a
                href={
                  content?.chapter1PurchaseLink ||
                  "https://ton-lien-de-paiement.com"
                }
                target="_blank"
                rel="noreferrer"
              >
                <Button className="px-10 py-3 mt-[40px] mb-[80px] rounded-full bg-[#6B8C73] text-[#FAFAFA] text-lg transition-colors hover:bg-[#4e6f58]">
                  Emporter cet article
                </Button>
              </a>
            </div>
          </div>
        </SectionBlock>

        {/* 4) TRANSITION vers le Rouge */}
        <SectionBlock tone="to-red">
          <p
            className="max-w-3xl mx-auto mt-[80px] text-lg mb-[80px] text-[15px] lg:text-[18px] animate-fade-slow
             bg-gradient-to-b from-[#4F6B57] to-[#C46B6A] bg-clip-text text-transparent"
            style={{
              fontFamily: "Montserrat Light, serif",
              letterSpacing: "0.1rem",
            }}
          >
            {content?.transitionRedText ||
              `La deuxième sphère glissa doucement
entre les arbres, portée par un souffle
léger. Les teintes profondes de la forêt se
réchauffaient peu à peu, baignées de
lueurs rouges d'un soleil couchant.
Silencieuse, elle avançait vers un monde
encore inconnu, où la chaleur et la couleur
promettaient des histoires à venir, des
murmures d'amour prêts à éclore.`}
          </p>
        </SectionBlock>

        {/* 5) CHAPITRE 2 – Rouge Éternel (ENCADRÉ PAR LE CADRE SOIE ROUGE) */}
        <SectionBlock tone="red">
          <div className="relative w-full">
            {/* cadre soie rouge de section */}

            <div className="relative z-10">
              <h2
                className="text-[36px] lg:text-[60px] tracking-wide mt-10 text-[#8B1E23] font-semibold mb-[40px] animate-zoom-soft"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  letterSpacing: "0.2rem",
                }}
              >
                {content?.chapter2Title || "Chapitre 2 - Rouge Éternel"}
              </h2>

              <p
                className="max-w-3xl mx-auto mt-[40px] text-[#F3C1BA] text-lg mb-[60px] text-[15px] lg:text-[18px] animate-micro-vertical"
                style={{
                  fontFamily: "Montserrat Light, serif",
                  letterSpacing: "0.1rem",
                }}
              >
                {content?.chapter2Text ||
                  `Rouge Éternel s'installe doucement,
témoin silencieux de la tendresse et de
l'amour qui se dévoilent. Inspirée par ces
émotions, cette sphère fragile et précieuse
invite chacun à plonger dans un monde où
la passion, la lumière et la douceur
s'entrelacent, promettant des secrets à
découvrir.`}
              </p>

              {/* Sphère Rouge encadrée gradient soie */}
              <div className="w-full flex justify-center mt-[40px]">
                <ThemedFrame
                  variant="silk"
                  className="max-w-[380px] w-full aspect-square animate-sphere-glow"
                >
                  <img
                    src={
                      content?.chapter2Image
                        ? urlFor(content.chapter2Image).width(700).url()
                        : sphere
                    }
                    className="w-full h-full object-cover"
                    alt="Rouge Éternel"
                  />
                </ThemedFrame>
              </div>

              {/* Galerie Rouge Éternel encadrée soie */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(content?.chapter2Gallery && content.chapter2Gallery.length > 0
                  ? content.chapter2Gallery
                  : [question, question, question]
                ).map((item, index) => {
                  const src =
                    item && item.asset
                      ? urlFor(item).width(600).url()
                      : item;

                  return (
                    <ThemedFrame
                      key={index}
                      variant="silk"
                      className="w-full aspect-[4/3] hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center"
                    >
                      <img
                        src={src}
                        className="max-h-full max-w-full object-contain"
                        alt={`Rouge Éternel ${index + 1}`}
                      />
                    </ThemedFrame>
                  );
                })}
              </div>

              {/* Newsletter Rouge Éternel */}
              <div className="mt-[80px] mb-[80px] w-full flex justify-center">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.6)] border border-white/15">
                  <p className="text-[#FCD6CC] mb-3 font-semibold">
                    Recevoir l’annonce de Rouge Éternel
                  </p>
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#f07b63]"
                  />
                  <Button className="w-full px-6 py-2 rounded-full bg-[#8b1e23] text-[#fafafa] hover:bg-[#c33132] transition-colors animate-fade-up-soft">
                    S&apos;inscrire à la Newsletter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* 6) Invitation + Contact */}
        <SectionBlock tone="neutral-soft">
          <p
            className="max-w-3xl mx-auto mt-[40px] text-[#fafafa] text-lg mb-[60px] text-[15px] lg:text-[18px] animate-fade-slow"
            style={{
              fontFamily: "Montserrat Light, serif",
              letterSpacing: "0.1rem",
            }}
          >
            Leurs mondes sommeillent et attendent… mais pour ceux qui savent
            regarder, pour ceux qui prennent le temps d’écouter et de rêver,
            ils s’ouvriront. Chaque sphère est un souffle de poésie suspendu
            dans le temps.
          </p>

          <div className="flex flex-col items-center gap-8 w-full">
            {/* WhatsApp */}
            <a
              href={
                content?.whatsapp ||
                "https://wa.me/33600000000"
              }
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] text-black text-lg font-semibold shadow-[0_0_18px_rgba(37,211,102,0.5)] hover:bg-[#32e375] transition-colors"
            >
              Écrire sur WhatsApp
            </a>

            {/* Formulaire mail */}
            <form className="w-full max-w-xl text-left flex flex-col gap-4">
              <input
                placeholder="Nom"
                className="w-full bg-[#3c3c3c]/80 border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fafafa]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#3c3c3c]/80 border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fafafa]"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-[#3c3c3c]/80 border px-4 py-3 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#fafafa]"
              />

              <button
                type="submit"
                className="mt-2 px-8 py-3 rounded-full bg-[#9e0e17] text-[#fafafa] font-semibold hover:bg-[#c21f2a] transition-colors"
              >
                Envoyer un message
              </button>
            </form>

            <p className="text-xs text-white/45 mt-4">
              © {new Date().getFullYear()} — Sphèora. Chaque sphère est un monde en suspens.
            </p>
          </div>
        </SectionBlock>
      </main>
    </div>
  );
};

export default Compact;
