// /recuperar/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./recuperar.module.css";
import { requestPasswordReset } from "../../../utils/auth";

export default function Recuperar() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();
        setMsg(null);
        if (!email) return setMsg({ error: "Informe seu e-mail." });
        setLoading(true);

        setTimeout(() => {
            const res = requestPasswordReset(email.trim());
            if (res.error) {
                setMsg({ error: res.error });
            } else {
                // Em app real seria enviado por e-mail. Aqui retornamos token e instruções.
                setMsg({
                    success: true,
                    text: "Token gerado (simulado). Use o link mostrado abaixo para redefinir a senha.",
                    token: res.token,
                });
            }
            setLoading(false);
        }, 700);
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.h2}>Recuperar senha</h2>
                <p>Digite o e-mail da sua conta e geraremos um link de recuperação (fake).</p>

                <form onSubmit={handleSend} className={styles.form}>
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.input}
                    />
                    <button className={styles.btn} type="submit" disabled={loading}>
                        {loading ? "Gerando..." : "Gerar link"}
                    </button>
                </form>

                {msg?.error && <div className={styles.error}>{msg.error}</div>}

                {msg?.success && (
                    <div className={styles.successBox}>
                        <p className={`${styles.p}`}>{msg.text}</p>
                        <div className={styles.fakeLinkBox}>
                            <code>{`${window.location.origin}/confirmacao?reset=${msg.token}`}</code>
                        </div>
                        <p className={`${styles.small} ${styles.p}`}>Clique no link acima para abrir a tela de redefinição.</p>
                    </div>
                )}

                <Link href="/login" className={styles.back}>Voltar ao login</Link>
            </div>
        </main>
    );
}
