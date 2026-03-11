"use client";

import { useEffect, useState } from "react";
import { getSession, logout } from "../../../utils/auth";
import styles from "./page.module.css";

export default function DashboardGestor() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const u = getSession();
        if (!u || (u.role !== "gestor" && u.role !== "admin")) {
            window.location.href = "/login";
            return;
        }
        setUser(u);
    }, []);

    const sair = () => {
        logout();
        window.location.href = "/login";
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Dashboard de Monitoramento</h1>
                    <p className={styles.subtitle}>
                        Olá, {user?.name || "Gestor"} – visão geral da operação GellatoItali.
                    </p>
                </div>
                <button onClick={sair} className={styles.btnLogout}>
                    Sair
                </button>
            </header>

            <section className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Pedidos hoje</span>
                    <strong className={styles.metricValue}>128</strong>
                    <span className={styles.metricTag}>+12% vs. ontem</span>
                </div>
                <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Ticket médio</span>
                    <strong className={styles.metricValue}>R$ 32,40</strong>
                    <span className={styles.metricTag}>Últimas 24h</span>
                </div>
                <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Produtos em baixa</span>
                    <strong className={styles.metricValue}>5</strong>
                    <span className={styles.metricTag}>Ver estoque</span>
                </div>
            </section>

            <section className={styles.panelsGrid}>
                <article className={styles.panel}>
                    <h2>Pedidos em andamento</h2>
                    <p>
                        Acompanhe os pedidos que ainda estão em produção, entrega ou aguardando pagamento.
                    </p>
                </article>

                <article className={styles.panel}>
                    <h2>Alertas de estoque</h2>
                    <p>
                        Monitore sabores com estoque crítico para evitar falta de produtos no pico.
                    </p>
                </article>

                <article className={styles.panel}>
                    <h2>Desempenho por categoria</h2>
                    <p>
                        Veja quais linhas (sorvetes, picolés, açaís) estão performando melhor nas vendas.
                    </p>
                </article>
            </section>
        </main>
    );
}
