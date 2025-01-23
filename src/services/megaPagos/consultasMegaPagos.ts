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
      console.log("Respuesta:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
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
      console.log("Respuesta:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
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
  
      const data = await response.json();
      console.log("Respuesta:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }