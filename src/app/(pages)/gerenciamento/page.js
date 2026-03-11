"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, logout } from "../../../utils/auth";
import styles from "./page.module.css";

const STORAGE_PRODUCTS = "gellato:products";

function loadInitialProducts() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_PRODUCTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((p) => ({
      ...p,
      price:
        typeof p.price === "number"
          ? p.price
          : Number(String(p.price || "0").replace(",", ".")),
      stock: typeof p.stock === "number" ? p.stock : Number(p.stock || 0),
    }));
  } catch {
    return [];
  }
}

export default function Gerenciamento() {
  const [user, setUser] = useState(null);

  // carrega direto do localStorage ao criar o estado
  const [products, setProducts] = useState(() => loadInitialProducts());
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  // protege rota (apenas admin)
  useEffect(() => {
    const u = getSession();
    if (!u || u.role !== "admin") {
      window.location.href = "/";
      return;
    }
    setUser(u);
  }, []);

  // salva produtos sempre que o array mudar
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
  }, [products]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const openNewProduct = () => {
    setEditingProduct(null);
    setForm({
      id: null,
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
      description: product.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price) return;

    const priceNumber = Number(
      String(form.price).replace(".", "").replace(",", ".")
    );
    const stockNumber = Number(form.stock || 0);
    if (Number.isNaN(priceNumber)) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                category: form.category,
                price: priceNumber,
                stock: stockNumber,
                description: form.description,
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name,
        category: form.category,
        price: priceNumber,
        stock: stockNumber,
        description: form.description,
        image: "/img/cards/sorvetes-card.jpg",
      };
      setProducts((prev) => [newProduct, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm("Deseja realmente remover este produto?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((product) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      String(product.id).includes(term)
    );
  });

  const formatPrice = (value) => {
    if (typeof value !== "number" || Number.isNaN(value)) return "—";
    return value.toFixed(2).replace(".", ",");
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Painel de Administração</h1>
          <p className={styles.leadText}>
            Olá, {user?.name || "Admin"} – gerencie produtos, pedidos e o
            catálogo da GellatoItali.
          </p>
        </div>
        <button className={styles.btnLogout} onClick={handleLogout}>
          Sair
        </button>
      </header>

      {/* Atalhos principais */}
      <section className={styles.shortcutsGrid}>
        <article className={styles.shortcutCard}>
          <h2>Gestão de produtos</h2>
          <p>Adicione, edite ou remova sabores de sorvetes, picolés e açaís.</p>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              const el = document.getElementById("produtos-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Abrir gestão de produtos
          </button>
        </article>

        <article className={styles.shortcutCardMuted}>
          <h2>Pedidos</h2>
          <p>Integração futura para acompanhar pedidos e status detalhado.</p>
        </article>

        <a href="/usuarios" className={styles.shortcutCard}>
          <h2>Usuários</h2>
          <p>Integração futura para gerenciar contas de clientes e equipe.</p>
        </a>
      </section>

      {/* Área de CRUD de produtos */}
      <section id="produtos-section" className={styles.sectionProdutos}>
        <header className={styles.sectionHeader}>
          <div>
            <h2>Produtos cadastrados</h2>
            <p>
              Visualize e mantenha o catálogo da GellatoItali sempre atualizado.
            </p>
          </div>
          <button
            type="button"
            className={styles.btnAdd}
            onClick={openNewProduct}
          >
            + Novo produto
          </button>
        </header>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Buscar produto por nome, categoria ou código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.grid}>
          {filteredProducts.length === 0 && (
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              Nenhum produto encontrado
              {search ? ` para "${search}"` : ""}. Clique em &quot;Novo
              produto&quot; para começar.
            </p>
          )}

          {filteredProducts.map((product) => (
            <article key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.cardImg}
              />
              <h2>{product.name}</h2>
              <p className={styles.price}>R$ {formatPrice(product.price)}</p>
              <div className={styles.infoBox}>
                <span>Categoria: {product.category}</span>
                <span>Estoque: {product.stock} unidades</span>
              </div>
              <p className={styles.desc}>{product.description}</p>
              <div className={styles.cardActions}>
                <button
                  className={styles.btnEdit}
                  onClick={() => openEditProduct(product)}
                >
                  Editar
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Remover
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal de criação/edição */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeBtn}
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h2>{editingProduct ? "Editar produto" : "Novo produto"}</h2>

            <form className={styles.modalForm} onSubmit={handleSaveProduct}>
              <input
                type="text"
                placeholder="Nome do produto"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Categoria (ex: Sorvetes, Picolés, Açaís)"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Preço (ex: 24,90)"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
              />
              <input
                type="number"
                placeholder="Estoque (opcional)"
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
              />
              <textarea
                placeholder="Descrição (opcional)"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />

              <button type="submit" className={styles.btnSave}>
                {editingProduct ? "Salvar alterações" : "Cadastrar produto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
