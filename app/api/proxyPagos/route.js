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
  try {
    const bearer = await req.headers.get("Authorization")
    const apiUrl = megaPagosUrls.consult + "transaction/get-banks"
    const apiToken = bearer

    const response = await axios.get(
      apiUrl,
      {
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          Authorization: apiToken
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