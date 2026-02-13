"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Download, Loader2, XCircle } from "lucide-react";
import Link from "next/link";

import { useIvoiceViewer } from "./hooks/useInvoiceViewer";

import { showAlert } from "@/utils/alerts";

export default function InvoiceViewer() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [listInvoices, setListInvoices] = useState<any[]>([]);
  const { processBatch, loading, results } = useIvoiceViewer();

  const activeInvoice = listInvoices.find((_, i) => i === activeTab);

  const hasProcessed = useRef(false);

  useEffect(() => {
    const billsString = localStorage.getItem("bills");
    const jsonBills = billsString ? JSON.parse(billsString) : [];
    if (!jsonBills.length) {
      showAlert({
        type: "error",
        message: "No se encontraron facturas para mostrar.",
      });
      router.push("/");
      return;
    }
    setListInvoices(jsonBills);
  }, []);

  useEffect(() => {
    if (hasProcessed.current) return;
    const dataPaysString = localStorage.getItem("dataPays");
    const jsonDataPays = dataPaysString ? JSON.parse(dataPaysString) : [];
    hasProcessed.current = true;
    processBatch(jsonDataPays);
  }, [processBatch]);

  const currentResult = results[activeTab];
  const voucher = currentResult?.data?.data?.voucher?.detail;
  const firstSection = voucher?.first_section;
  const secondSection = voucher?.second_section;

  const DataRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-start py-1 m-0">
      <span className="font-bold text-gray-900 text-base">
        {label}:
      </span>
      <span className="text-gray-600 text-right text-base">
        {value}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-8 w-full max-w-2xl">
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
        {listInvoices.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`
              px-8 py-3 rounded-full text-base font-bold transition-all duration-300 shadow-lg
              ${
                activeTab === i
                  ? "bg-white text-gray-900 scale-110 ring-4 ring-yellow-400 z-10"
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:scale-105"
              }
            `}
          >
            Factura {i + 1}
          </button>
        ))}
      </div>

      <div className="bg-white w-full rounded-[30px] shadow-2xl p-6 md:p-10 transition-all duration-500 animate-in fade-in zoom-in">
        <div className="flex flex-col items-center mb-8">
          {loading ? (
            <div className="flex flex-col items-center gap-2 text-yellow-600">
              <Loader2 className="animate-spin h-10 w-10" />
              <h2 className="text-2xl font-bold">Procesando pago...</h2>
            </div>
          ) : currentResult?.status === "success" ? (
            <>
              <CheckCircle
                className="text-yellow-400 w-14 h-14 mb-2"
                strokeWidth={2.5}
              />
              <h2 className="text-3xl font-bold text-center text-yellow-500">
                Pago aprobado
              </h2>
            </>
          ) : (
            <>
              <XCircle className="text-red-500 w-14 h-14 mb-2" />
              <h2 className="text-2xl font-bold text-center text-red-500">
                {currentResult ? "Transacción Fallida" : "Esperando..."}
              </h2>
              {currentResult?.error && (
                <p className="text-gray-500 mt-2">{currentResult.error}</p>
              )}
            </>
          )}
        </div>

        {/* --- CONTENIDO DE LA FACTURA --- */}
        {!loading && currentResult?.status === "success" && voucher && (
          <div className="space-y-3 mb-10" key={activeTab}>
            <DataRow
              label="Convenio"
              value={secondSection?.convenio || "N/A"}
            />

            {/* Si existe el código de pago/factura */}
            <DataRow
              label="Número de referencia"
              value={secondSection?.no_factura || "N/A"}
            />

            <DataRow label="Valor" value={secondSection?.valor || "$0"} />

            {/* Nota: En tu JSON la llave tiene dos puntos al final "costo_transaccion:" */}
            <DataRow
              label="Costo de transacción"
              value={secondSection?.["costo_transaccion:"] || "$0"}
            />

            {/* Combinamos Fecha y Hora */}
            <DataRow
              label="Fecha (comprobante)"
              value={`${firstSection?.fecha || ""} - ${firstSection?.hora || ""}`}
            />

            <DataRow
              label="Sucursal"
              value={firstSection?.sucursal || "Virtual"}
            />
            <DataRow
              label="Dispositivo"
              value={firstSection?.dispositivo || "N/A"}
            />
            <DataRow label="Id Trx" value={firstSection?.id_trx || "N/A"} />
            <DataRow label="Id Aut" value={firstSection?.id_aut || "N/A"} />

            {/* Email del pagador (Podrías sacarlo de localStorage si no viene en la respuesta del API) */}
            <DataRow label="Email del pagador" value="cliente@megared.co" />
          </div>
        )}

        {/* Logo del Banco */}
        <div className="flex justify-center mb-8 border-t pt-6">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-blue-900">
              Banco de Bogotá
            </span>
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <div
                className="absolute inset-0 bg-red-600 rounded-full clip-path-half"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
              ></div>
              <div className="absolute inset-0 bg-yellow-400 rounded-full scale-50 ml-2 mt-1"></div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button
            disabled={loading || currentResult?.status !== "success"}
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-500 text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-yellow-400/30 transition-transform transform hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <Download size={20} />
            Descargar comprobante
          </button>

          <Link
            href="/"
            className="flex items-center justify-center bg-white border-2 border-gray-200 hover:bg-gray-50 text-black font-bold py-3 px-10 rounded-full shadow-sm w-full sm:w-auto transition-transform active:scale-95"
          >
            Finalizar
          </Link>
        </div>
      </div>
    </div>
  );
}
