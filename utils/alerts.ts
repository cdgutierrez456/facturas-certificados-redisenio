import Swal from 'sweetalert2';

type AlertType = 'success' | 'warning' | 'error' | 'info' | 'question';

interface AlertProps {
  type: AlertType;
  message: string;
  title?: string;
  confirmButtonText?: string;
}

export const showAlert = ({ type, message, title, confirmButtonText }: AlertProps) => {
  const colors = {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    question: '#6366F1'
  };

  return Swal.fire({
    icon: type,
    title: title || getTypeTitle(type),
    text: message,
    confirmButtonColor: colors[type],
    confirmButtonText: confirmButtonText || 'Entendido',
    customClass: {
      popup: 'rounded-xl shadow-xl',
      confirmButton: 'px-6 py-2 rounded-lg font-bold'
    },
    heightAuto: false,
    focusConfirm: false,
  });
};

export const showToast = (type: AlertType, message: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  Toast.fire({
    icon: type,
    title: message
  });
};

const getTypeTitle = (type: AlertType): string => {
  const titles = {
    success: '¡Éxito!',
    warning: 'Atención',
    error: 'Ocurrió un error',
    info: 'Información',
    question: '¿Estás seguro?'
  };
  return titles[type];
};