"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import forge from "node-forge";
import Image from "next/image";

import Header from "@/components/shared/Header/Header";
import PaymentStatus from "@/components/modules/payment/PaymentStatus";

import { consultarLlave, realizarConsultaPagoPSE } from "@/services/megaPagos/consultasMegaPagos";
// import { getLastTransaction } from "@/utils/storage";
import { manejarEncriptacion } from "@/utils/encript";

import styles from "./Paid.module.sass";

export default function SuccessPage() {
  // const router = useRouter();
  // const [lastTransaction, setLastTransaction] = useState<any>({ cantidad: 0 });
  // const [facturas, setFacturas] = useState<any[]>([
  //   {
  //     fecha: "",
  //     sucursal: "",
  //     dispositivo: "",
  //     idTrx: "",
  //     idAut: "",
  //   },
  // ]);
  const [transaction, setTransaction] = useState<any>({
    codigoPago: "",
    date: "",
    amount: "",
    paymentId: "",
    paymentMethod: "",
    status: "",
    requestId: "",
    email: "",
    bank: "",
    convenio: "",
    referencia: "",
    cost: "",
    sucursal: "",
  })

  useEffect(() => {
    // const data = getLastTransaction()
    // if (data) {
    //   setLastTransaction(data)
    //   const cantidad = data.cantidad;
    //   const facturasMap = Array.from({ length: cantidad }, (_, i) => ({
    //     fecha: transaction.date,
    //     sucursal: transaction.sucursal,
    //     dispositivo: `Disp-${i + 1}`,
    //     idTrx: `Trx-${i + 1}`,
    //     idAut: `Aut-${i + 1}`,
    //   }));

    //   setFacturas(facturasMap);
    // }
    procesar()
  }, [])

  const procesar = async () => {
    const tansactionId = localStorage.getItem('transactionId')
    const accessToken = localStorage.getItem('accessToken')
    if (!tansactionId) return;
    try {
      const keysResponse = await consultarLlave();
      const publicKey = keysResponse.data.public_key;
      const paseData = parseInt(forge.util.decode64(tansactionId))
      const encriptedData = await manejarEncriptacion(paseData, publicKey);
      if (encriptedData) {
        const consultaInf = await realizarConsultaPagoPSE(
          `${accessToken}`,
          encriptedData
        );
        setTransaction(consultaInf)
      }
    } catch (error) {
      console.error("Error procesando la transacción:");
    }
  }

  return (
    <section className="relative h-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          className="absolute object-cover"
          src="/images/hero-bg.png"
          alt="Background general del home"
          fill
        />
      </div>
      <Header />
      <PaymentStatus
        infoTransaction={transaction}
      />
    </section>
  );
}
