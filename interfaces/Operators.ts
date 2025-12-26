export interface NormalOperator {
  label: string
  value: string
  src: string
}

export interface DataInvoiceDTO {
  operator: string
  referenceMethod?: string
  referenceNumber: string
}