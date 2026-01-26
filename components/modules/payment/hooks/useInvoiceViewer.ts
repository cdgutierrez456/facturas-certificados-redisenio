import { useState, useCallback } from 'react';

// Definimos la forma de los datos de entrada (basado en tu imagen anterior)
interface PaymentItem {
  AgrmId: string;
  amount: number;
  referencia: string;
  [key: string]: any; // Para permitir otras propiedades extra
}

interface ProcessResult {
  status: 'success' | 'error';
  id: string;
  data?: any;
  error?: string;
}

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
      try {
        const response = await fetch('/api/proxyInvoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            channel: 5,
            data_pay: item
          })
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        return {
          status: 'success',
          id: item.AgrmId,
          data
        } as ProcessResult;

      } catch (err: any) {
        return {
          status: 'error',
          id: item.AgrmId,
          error: err.message || 'Error desconocido'
        } as ProcessResult;
      }
    });
    const finalResults = await Promise.all(promises);
    console.log('Final Results:', finalResults);

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