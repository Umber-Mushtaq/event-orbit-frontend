import { useEffect } from "react";
import { showToast } from "./toastStore";

function StatusIndicator({ error, success }) {
  useEffect(() => {
    if (error) showToast({ type: "error", message: error });
  }, [error]);

  useEffect(() => {
    if (success) showToast({ type: "success", message: success });
  }, [success]);

  return null;
}

export default StatusIndicator;
