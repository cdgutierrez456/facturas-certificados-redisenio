export const realizarLoging = async (
  usuario: string = "recaudodefacturas@gmail.com",
  pase: string = "fac-7jRB&brx",
  token = null,
  login: boolean = true,
  cliente: string = "api"
) => {
    try {
      const response = await fetch("/api/proxyPagos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user:usuario,
          pass:pase,
          tokens: token,
          loginDirecto: login,
          client: cliente
        }),
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error realizarLoging");
    }
  }

  export const consultarBancos = async (
    token: string,
  ) => {
    try {
      const response = await fetch("/api/proxyPagos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
      })

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error consultarBancos");
    }
  }

  export const consultarLlave = async (
    ) => {
    try {
      const response = await fetch("/api/proxyKey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error consultarLlave")
    }
  }

  export const realizarPagoPSE = async (token: string, data: string) => {
    try {
      const bodyJSON = JSON.stringify({ data })
      const response = await fetch("/api/proxyPSE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },body: bodyJSON
      })

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`)
      }

      const rta = await response.json()
      return rta
    } catch (error) {
      console.error("Error realizarPagoPSE")
    }
  }


  export const realizarConsultaPagoPSE = async (token: string, transactionId: string) => {
    try {
      const bodyJSON = JSON.stringify({ transactionId })
      const response = await fetch("/api/proxyStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },body: bodyJSON
      })

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`)
      }

      const rta = await response.json()
      return rta;
    } catch (error) {
      console.error("Error realizarConsultaPagoPSE");
    }
  }