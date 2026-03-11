"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { login } from "../../../utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Digite um email válido.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = login(email.trim(), password);

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      if (res.user.role === "admin") {
        router.push("/gerenciamento");
      } else if (res.user.role === "gestor") {
        router.push("/dashboard");
      } else {
        router.push("/cliente");
      }

      setLoading(false);
    }, 500);
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <Link
          href="/"
          className={styles.backArrow}
          aria-label="Voltar para a Home"
        >
          ←
        </Link>

        <h1 className={styles.title}>GellatoItali</h1>
        <p className={styles.subtitle}>
          Acesse sua conta para gerenciar pedidos e sabores.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              type="email"
              placeholder="Digite seu email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          <label className={styles.label}>
            Senha
            <input
              type="password"
              placeholder="Digite sua senha"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.linksRow}>
            <Link href="/cadastro" className={styles.registerLink}>
              Criar conta
            </Link>
            <Link href="/recuperar" className={styles.forgotLink}>
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Validando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
