import React from "react";

export default function useEscapeKey(callback) {
  React.useEffect(() => {
    function clearAllToasts(event) {
      if (event.key !== "Escape") return;
      callback();
    }

    window.addEventListener("keydown", clearAllToasts);

    return () => {
      window.removeEventListener("keydown", clearAllToasts);
    };
  }, [callback]);
}
