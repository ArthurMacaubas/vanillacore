"use client";

import { useEffect, useState } from "react";
import { getSession } from "../../../utils/auth";
import styles from "./page.module.css";

const STORAGE_PRODUCTS = "gellato:products";
const STORAGE_CART = "gellato:cart";
const STORAGE_ORDERS = "gellato:orders"; // simulando pedidos salvos localmente

export default function ClienteHome() {
    const [user, setUser] = useState(null);
    const [catalogCount, setCatalogCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);

    useEffect(() => {
        const u = getSession();
        if (!u) {
            window.location.href = "/login";
            return;
        }
        setUser(u);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // produtos do catálogo
        const rawProd = localStorage.getItem(STORAGE_PRODUCTS);
        if (rawProd) {
            try {
                const parsed = JSON.parse(rawProd);
                if (Array.isArray(parsed)) {
                    setCatalogCount(parsed.length);
                }
            } catch { }
        }

        // itens no carrinho
        const rawCart = localStorage.getItem(STORAGE_CART);
        if (rawCart) {
            try {
                const parsedCart = JSON.parse(rawCart);
                if (Array.isArray(parsedCart)) {
                    const total = parsedCart.reduce(
                        (sum, item) => sum + (item.quantity || 0),
                        0
                    );
                    setCartCount(total);
                }
            } catch { }
        }

        // número de pedidos (simulado em localStorage)
        const rawOrders = localStorage.getItem(STORAGE_ORDERS);
        if (rawOrders) {
            try {
                const parsedOrders = JSON.parse(rawOrders);
                if (Array.isArray(parsedOrders)) {
                    setOrdersCount(parsedOrders.length);
                }
            } catch { }
        }
    }, []);

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Minha conta</h1>
                    <p className={styles.subtitle}>
                        {user?.name
                            ? `Olá, ${user.name}. Acompanhe seus pedidos e continue comprando.`
                            : "Acompanhe seus pedidos e continue comprando."}
                    </p>
                </div>
            </header>

            {/* Indicadores principais */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Visão geral</h2>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>Pedidos realizados</span>
                        <strong className={styles.summaryValue}>{ordersCount}</strong>
                    </div>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>Itens no carrinho</span>
                        <strong className={styles.summaryValue}>{cartCount}</strong>
                    </div>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>Produtos disponíveis</span>
                        <strong className={styles.summaryValue}>{catalogCount}</strong>
                    </div>
                </div>
            </section>

            {/* Ações rápidas */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Ações rápidas</h2>
                <div className={styles.shortcutsGrid}>
                    <a href="/carrinho" className={styles.shortcutCard}>
                        <h3>Ir para o carrinho</h3>
                        <p>Revise os itens adicionados e finalize seu próximo pedido.</p>
                    </a>
                    <a href="/produtos" className={styles.shortcutCard}>
                        <h3>Explorar catálogo</h3>
                        <p>Veja todos os sabores de sorvetes, picolés e açaís.</p>
                    </a>
                </div>
            </section>
        </main>
    );
}
