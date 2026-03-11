"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function GestaoPedidos() {
  const [pedidos, setPedidos] = useState([
    {
      id: "001",
      cliente: "João Silva",
      data: "08/10/2025",
      status: "Em andamento",
      itens: ["2x Sorvete Chocolate", "1x Casquinha Baunilha", "3x Milkshake Morango"],
      detalhesVisiveis: false,
    },
    {
      id: "002",
      cliente: "Maria Santos",
      data: "07/10/2025",
      status: "Em andamento",
      itens: ["1x Sorvete Pistache", "2x Casquinha Chocolate"],
      detalhesVisiveis: false,
    },
  ]);

  const alternarDetalhes = (id) => {
    setPedidos(prev =>
      prev.map(p => p.id === id ? { ...p, detalhesVisiveis: !p.detalhesVisiveis } : p)
    );
  };

  const concluirPedido = (id) => {
    setPedidos(prev =>
      prev.map(p => p.id === id ? { ...p, status: "Concluído" } : p)
    );
  };

  const removerPedido = (id) => {
    setPedidos(prev => prev.filter(p => p.id !== id));
  };

  const pedidosAndamento = pedidos.filter(p => p.status === "Em andamento");
  const pedidosConcluidos = pedidos.filter(p => p.status === "Concluído");

  const renderTabela = (listaPedidos) => (
    <table className={styles.tabela}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Data</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {listaPedidos.map(pedido => (
          <>
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente}</td>
              <td>{pedido.data}</td>
              <td>{pedido.status}</td>
              <td className={styles.acoes}>
                <button className={styles.remover} onClick={() => removerPedido(pedido.id)}>Remover</button>
                <button className={styles.detalhes} onClick={() => alternarDetalhes(pedido.id)}>
                  {pedido.detalhesVisiveis ? "Fechar Detalhes" : "Ver Detalhes"}
                </button>
                {pedido.status === "Em andamento" && (
                  <button className={styles.concluir} onClick={() => concluirPedido(pedido.id)}>
                    Concluir
                  </button>
                )}
              </td>
            </tr>
            {pedido.detalhesVisiveis && (
              <tr className={styles.linhaDetalhes}>
                <td colSpan={5}>
                  <div className={styles.conteudoDetalhes}>
                    <strong>Itens do pedido:</strong>
                    <ul>
                      {pedido.itens.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Pedidos em Andamento</h1>
      {renderTabela(pedidosAndamento)}

      <h1 className={styles.titulo}>Pedidos Concluídos</h1>
      {renderTabela(pedidosConcluidos)}
    </main>
  );
}
