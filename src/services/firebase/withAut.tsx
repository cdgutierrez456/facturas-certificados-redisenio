'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "app/services/firebase/serviciosFaqs";

const withAuth = (Component: React.ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // Si el usuario está autenticado, ocultar el estado de carga
          setLoading(false);
        } else {
          // Si no está autenticado, redirigir a la página de login
          router.push("/login");
        }
      });

      // Limpiar el listener cuando el componente se desmonte
      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    // Retornar el componente solo si el usuario está autenticado
    return <Component {...props} />;
  };
};

export default withAuth;
