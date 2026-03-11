"use client";
import { useEffect, useState } from "react";
import styles from "./monitoramento.module.css";

export default function Monitoramento() {
  const [step, setStep] = useState(1);

  const messages = [
    "Iniciando processo...",
    "Analizando pedido...",
    "Fabricando pedido...",
    "Transportando pedido...",
    "Pedido entregue! 🍨"
  ];

  useEffect(() => {
    if (step < 5) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 11000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className={styles.fundo}>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Monitoramento</h1>
        <div className={styles.progressContainer}>
          <div id="progress" className={styles.progress}></div>
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`${styles.circle} ${
                step >= n ? styles.active : ""
              }`}
            >
              {n}
            </div>
          ))}
        </div>
        <p
          id="message"
          className={`${styles.msg} ${step === 5 ? styles.entregue : ""}`}
        >
          {messages[step - 1]}
        </p>
      </div>
    </div>
  );
}
