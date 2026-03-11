"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "./assets/loader.json";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function SiteLayout({ children }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => setShowLoader(false), 400);
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isLoaded ? "" : "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoaded]);

    return (
        <>
            {showLoader && (
                <div
                    className={
                        "global-loader-overlay" +
                        (isLoaded ? " global-loader-overlay--hidden" : "")
                    }
                >
                    <Lottie
                        animationData={loaderAnimation}
                        loop
                        autoplay
                        style={{ width: 180, height: 180 }}
                    />
                    <p className="global-loader-text">Preparando seus sabores...</p>
                </div>
            )}

            <div className={`app-shell ${isLoaded ? "app-shell--visible" : ""}`}>
                <Header />
                {children}
                <Footer />
            </div>
        </>
    );
}
