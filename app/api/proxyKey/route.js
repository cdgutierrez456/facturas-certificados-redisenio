// app/api/proxy/route.js
import { NextResponse } from "next/server"
import { megaPagosUrls } from "@/services/megaPagos/urls"
import axios from "axios" // Importamos axios


export async function GET() {
    try {
      const apiUrl = megaPagosUrls.consult + "key/public" // URL al back de Q
      // Realizamos la solicitud usando axios
      const response = await axios.get(
        apiUrl,
        {
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
          },
          // Desactiva la verificación SSL sin la necesidad de configurar un agente https
          httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false,
          }),
        }
      )
      return NextResponse.json(response.data)
    } catch (error) {
      return NextResponse.json(
        { error: "Error interno del servidor", detalles: error.message },
        { status: 500 }
      )
    }
  }
