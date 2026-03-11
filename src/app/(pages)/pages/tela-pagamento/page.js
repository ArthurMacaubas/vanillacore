"use client";
import Image from "next/image";
import "./pagamento.module.css";

export default function Pagamento() {
  return (
    <div className="fundo">
      <div className="container">
        <h1 className="titulo">Pagamento</h1>

        <div className="card">
          <h3>Cartão de crédito</h3>

          {/* Logos */}
          <div className="bandeiras">
            <Image src="/visa.png" width={40} height={20} alt="Visa" />
            <Image src="/mastercard.png" width={40} height={20} alt="Mastercard" />
            <Image src="/amex.png" width={40} height={20} alt="Amex" />
          </div>

          <input type="text" placeholder="Número do cartão" className="input" />
          <input type="text" placeholder="Nome no cartão" className="input" />

          <div className="linha">
            <input type="text" placeholder="MM / AA" className="input metade" />
            <input
              type="text"
              placeholder="Código de segurança"
              className="input metade"
            />
          </div>

          <button className="btn">Efetuar pagamento</button>
        </div>
      </div>
    </div>
  );
}
