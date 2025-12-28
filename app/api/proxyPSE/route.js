// app/api/proxy/route.js
import { NextResponse } from "next/server"
import { megaPagosUrls } from "@/services/megaPagos/urls"
import axios from "axios" // Importamos axios

export async function POST(req) {
  try {
    const body = await req.json()
    const bearer = await req.headers.get("Authorization")
    const { data } = body
    const apiUrl = megaPagosUrls.consult + "transaction/create"

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
