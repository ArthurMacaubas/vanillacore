import Link from "next/link";
import styles from "./historico.module.css";

const historicoPedidos = [
  {
    numero: "12348",
    data: "01/12/2025 18:20",
    itens: [
      { nome: "Açaí com granola", quantidade: 1, preco: 14.5 },
      { nome: "Milkshake de Chocolate", quantidade: 1, preco: 16.0 },
    ],
    etapas: [""],
    etapaAtual: 3,
  },
  {
    numero: "12347",
    data: "01/12/2025 12:45",
    itens: [{ nome: "Picolé Napolitano", quantidade: 2, preco: 8.9 }],
    etapas: [""],
    etapaAtual: 3,
  },
  {
    numero: "12346",
    data: "02/12/2025 15:10",
    itens: [
      { nome: "Picolé Napolitano", quantidade: 1, preco: 8.9 },
      { nome: "Açaí com granola", quantidade: 1, preco: 14.5 },
    ],
    etapas: [""],
    etapaAtual: 1,
  },
];

export default function HistoricoPedidos() {
  return (
    <div className={styles.container}>
      <div className={styles.titulo}>Histórico de Pedidos</div>

      {historicoPedidos.map((pedido, index) => {
        const total = pedido.itens.reduce(
          (acc, item) => acc + item.preco * item.quantidade,
          0
        );

        const isAtivo = pedido.etapaAtual < pedido.etapas.length - 1;

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
                  <span>
                    R{"$ "}
                    {(item.preco * item.quantidade)
                      .toFixed(2)
                      .replace(".", ",")}
                  </span>
                </div>
              ))}
              <div className={styles.total}>
                <strong>Total:</strong> R{"$ "}
                {total.toFixed(2).replace(".", ",")}
              </div>
            </div>

            {isAtivo ? (
              <div className={styles.etapas}>
                {pedido.etapas.map((etapa, idx) => (
                  <div key={idx} className={styles.etapa}>
                    <div className={styles.etiqueta}>{etapa}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.entregue}>Pedido entregue ✅</div>
            )}
          </div>
        );
      })}

      <Link href="/" className={styles.homeButton}>
        Voltar para a loja
      </Link>
    </div>
  );
}
