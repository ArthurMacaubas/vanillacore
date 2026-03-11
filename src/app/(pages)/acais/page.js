"use client";

import { useEffect, useState } from "react";
import styles from "./acai.module.css";

const STORAGE_CART = "gellato:cart";

export default function AcaiPage() {
  const produtos = [
    {
      id: 1,
      nome: "Açaí no Copo",
      imagem: "/img/acai/acainocopo3novo.jpg",
      descricao: "Açaí cremoso servido em copos generosos.",
      itens: [
        {
          id: "acai-copo-simples",
          nome: "Açaí no Copo Simples",
          imagem: "/img/acai/acainocopo3novo.jpg",
          preco: 12.9,
        },
        {
          id: "acai-copo-ninho",
          nome: "Açaí com Leite Ninho",
          imagem: "/img/acai/acainocopo3novo.jpg",
          preco: 14.9,
        },
        {
          id: "acai-copo-nutella",
          nome: "Açaí com Nutella",
          imagem: "/img/acai/acainocopo3novo.jpg",
          preco: 15.9,
        },
      ],
    },
    {
      id: 2,
      nome: "Açaí na Tigela",
      imagem: "/img/acai/acainatigela.png",
      descricao: "Açaí na tigela com frutas e coberturas.",
      itens: [
        {
          id: "acai-tigela-frutas",
          nome: "Açaí com Frutas",
          imagem: "/img/acai/acaicomfrutas.png",
          preco: 16.9,
        },
        {
          id: "acai-tigela-banana",
          nome: "Açaí com Banana",
          imagem: "/img/acai/açai com banana.jpg",
          preco: 15.9,
        },
      ],
    },
    {
      id: 3,
      nome: "Açaí Puro",
      imagem: "/img/acai/açaipuronovo.jpg",
      descricao: "",
      itens: [
        {
          id: "acai-puro-tigela",
          nome: "Açaí na tigela",
          imagem: "/img/acai/açaipuronovo.jpg",
          preco: 15.5,
        },
        {
          id: "acai-puro-copo",
          nome: "Açaí no copo",
          imagem: "/img/acai/acaicopo.png",
          preco: 11.9,
        },
      ],
    },
  ];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_CART);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCart(parsed);
    } catch { }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  }, [cart]);

  const isInCart = (id) => cart.some((item) => item.id === id);

  function toggleCart(item) {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) {
        return prev.filter((x) => x.id !== item.id);
      }
      return [...prev, { id: item.id, quantity: 1 }];
    });
  }

  function fecharModal() {
    setCategoriaSelecionada(null);
  }

  const formatPrice = (value) =>
    `R$ ${Number(value || 0).toFixed(2).replace(".", ",")}`;

  return (
    <main id="produtos-section" className={styles.content}>
      <h2 className={styles.sectionTitle}>Nossos Açaís</h2>

      <div className={styles.productsGrid}>
        {produtos.map((produto) => (
          <button
            key={produto.id}
            className={styles.cardButton}
            onClick={() => setCategoriaSelecionada(produto)}
          >
            <div className={styles.card}>
              <img
                src={produto.imagem}
                alt={produto.nome}
                className={styles.productImage}
              />
              <div className={styles.productTextCard}>
                <h3>{produto.nome}</h3>
                {produto.descricao && (
                  <p className={styles.cardCategoryDescription}>
                    {produto.descricao}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {categoriaSelecionada && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={fecharModal}>
              ×
            </button>

            <h3>{categoriaSelecionada.nome}</h3>
            {categoriaSelecionada.descricao && (
              <p className={styles.modalDescription}>
                {categoriaSelecionada.descricao}
              </p>
            )}

            <div className={styles.modalProductsGrid}>
              {categoriaSelecionada.itens.map((item) => {
                const inCart = isInCart(item.id);
                return (
                  <div key={item.id} className={styles.modalProductCard}>
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className={styles.modalProductImage}
                    />
                    <div className={styles.modalProductInfo}>
                      <h4>{item.nome}</h4>
                      {item.preco != null && (
                        <span className={styles.modalProductPrice}>
                          {formatPrice(item.preco)}
                        </span>
                      )}
                      <button
                        type="button"
                        className={
                          inCart
                            ? styles.removeFromCartButton
                            : styles.addToCartButton
                        }
                        onClick={() => toggleCart(item)}
                      >
                        {inCart
                          ? "Remover do carrinho"
                          : "Adicionar ao carrinho"}
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
