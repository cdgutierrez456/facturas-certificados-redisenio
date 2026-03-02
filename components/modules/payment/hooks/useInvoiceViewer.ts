import { useState, useCallback } from 'react';

interface PaymentItem {
  AgrmId: string;
  amount: number;
  referencia: string;
  [key: string]: any;
}

interface ProcessResult {
  status: 'success' | 'error';
  id: string;
  data?: any;
  error?: string;
}

interface CachedResult {
  result: ProcessResult;
  timestamp: number;
}

const TWO_MINUTES_MS = 2 * 60 * 1000;

const getCacheKey = (item: PaymentItem) =>
  `invoice_result_${item.AgrmId}_${item.amount}`;

export const useIvoiceViewer = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const summary = {
    total: results.length,
    successful: results.filter(r => r.status === 'success').length,
    failed: results.filter(r => r.status === 'error').length
  };

  const processBatch = useCallback(async (items: PaymentItem[]) => {
    setLoading(true);
    setResults([]);

    const promises = items.map(async (item) => {
      const cacheKey = getCacheKey(item);
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const parsed: CachedResult = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;

        // Pago exitoso: nunca re-enviar
        if (parsed.result.status === 'success') {
          return parsed.result;
        }

        // Pago fallido dentro de la ventana de 2 minutos: no reintentar
        if (parsed.result.status === 'error' && age < TWO_MINUTES_MS) {
          const secsLeft = Math.ceil((TWO_MINUTES_MS - age) / 1000);
          return {
            ...parsed.result,
            error: `Reintento disponible en ${secsLeft}s. ${parsed.result.error}`,
          };
        }
      }

      // Sin cache o error expirado: llamar a la API
      try {
        const response = await fetch('/api/proxyInvoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ channel: 5, data_pay: item }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.detalles?.message || `Error HTTP: ${response.status}`);
        }

        const result: ProcessResult = { status: 'success', id: item.AgrmId, data };
        localStorage.setItem(cacheKey, JSON.stringify({ result, timestamp: Date.now() }));
        return result;

      } catch (err: any) {
        const result: ProcessResult = {
          status: 'error',
          id: item.AgrmId,
          error: err.message || 'Error desconocido',
        };
        localStorage.setItem(cacheKey, JSON.stringify({ result, timestamp: Date.now() }));
        return result;
      }
    });

    const finalResults = await Promise.all(promises);
    setResults(finalResults);
    setLoading(false);

    return finalResults;
  }, []);

  return {
    processBatch,
    loading,
    results,
    summary
  };
};