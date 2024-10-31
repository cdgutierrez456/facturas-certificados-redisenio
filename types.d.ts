interface ErrorPageProps {
    error: Error;
    reset: () => void;
  }

interface InfConsult {
  operator: string;
  method: string;
  value: string;
  payValue: string;
}

interface ItemConsult{
  barcode: string;
  reference: string;
  method: string;
  code_agreement: string
}

interface results {
  data: any;
  error: any;
} 