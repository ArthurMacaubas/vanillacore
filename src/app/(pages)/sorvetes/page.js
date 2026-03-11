"use client";

import { useEffect, useState } from "react";
import styles from "./sorvete.module.css";

const STORAGE_CART = "gellato:cart";

export default function SorvetesPage() {
  const produtos = [
    {
      id: 1,
      nome: "Sorvetes Tradicionais",
      imagem: "/img/sorvetes_tradicional.png",
      descricao: "Clássicos que todo mundo ama.",
      itens: [
        {
          id: "sorv-trad-flocos",
          nome: "Sorvete de Flocos",
          imagem: "/img/Flocos.png",
          preco: 12.9,
        },
        {
          id: "sorv-trad-chocBranco",
          nome: "Chocolate Branco",
          imagem: "/img/ChocolateBranco.png",
          preco: 13.9,
        },
        {
          id: "sorv-trad-napo",
          nome: "Napolitano",
          imagem: "/img/napolitano.png",
          preco: 11.9,
        },
      ],
    },
    {
      id: 2,
      nome: "Taças Especiais",
      imagem: "/img/potes.png",
      descricao: "Taças recheadas com muito sabor.",
      itens: [
        {
          id: "sorv-taca-coberturas",
          nome: "Taça Cobertura de Morango",
          imagem: "/img/tacaMorango.png",
          preco: 18.9,
        },
        {
          id: "sorv-taca-frutas",
          nome: "Taça Frutas Frescas",
          imagem: "/img/tacafrutas.png",
          preco: 19.9,
        },
      ],
    },
    {
      id: 3,
      nome: "Gelatos Artesanais",
      imagem: "/img/Casquinhas.png",
      descricao: "Receitas artesanais com textura cremosa.",
      itens: [
        {
          id: "sorv-gelato-pistache",
          nome: "Gelato de Pistache",
          imagem: "/img/gelatoPistache.png",
          preco: 15.9,
        },
        {
          id: "sorv-gelato-avelas",
          nome: "Gelato de Avelãs",
          imagem: "/img/gelatoAvela.png",
          preco: 16.9,
        },
      ],
    },
  ];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [cart, setCart] = useState([]);

  // carregar carrinho
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(STORAGE_CART);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCart(parsed);
    } catch {}
  }, []);

  // salvar carrinho
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
      <h2 className={styles.sectionTitle}>Nossos Sorvetes</h2>

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
                        {inCart ? "Remover do carrinho" : "Adicionar ao carrinho"}
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
