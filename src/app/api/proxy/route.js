// app/api/proxy/route.js
import { NextResponse } from "next/server"
import { env } from "app/config/env"
import { megaRedUrls } from "app/services/megaRed/urls"
import axios from "axios" // Importamos axios

export async function POST(req) {
  try {
    console.log("Iniciando proxy handler...")
    const body = await req.json()
    console.log("Cuerpo recibido:", body)

    const { barcode, reference, method, code_agreement, code_bank } = body

    const apiUrl = megaRedUrls.consult // URL al back de QA
    const apiToken = "Bearer " + "c2337eca385cb3116b88c3451a86d18d05ba5a04"
    const version = env.MEGARED_VERSION

    console.log("Preparando solicitud al backend de QA...")
    console.log("API URL:", apiUrl)
    console.log("Token", apiToken)

    // Realizamos la solicitud usando axios
    const response = await axios.post(
      apiUrl,
      {
        barcode,
        reference,
        method,
        code_agreement,
        code_bank,
      },
      {
        headers: {
          v: version,
          "Content-Type": "application/json",
          Authorization: apiToken,
        },
        // Desactiva la verificación SSL sin la necesidad de configurar un agente https
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false,
        }),
      }
    )

    console.log("Respuesta del backend de QA:", response.data)

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error en el proxy handler:", error);
    return NextResponse.json(
      { error: "Error interno del servidor", detalles: error.message },
      { status: 500 }
    )
  }
}
