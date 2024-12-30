import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  useEscapeKey(() => setToasts([]));

  const pushToast = React.useCallback(({ variant, message }) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: window.crypto.randomUUID(),
        variant,
        message,
      },
    ]);
  }, []);

  const popToast = React.useCallback(
    (id) => {
      const nextToasts = toasts.filter((toast) => toast.id !== id);
      setToasts(nextToasts);
    },
    [toasts]
  );

  const value = React.useMemo(
    () => ({
      toasts,
      pushToast,
      popToast,
    }),
    [toasts, popToast, pushToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
