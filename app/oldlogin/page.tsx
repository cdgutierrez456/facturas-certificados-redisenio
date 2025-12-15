'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"; // O react-router-dom si usas otro enrutador
import { auth } from "@/services/firebase/serviciosFaqs";  // Asegúrate de importar correctamente Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./LoginPage.module.sass";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/adminQ");
    } catch (err) {
      setError("Error de autenticación. Verifica tus credenciales.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}


export default LoginPage;