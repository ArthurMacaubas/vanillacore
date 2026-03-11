// /sucesso/page.js
"use client";
import Link from "next/link";
import styles from "./sucesso.module.css";

// src/app/(site)/sucesso/page.jsx

export default function SucessoPage() {
    // Componente não recebe props, o que evita o erro de tipo.

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Operação Realizada com Sucesso!</h1>
            <p>
                Sua ação foi concluída. Você pode ser redirecionado ou voltar para a página inicial.
            </p>
            <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Ir para a Página Inicial
            </a>
        </div>
    );
}