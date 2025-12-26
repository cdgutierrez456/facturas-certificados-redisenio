export const realizarConsulta = async (
  barcodigo: string,
  referencia: string,
  metodo: string,
  codigoA: string,
  codigoB: string
) => {
  return new Promise<any>((resolve, reject) => {
    fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        barcode: barcodigo,
        reference: referencia,
        method: metodo,
        code_agreement: codigoA,
        code_bank: codigoB,
      }),
    })
    .then(data => data.json())
    .then(data => resolve(data))
    .catch(e => reject(e))
  })
}
