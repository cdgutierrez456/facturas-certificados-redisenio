export const realizarConsulta = async (
  barcodigo: string, 
  referencia: string, 
  metodo: string, 
  codigoA: string, 
  codigoB: string
  ) => {
  try {
    const response = await fetch("/api/proxy", {
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
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Respuesta:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
