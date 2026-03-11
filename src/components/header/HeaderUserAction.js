"use client";

import Link from "next/link";
import { User, UserCog, Store } from "lucide-react";
import styles from "./header.module.css";

// props: user vem do seu contexto de auth
export function HeaderUserAction({ user }) {
    if (!user || !user.isAuthenticated) {
        return (
            <Link href="/login" className={styles.ctaSecondary}>
                Login
            </Link>
        );
    }

    // escolhe ícone por tipo de conta
    let Icon = User;
    let profileHref = "/perfil";

    if (user.role === "admin") {
        Icon = UserCog;
        profileHref = "/admin";
    } else if (user.role === "gestor") {
        Icon = Store;
        profileHref = "/dashboard";
    }

    return (
        <Link href={profileHref} className={styles.profileButton}>
            <Icon size={18} className={styles.iconLeft} />
            <span className={styles.profileLabel}>{user.name ?? "Minha conta"}</span>
        </Link>
    );
}
