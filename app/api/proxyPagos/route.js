// app/api/proxy/route.js
import { NextResponse } from "next/server"
import { megaPagosUrls } from "@/services/megaPagos/urls"
import axios from "axios" // Importamos axios

export async function POST(req) {
  try {
    const body = await req.json()

    const { user,
        pass,
        tokens,
        loginDirecto,
        client } = body

    const apiUrl = megaPagosUrls.consult + "user/login-comercio" // URL al back de Q

    const response = await axios.post(
      apiUrl,
      {
        user,
        pass,
        tokens,
        loginDirecto,
        client,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
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
      { status: error.response.status }
    )
  }
}

export async function GET(req) {

  const bearer = await req.headers.get("Authorization")
  const apiUrl = megaPagosUrls.consult + "transaction/get-banks" // URL al back de Q
  const apiToken = bearer

  // Realizamos la solicitud usando axios
  const response = await axios.get(
    apiUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        Authorization: apiToken
      },
      // Desactiva la verificación SSL sin la necesidad de configurar un agente https
      httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false,
      }),
    }
  )
  return NextResponse.json(response.data)
    try {
    } catch (error) {
      return NextResponse.json(
        { error: "Error interno del servidor", detalles: error.message },
        { status: error.response.status }
      )
    }
  }