"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser, emailExists } from "../../../utils/auth.js";
import styles from "./cadastro.module.css";

export default function Cadastro() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [role] = useState("cliente");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function validate() {
        const newErrors = {};

        if (!nome.trim()) newErrors.nome = "Informe seu nome completo.";
        if (!email.trim()) {
            newErrors.email = "Informe seu e-mail.";
        } else if (!email.includes("@") || !email.includes(".")) {
            newErrors.email = "Digite um e-mail válido.";
        }
        if (!senha.trim()) {
            newErrors.senha = "Informe uma senha.";
        } else if (senha.length < 6) {
            newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
        }

        return newErrors;
    }

    function cadastrar(e) {
        e.preventDefault();
        setErrors({});
        setSuccess(false);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (emailExists(email.trim())) {
            setErrors({ email: "Este e-mail já está cadastrado." });
            return;
        }

        setLoading(true);

        try {
            createUser({ nome: nome.trim(), email: email.trim(), password: senha, role });
            setSuccess(true);

            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (err) {
            setErrors({ geral: "Ocorreu um erro ao criar sua conta. Tente novamente." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className={styles.loginContainer}>
            {success && (
                <div className={styles.successPopup} role="status" aria-live="polite">
                    <div className={styles.successAnimation}></div>
                    <p className={styles.successText}>Cadastro realizado com sucesso!</p>
                </div>
            )}

            <div className={styles.loginBox}>
                <Link
                    href="/login"
                    className={styles.backArrow}
                    aria-label="Voltar para o login"
                >
                    ←
                </Link>

                <h1 className={styles.title}>GellatoItali</h1>
                <p className={styles.subtitle}>
                    Crie sua conta para começar a gerenciar pedidos e sabores.
                </p>

                <form onSubmit={cadastrar} className={styles.form} noValidate>
                    {errors.geral && (
                        <p className={styles.errorMessage}>{errors.geral}</p>
                    )}

                    <label className={styles.label}>
                        Nome completo
                        <input
                            className={styles.input}
                            placeholder="Seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            autoComplete="name"
                        />
                        {errors.nome && (
                            <span className={styles.fieldError}>{errors.nome}</span>
                        )}
                    </label>

                    <label className={styles.label}>
                        E-mail
                        <input
                            className={styles.input}
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            autoComplete="email"
                        />
                        {errors.email && (
                            <span className={styles.fieldError}>{errors.email}</span>
                        )}
                    </label>

                    <label className={styles.label}>
                        Senha
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="new-password"
                        />
                        {errors.senha && (
                            <span className={styles.fieldError}>{errors.senha}</span>
                        )}
                    </label>
                    <label className={styles.label}>
                        Confirmar Senha
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="new-password"
                        />
                        {errors.senha && (
                            <span className={styles.fieldError}>{errors.senha}</span>
                        )}
                    </label>

                    <button
                        className={styles.loginButton}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Criando conta..." : "Criar conta"}
                    </button>
                </form>
            </div>
        </main>
    );
}
