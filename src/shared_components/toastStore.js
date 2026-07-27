const TOAST_DURATION = 3600;
const listeners = new Set();
const timers = new Map();

let toasts = [];
let lastToast = { type: "", message: "", timestamp: 0 };

const emit = () => {
  listeners.forEach((listener) => listener());
};

export const subscribeToToasts = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getToastSnapshot = () => toasts;

export const dismissToast = (id) => {
  if (timers.has(id)) {
    window.clearTimeout(timers.get(id));
    timers.delete(id);
  }

  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
};

export const showToast = ({ type = "info", message, duration = TOAST_DURATION }) => {
  if (!message) return null;

  const now = Date.now();
  if (
    lastToast.type === type &&
    lastToast.message === message &&
    now - lastToast.timestamp < 300
  ) {
    return null;
  }

  lastToast = { type, message, timestamp: now };

  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${now}-${Math.random().toString(16).slice(2)}`;

  toasts = [...toasts, { id, type, message }].slice(-4);
  emit();

  if (duration > 0) {
    timers.set(
      id,
      window.setTimeout(() => dismissToast(id), duration),
    );
  }

  return id;
};
