import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook } from "lucide-react";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>

                {/* ── BRAND ── */}
                <div className={styles.colBrand}>
                    <h2 className={styles.logo}>
                        Gellato<span>Itali</span>
                    </h2>
                    <p className={styles.description}>
                        Sabor artesanal, qualidade premium e a tradição italiana que encanta gerações.
                    </p>
                    <div className={styles.socialRow}>
                        <Link href="#" className={styles.socialBtn} aria-label="Instagram">
                            <Instagram size={15} />
                        </Link>
                        <Link href="#" className={styles.socialBtn} aria-label="Facebook">
                            <Facebook size={15} />
                        </Link>
                        <Link href="#" className={styles.socialBtn} aria-label="Twitter">
                            <Twitter size={15} />
                        </Link>
                    </div>
                </div>

                {/* ── NAVEGAÇÃO ── */}
                <div className={styles.col}>
                    <span className={styles.colTitle}>Navegação</span>
                    <ul>
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/produtos">Produtos</Link></li>
                        <li><Link href="/picoles">Picolés</Link></li>
                        <li><Link href="/acais">Açaís</Link></li>
                    </ul>
                </div>

                {/* ── CONTATO ── */}
                <div className={styles.col}>
                    <span className={styles.colTitle}>Contato</span>
                    <ul>
                        <li>
                            <Phone size={14} className={styles.colIcon} />
                            (00) 1234-5678
                        </li>
                        <li>
                            <Mail size={14} className={styles.colIcon} />
                            contato@gellatoitali.com
                        </li>
                        <li>
                            <MapPin size={14} className={styles.colIcon} />
                            Rua do Gelo, 123 — Gelato City
                        </li>
                    </ul>
                </div>

                {/* ── ACESSO ── */}
                <div className={styles.col}>
                    <span className={styles.colTitle}>Acesso</span>
                    <ul>
                        <li><Link href="/usuarios">Usuários</Link></li>
                        <li><Link href="/gestaoPedido">Gestão de pedidos</Link></li>
                        <li><Link href="/login">Entrar</Link></li>
                    </ul>
                </div>

            </div>

            {/* ── BOTTOM BAR ── */}
            <div className={styles.bottom}>
                <p className={styles.bottomCopy}>
                    &copy; {new Date().getFullYear()} GellatoItali. Todos os direitos reservados.
                </p>
                <div className={styles.bottomLinks}>
                    <Link href="#">Privacidade</Link>
                    <span className={styles.bottomDot} />
                    <Link href="#">Termos de Uso</Link>
                </div>
            </div>
        </footer>
    );
}