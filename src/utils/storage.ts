export const saveToCache = (data: any) => {
    if (typeof window !== "undefined") {
      const key = "transactionData"
      let storedData: any[] = JSON.parse(localStorage.getItem(key) || "[]")

      // Mantener solo los últimos 10 elementos
      if (storedData.length >= 10) {
        storedData.shift()
      }

      storedData.push(data)
      localStorage.setItem(key, JSON.stringify(storedData))
    }
  }

export  const getLastTransaction = (): any => {
    if (typeof window !== "undefined") {
        const key = "transactionData"
        const storedData: any[] = JSON.parse(localStorage.getItem(key) || "[]")
        return storedData.length > 0 ? storedData[storedData.length - 1] : null
    }
    return null
}