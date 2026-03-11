"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Video from "./assets/video";
import styles from "./page.module.css";
import RotatingText from "../../utils/Rotating_Text/RotatingText";

const produtos = [
  {
    id: 1,
    nome: "Sorvetes",
    slug: "sorvetes",
    imagem: "/img/cards/sorvetes-card.jpg",
    itens: ["Frutas frescas", "Cremosos", "Napolitanos"],
  },
  {
    id: 2,
    nome: "Picolés",
    slug: "picoles",
    imagem: "/img/cards/picoles-card.jpg",
    itens: ["Sabores populares", "Trufados", "Frutas diversas"],
  },
  {
    id: 3,
    nome: "Açaís",
    slug: "acais",
    imagem: "/img/cards/acais-card.jpg",
    itens: ["Originais", "Sabores únicos", "Cremoso"],
  },
];

export default function Home() {
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!cardsRef.current?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.cardVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.container}>
      {/* ── HERO ── */}
      <section className={styles.heroSection} aria-labelledby="hero-title">
        <Video />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>GellatoItali · Desde 1998</span>

          <h1 id="hero-title">
            O sabor que<br />
            te faz <em>feliz</em>
          </h1>

          <p>Experimente nossas novidades e clássicos.</p>

          <div className={styles.heroActions}>
            <Link href="/produtos" className={styles.ctaButton}>
              Ver produtos
            </Link>
            <Link href="/login" className={styles.botaoLogin}>
              Entrar
            </Link>
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          scroll
        </div>
      </section>

      {/* ── PRODUTOS ── */}
      <section className={styles.content} aria-labelledby="produtos-title">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>Cardápio</span>
          <h2 id="produtos-title" className={styles.sectionTitle}>
            Nossos{" "}
            <RotatingText
              texts={["Sorvetes", "Picolés", "Açaís"]}
              mainClassName={styles.rotatingChip}
              splitLevelClassName={styles.rotatingWord}
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.03}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              rotationInterval={2200}
            />
          </h2>
        </div>

        <div className={styles.productsGrid}>
          {produtos.map((produto, index) => (
            <Link
              key={produto.id}
              href={`/${produto.slug}`}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`${styles.card} ${styles.cardHidden}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className={styles.imgWrapper}>
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  width={600}
                  height={400}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.productTextCard}>
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{produto.nome}</h3>
                <ul className={styles.featuresList}>
                  {produto.itens.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={styles.cardFooterRow}>
                  <span className={styles.cardCta}>
                    Ver {produto.nome.toLowerCase()}
                  </span>
                  <span className={styles.cardArrow}>↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}