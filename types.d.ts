interface ErrorPageProps {
    error: Error;
    reset: () => void;
  }

interface FAQ {
    id: string;
    question: string;
    answer: string;
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
  code_agreement: string;
  code_bank: string
}

interface results {
  data: any;
  error: any;
} 