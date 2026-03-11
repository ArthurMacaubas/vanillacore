"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const STORAGE_CART = "gellato:cart";

const categorias = [
  {
    id: "picole-chocolate",
    nome: "Picolés de Chocolate",
    imagem: "/picole/picoles_chocolate.png",
    descricao: "Clássicos de chocolate com recheios e coberturas especiais.",
    itens: [
      {
        id: "pic-oreo",
        imagem: "/picole/oreo.png",
        nome: "Picolé de Oreo",
        preco: 8.9,
        descricao: ["Com sabor de Oreo", "Com recheio de Oreo", "Coberto com bolacha"],
      },
      {
        id: "pic-kitkat",
        imagem: "/picole/kitkat.png",
        nome: "Picolé Kit Kat",
        preco: 9.5,
        descricao: ["Sabor Kit Kat", "Com cobertura branca"],
      },
      {
        id: "pic-sonho-valsa",
        imagem: "/picole/sonhoValsa.png",
        nome: "Picolé Sonho de Valsa",
        preco: 9.9,
        descricao: ["Sabor Sonho de Valsa", "Com recheio cremoso"],
      },
    ],
  },
  {
    id: "picole-fruta",
    nome: "Picolés de Fruta",
    imagem: "/picole/picoles_frutas.png",
    descricao: "Sabores refrescantes feitos com frutas selecionadas.",
    itens: [
      {
        id: "pic-laranja",
        imagem: "/picole/picoleLaranja.png",
        nome: "Picolé de Laranja",
        preco: 6.9,
        descricao: ["Sabor laranja", "Com detalhes simples"],
      },
      {
        id: "pic-limao",
        imagem: "/picole/picoleLimao.png",
        nome: "Picolé de Limão",
        preco: 7.5,
        descricao: ["Sabor limão", "Refrescante para dias quentes"],
      },
    ],
  },
  {
    id: "picole-diversos",
    nome: "Picolés Diversos",
    imagem: "/picole/picoles_Diversos.png",
    descricao: "Sabores divertidos e diferentes para todos os gostos.",
    itens: [
      {
        id: "pic-fini",
        imagem: "/picole/chubinho.png",
        nome: "Picolé Fini",
        preco: 7.5,
        descricao: ["Com sabor de Fini", "Com formato de dentadura"],
      },
      {
        id: "pic-fini-beijo",
        imagem: "/picole/finebeijo.png",
        nome: "Picolé Fini Beijo",
        preco: 7.9,
        descricao: ["Sabor bala Fini Beijo", "Colorido e divertido"],
      },
      {
        id: "pic-ituzinho",
        imagem: "/picole/ituzinho.png",
        nome: "Picolé de Ituzinho",
        preco: 6.9,
        descricao: ["Sabor morango e laranja", "Com detalhes simples"],
      },
    ],
  },
];

function formatPrice(value) {
  return `R$ ${Number(value || 0).toFixed(2).replace(".", ",")}`;
}

export default function PicolesPage() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_CART));
      if (Array.isArray(parsed)) setCart(parsed);
    } catch { }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  }, [cart]);

  const isInCart = (id) => cart.some((item) => item.id === id);

  function toggleCart(item) {
    setCart((prev) =>
      prev.find((x) => x.id === item.id)
        ? prev.filter((x) => x.id !== item.id)
        : [...prev, { id: item.id, quantity: 1 }]
    );
  }

  return (
    <main className={styles.content}>
      {/* ── PAGE HEADER ── */}
      <div className={styles.pageHeader}>
        <span className={styles.pageEyebrow}>Cardápio</span>
        <h1 className={styles.sectionTitle}>
          Nossos <em>Picolés</em>
        </h1>
      </div>

      {/* ── CATEGORY GRID ── */}
      <div className={styles.productsGrid}>
        {categorias.map((categoria, index) => (
          <button
            key={categoria.id}
            className={styles.cardButton}
            onClick={() => setCategoriaSelecionada(categoria)}
            aria-label={`Ver ${categoria.nome}`}
          >
            <div className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={categoria.imagem}
                  alt={categoria.nome}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.productImage}
                  onError={() => { }}
                />
              </div>

              <div className={styles.productTextCard}>
                <span className={styles.cardIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{categoria.nome}</h3>
                {categoria.descricao && (
                  <p className={styles.cardCategoryDescription}>
                    {categoria.descricao}
                  </p>
                )}
                <span className={styles.cardArrow}>↗</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── MODAL ── */}
      {categoriaSelecionada && (
        <div
          className={styles.modalOverlay}
          onClick={() => setCategoriaSelecionada(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setCategoriaSelecionada(null)}
              aria-label="Fechar"
            >
              ×
            </button>

            {/* modal header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalImageWrapper}>
                <Image
                  src={categoriaSelecionada.imagem}
                  alt={categoriaSelecionada.nome}
                  width={160}
                  height={160}
                  className={styles.modalImage}
                />
              </div>
              <div className={styles.modalHeaderText}>
                <span className={styles.modalEyebrow}>Categoria</span>
                <h3>{categoriaSelecionada.nome}</h3>
                {categoriaSelecionada.descricao && (
                  <p className={styles.modalCategoryDescription}>
                    {categoriaSelecionada.descricao}
                  </p>
                )}
              </div>
            </div>

            {/* products grid */}
            <div className={styles.modalProductsGrid}>
              {categoriaSelecionada.itens.map((item) => {
                const inCart = isInCart(item.id);
                return (
                  <div key={item.id} className={styles.modalProductCard}>
                    <div className={styles.modalProductImageWrapper}>
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        width={130}
                        height={130}
                        className={styles.modalProductImage}
                      />
                    </div>

                    <div className={styles.modalProductInfo}>
                      <h4>{item.nome}</h4>
                      {item.preco != null && (
                        <span className={styles.modalProductPrice}>
                          {formatPrice(item.preco)}
                        </span>
                      )}
                      <ul className={styles.modalDescriptionList}>
                        {item.descricao.map((texto, i) => (
                          <li key={i}>{texto}</li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        className={
                          inCart
                            ? styles.removeFromCartButton
                            : styles.addToCartButton
                        }
                        onClick={() => toggleCart(item)}
                      >
                        {inCart ? "✓ Remover" : "+ Carrinho"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}