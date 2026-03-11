"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./carrinho.module.css";

const itensIniciais = [
  { id: 1, nome: "Sorvete de Chocolate", preco: 12.34, quantidade: 1 },
  { id: 2, nome: "Milkshake de Morango", preco: 18.5, quantidade: 2 },
  { id: 3, nome: "Picolé Napolitano", preco: 8.9, quantidade: 1 },
];

export default function CarrinhoPage() {
  const [itensCarrinho, setItensCarrinho] = useState(itensIniciais);
  const [pagamentoAberto, setPagamentoAberto] = useState(false);
  const [modoPagamento, setModoPagamento] = useState("selecionar");

  const total = useMemo(() => {
    return itensCarrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
  }, [itensCarrinho]);

  const handleQuantidadeChange = (id, novaQuantidade) => {
    if (novaQuantidade < 1) return;

    setItensCarrinho(
      itensCarrinho.map((item) =>
        item.id === id ? { ...item, quantidade: parseInt(novaQuantidade) } : item
      )
    );
  };

  const handleRemoverItem = (id) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      setItensCarrinho(itensCarrinho.filter((item) => item.id !== id));
    }
  };

  const abrirPagamento = () => {
    if (itensCarrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    setPagamentoAberto(true);
    setModoPagamento("selecionar");
  };

  const fecharPagamento = () => setPagamentoAberto(false);

  return (
    <div className={styles.container}>
      <main className={styles.cartContainer}>
        <h1>Carrinho de compras</h1>

        {itensCarrinho.length > 0 ? (
          <>
            <table className={styles.cartTable}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {itensCarrinho.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.itemBox}></div>
                      {item.nome}
                    </td>
                    <td>
                      <span className={styles.price}>
                        R$ {item.preco.toFixed(2).replace(".", ",")}
                      </span>
                    </td>
                    <td>
                      <div className={styles.quantityControl}>
                        <input
                          type="number"
                          value={item.quantidade}
                          min="1"
                          onChange={(e) =>
                            handleQuantidadeChange(item.id, e.target.value)
                          }
                          className={styles.quantityInput}
                        />
                        <button
                          className={styles.removeButton}
                          onClick={() => handleRemoverItem(item.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.cartFooter}>
              <button className={styles.finalizarButton} onClick={abrirPagamento}>
                Finalizar Compra
              </button>
              <div className={styles.total}>
                Total: R$ {total.toFixed(2).replace(".", ",")}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.emptyCart}>
            <h2>Seu carrinho está vazio!</h2>
            <p>Que tal adicionar alguns produtos deliciosos?</p>
            <Link href="/produtos" className={styles.shopButton}>
              Ir às Compras
            </Link>
          </div>
        )}
      </main>

      {pagamentoAberto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={fecharPagamento}>
              X
            </button>
            <h2>Pagamento</h2>

            {modoPagamento === "selecionar" && (
              <div className={styles.pagamentosContainer}>
                <div
                  className={styles.pagamentoBox}
                  onClick={() => setModoPagamento("pix")}
                >
                  <Image src="/pix.png" width={150} height={100} alt="PIX" />
                  <p>PIX</p>
                </div>
                <div
                  className={styles.pagamentoBox}
                  onClick={() => setModoPagamento("cedula")}
                >
                  <Image
                    src="/100reais.jpg"
                    width={150}
                    height={100}
                    alt="Dinheiro"
                  />
                  <p>Dinheiro</p>
                </div>
              </div>
            )}

            {modoPagamento === "pix" && (
              <div className={styles.detalhesPagamento}>
                <h3>PIX</h3>
                <Image
                  src="/qrcode.png"
                  width={150}
                  height={150}
                  alt="QR Code PIX"
                />
                <p>Chave PIX: loja@gellatoitali.com</p>
                <p>Total: R$ {total.toFixed(2).replace(".", ",")}</p>

                <Link href="/historicoPedidos" className={styles.btn}>
                  Concluído
                </Link>
              </div>
            )}

            {modoPagamento === "cedula" && (
              <div className={styles.detalhesPagamento}>
                <h3>Dinheiro</h3>
                <p>Total a pagar: R$ {total.toFixed(2).replace(".", ",")}</p>

                <Link href="/historicoPedidos" className={styles.btn}>
                  Concluído
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
