import forge from "node-forge";
 
 // Función para generar una llave aleatoria
 const generarLlaveAleatoria = (): string => {
    return forge.random.getBytesSync(32); // se usa plana
  }

  // Función para encriptar con AES
  const encriptarAES = (value: any, key: string): string => {
    const keyBytes = forge.util.createBuffer(key);
    // Generate a random IV
    const iv = forge.random.getBytesSync(16);
    // Create a cipher object
    const cipherObject = forge.cipher.createCipher("AES-CBC", keyBytes);

    cipherObject.start({ iv: iv });
    cipherObject.update(forge.util.createBuffer(value, "utf8"));
    cipherObject.finish();

    const ciphertext = cipherObject.output.getBytes();
    const ivBase64 = forge.util.encode64(iv);
    const ciphertextBase64 = forge.util.encode64(ciphertext);

    return forge.util.encode64(
      JSON.stringify({ iv: ivBase64, value: ciphertextBase64 })
    );
  }

  // Función para encriptar la llave aleatoria con la llave pública usando RSA
  const encriptarRSA = (key: string, publicKeyBase64: string): string => {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyBase64); // Crear la llave pública RSA

    const encryptedKey = publicKey.encrypt(key, "RSA-OAEP", {
      md: forge.md.sha1.create(),
      mgf1: {
        md: forge.md.sha1.create(),
      },
    }); // Encriptar con RSA-OAEP
    return forge.util.encode64(encryptedKey);
  }

export  const manejarEncriptacion = async (data: any, publicKey:any) => {
    try {
      // Paso 1: Obtener la llave pública desde la API
      const publicKeyBase64 = publicKey;
      const derBytes = Buffer.from(publicKeyBase64, "base64").toString("ascii");

      // Paso 2: Generar una llave aleatoria de 256 bits
      const randomKey = generarLlaveAleatoria();

      console.log(data);

      // Paso 4: Encriptar los datos con AES
      const encryptedData = encriptarAES(data, randomKey);

      // Paso 5: Encriptar la llave aleatoria con RSA
      const encryptedKey = encriptarRSA(randomKey, derBytes);

      // Construir el objeto final
      const resultadoEncriptado = {
        encryptedKey,
        encryptedData,
      };

      // Paso 6: Codificar el resultado en Base64
      const resultadoBase64 = forge.util.encode64(
        JSON.stringify(resultadoEncriptado)
      )
      return resultadoBase64;
    } catch (err: any) {
      console.error("Error en el proceso de encriptación:", err);
    }
  }