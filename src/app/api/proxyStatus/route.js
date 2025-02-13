// app/api/proxy/route.js
import { NextResponse } from "next/server"
import { megaPagosUrls } from "app/services/megaPagos/urls"
import axios from "axios" // Importamos axios

export async function POST(req) {
  try {
    console.log("Iniciando proxy handler...")
    const body = await req.json()
    console.log("Cuerpo recibido:", body)
    const bearer = await req.headers.get("Authorization")
    console.log("Token recibido:", bearer)
  

    const { data } = body

    const apiUrl = megaPagosUrls.consult + "transaction/get-inf" // URL al back de Q

    console.log("Preparando solicitud al backend de QA...")
    console.log("API URL Mega Pagos:", apiUrl)

    // Realizamos la solicitud usando axios
    const response = await axios.post(
      apiUrl,
      {
        data
      },
      {
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          Authorization: bearer
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
    console.error("Error en el proxy handler:", error)
    return NextResponse.json(
      { error: "Error interno del servidor", detalles: error.message },
      { status: 500 }
    )
  }
}
