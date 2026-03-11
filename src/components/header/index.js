"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Menu,
    X,
    ShoppingCart,
    User,
    UserCog,
    Store,
    LogOut,
} from "lucide-react";
import styles from "./header.module.css";
import { getSession, logout } from "../../utils/auth";

const NAV_LINKS = [
    { href: "/", label: "Início" },
    { href: "/produtos", label: "Produtos" },
    { href: "/picoles", label: "Picolés" },
    { href: "/acais", label: "Açaís" },
];

function HeaderUserAction({ user }) {
    if (!user) {
        return (
            <Link href="/login" className={styles.ctaSecondary}>
                Entrar
            </Link>
        );
    }

    let Icon = User;
    let profileHref = "/cliente";

    if (user.role === "admin") {
        Icon = UserCog;
        profileHref = "/gerenciamento";
    } else if (user.role === "gestor") {
        Icon = Store;
        profileHref = "/dashboard";
    }

    return (
        <div className={styles.profileArea}>
            <Link href={profileHref} className={styles.profileButton}>
                <Icon size={15} className={styles.iconLeft} />
                <span className={styles.profileLabel}>{user.name ?? "Minha conta"}</span>
            </Link>
            <button
                type="button"
                className={styles.logoutButton}
                onClick={() => {
                    logout();
                    window.location.href = "/login";
                }}
                aria-label="Sair da conta"
            >
                <LogOut size={15} />
            </button>
        </div>
    );
}

export default function Header() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        setUser(getSession());
    }, []);

    // fecha o menu ao mudar de rota
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const toggleMenu = () => setOpen((prev) => !prev);
    const closeMenu = () => setOpen(false);

    return (
        <header className={styles.header}>
            {/* Logo */}
            <Link href="/" className={styles.logo} onClick={closeMenu}>
                Vanillacore
            </Link>

            {/* Nav desktop */}
            <nav
                className={`${styles.nav} ${open ? styles.navOpen : ""}`}
                aria-label="Navegação principal"
            >
                {NAV_LINKS.map((link) => {
                    const isActive =
                        link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Ações direita */}
            <div className={styles.headerAction}>
                <Link href="/carrinho" className={styles.ctaButton} aria-label="Carrinho">
                    <ShoppingCart size={17} />
                </Link>
                <HeaderUserAction user={user} />
            </div>

            {/* Toggle mobile */}
            <button
                className={styles.menuToggle}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                onClick={toggleMenu}
            >
                {open ? <X size={22} /> : <Menu size={22} />}
            </button>
        </header>
    );
}
