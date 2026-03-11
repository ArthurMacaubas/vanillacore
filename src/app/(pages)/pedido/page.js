"use client";

import Link from "next/link";
import styles from "./page.module.css";

// Dados simulados de múltiplos pedidos
const pedidos = [
  {
    numero: "12345",
    data: "02/12/2025 14:30",
    itens: [
      { nome: "Sorvete de Chocolate", quantidade: 1, preco: 12.34 },
      { nome: "Milkshake de Morango", quantidade: 2, preco: 18.5 },
    ],
    etapas: ["Pedido recebido", "Preparando", "Saiu para entrega", "Entregue"],
    etapaAtual: 2
  },
  {
    numero: "12346",
    data: "02/12/2025 15:10",
    itens: [
      { nome: "Picolé Napolitano", quantidade: 1, preco: 8.9 },
      { nome: "Açaí com granola", quantidade: 1, preco: 14.5 },
    ],
    etapas: ["Pedido recebido", "Preparando", "Saiu para entrega", "Entregue"],
    etapaAtual: 1
  }
];

export default function Pedido() {
  return (
    <div className={styles.container}>
      <div className={styles.titulo}>Monitoramento de Pedidos</div>

      {pedidos.map((pedido, index) => {
        const total = pedido.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        return (
          <div key={index} className={styles.cardPedido}>
            <div className={styles.headerPedido}>
              <span>Pedido #{pedido.numero}</span>
              <span>{pedido.data}</span>
            </div>

            <div className={styles.itensPedido}>
              {pedido.itens.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <span>{item.quantidade}x</span>
                  <span>{item.nome}</span>
                  <span>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
              <div className={styles.total}>
                <strong>Total:</strong> R$ {total.toFixed(2).replace('.', ',')}
              </div>
            </div>

            <div className={styles.etapas}>
              {pedido.etapas.map((etapa, idx) => (
                <div key={idx} className={styles.etapa}>
                  <div
                    className={`${styles.bolinha} ${
                      idx <= pedido.etapaAtual ? styles.ativa : ""
                    }`}
                  />
                  <div className={styles.etiqueta}>{etapa}</div>
                  {idx < pedido.etapas.length - 1 && (
                    <div className={`${styles.linha} ${idx < pedido.etapaAtual ? styles.linhaAtiva : ""}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <Link href="/" className={styles.homeButton}>
        Voltar para a loja
      </Link>
    </div>
  );
}
