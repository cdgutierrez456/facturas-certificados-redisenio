import { env } from "app/config/env";
import { megaRedUrls } from "app/services/megaRed/urls";

export const realizarConsulta = async (barcodigo:String, referencia:String, metodo:String, codigoA:String ) => {
    
  try {
    const apiUrl = megaRedUrls.consult
    const apiToken = "Bearer "+env.MEGARED_TOKEN
    const version = env.MEGARED_VERSION

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        v: version,
        "Content-Type": "application/json",
        Authorization: apiToken,
      },
      body: JSON.stringify({
        barcode: barcodigo,
        reference: referencia,
        method: metodo,
        code_agreement: codigoA
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Respuesta:", data);
    return data
  } catch (error) {
    console.error("Error:", error);
  }
};
