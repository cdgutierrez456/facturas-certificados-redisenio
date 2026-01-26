// app/api/proxy/route.js
import { NextResponse } from "next/server"
import { env } from "@/config/env"
import { megaRedUrls } from "@/services/megaRed/urls"
import axios from "axios"

export async function POST(req) {
  try {
    const body = await req.json()

    const apiUrl = megaRedUrls.payInvoice
    const apiToken = "Bearer " + "c2337eca385cb3116b88c3451a86d18d05ba5a04"
    const version = env.MEGARED_VERSION

    const response = await axios.post(
      apiUrl,
      body,
      {
        headers: {
          v: version,
          "Content-Type": "application/json",
          Authorization: apiToken,
        },
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false,
        }),
      }
    )

    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor", detalles: error.response.data },
      { status: error.response.status }
    )
  }
}
