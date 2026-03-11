"use client";

import { useEffect, useState, useMemo } from "react";
import styles from "./page.module.css";

const STORAGE_PRODUCTS = "gellato:products";
const STORAGE_CART = "gellato:cart";
const STORAGE_FAVS = "gellato:favs";

const SEED_PRODUCTS = [
  {
    id: 101,
    name: "Sorvete Napolitano",
    category: "Sorvetes",
    price: 24.9,
    stock: 32,
    description: "Clássico chocolate, morango e creme em um só pote.",
    image: "/img/cards/sorvetes-card.jpg",
  },
  {
    id: 102,
    name: "Picolé de Morango",
    category: "Picolés",
    price: 6.5,
    stock: 80,
    description: "Picolé cremoso de morango com pedaços de fruta.",
    image: "/img/cards/picoles-card.jpg",
  },
  {
    id: 103,
    name: "Açaí Tradicional 500ml",
    category: "Açaís",
    price: 19.9,
    stock: 45,
    description: "Açaí cremoso com guaraná, pronto para montar sua tigela.",
    image: "/img/cards/acais-card.jpg",
  },
];

function loadJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export default function ProdutosPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [justAdded, setJustAdded] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  /* ── hydration ─────────────────────────────────── */
  useEffect(() => {
    let loadedProducts = loadJSON(STORAGE_PRODUCTS, []);
    if (!Array.isArray(loadedProducts) || loadedProducts.length === 0) {
      loadedProducts = SEED_PRODUCTS;
      localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(SEED_PRODUCTS));
    }
    setProducts(loadedProducts);
    setCart(loadJSON(STORAGE_CART, []));
    setFavs(loadJSON(STORAGE_FAVS, []));
    setHydrated(true);
  }, []);

  /* ── persist cart ───────────────────────────────── */
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  }, [cart, hydrated]);

  /* ── persist favs ───────────────────────────────── */
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_FAVS, JSON.stringify(favs));
  }, [favs, hydrated]);

  /* ── categories ─────────────────────────────────── */
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["Todos", ...cats];
  }, [products]);

  /* ── filtered list ──────────────────────────────── */
  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim();
    return products.filter((p) => {
      const matchSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);
      const matchCat =
        activeCategory === "Todos" || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [products, search, activeCategory]);

  /* ── cart helpers ───────────────────────────────── */
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists)
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      return [...prev, { id: product.id, quantity: 1 }];
    });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* ── fav helpers ────────────────────────────────── */
  const toggleFav = (id) => {
    setFavs((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  /* ── price formatter ────────────────────────────── */
  const formatPrice = (value) =>
    `R$ ${Number(value || 0)
      .toFixed(2)
      .replace(".", ",")}`;

  /* ── loading ────────────────────────────────────── */
  if (!hydrated)
    return <div className={styles.loading}>Carregando sabores…</div>;

  return (
    <main className={styles.container}>
      {/* ── HEADER ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>
            Catálogo de <em>produtos</em>
          </h1>
          <p className={styles.subtitle}>
            Explore os sabores disponíveis na GellatoItali.
          </p>
        </div>

        <div className={styles.cartSummary}>
          <span className={styles.cartIcon}>🛒</span>
          <span>Carrinho</span>
          <span className={styles.cartCount}>{cartCount}</span>
        </div>
      </header>

      {/* ── SEARCH ── */}
      <section className={styles.controls}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Buscar por nome ou categoria…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""
              }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── RESULTS META ── */}
      <p className={styles.resultsMeta}>
        {filteredProducts.length} produto
        {filteredProducts.length !== 1 ? "s" : ""} encontrado
        {filteredProducts.length !== 1 ? "s" : ""}
        {activeCategory !== "Todos" ? ` em ${activeCategory}` : ""}
      </p>

      {/* ── PRODUCT GRID ── */}
      <section className={styles.grid}>
        {filteredProducts.length === 0 ? (
          <p className={styles.emptyText}>
            Nenhum produto encontrado para &quot;{search}&quot;.
          </p>
        ) : (
          filteredProducts.map((product, index) => {
            const isAdded = justAdded === product.id;
            const isFav = favs.includes(product.id);
            const isLowStock = product.stock <= 10;

            return (
              <article
                key={product.id}
                className={styles.card}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* image */}
                <div className={styles.imgWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.cardImg}
                  />
                  <span className={styles.categoryBadge}>
                    {product.category}
                  </span>
                  <button
                    type="button"
                    className={`${styles.favButton} ${isFav ? styles.favActive : ""
                      }`}
                    onClick={() => toggleFav(product.id)}
                    aria-label={
                      isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"
                    }
                  >
                    {isFav ? "♥" : "♡"}
                  </button>
                </div>

                {/* body */}
                <div className={styles.cardBody}>
                  <h2>{product.name}</h2>
                  <p className={styles.cardDesc}>{product.description}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.cardPriceBlock}>
                      <span className={styles.cardPrice}>
                        {formatPrice(product.price)}
                      </span>
                      <span
                        className={`${styles.cardStock} ${isLowStock ? styles.cardStockLow : ""
                          }`}
                      >
                        {isLowStock
                          ? `⚠ Apenas ${product.stock} restantes`
                          : `✓ ${product.stock} em estoque`}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`${styles.btnAddCart} ${isAdded ? styles.btnAdded : ""
                        }`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {isAdded ? "✓ Adicionado" : "+ Carrinho"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}