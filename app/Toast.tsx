"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mdiAlertCircle, mdiCheckCircle, mdiClose } from "@mdi/js";
import Icon from "./Icon";

export type ToastData = { type: "success" | "error"; title: string; message?: string };

/** Lightweight toast: `const { toast, show, dismiss } = useToast()` + `<Toast toast={toast} onClose={dismiss} />`. */
export function useToast(duration = 5000) {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const dismiss = useCallback(() => setToast(null), []);
  const show = useCallback(
    (t: ToastData) => {
      clearTimeout(timer.current);
      setToast(t);
      timer.current = setTimeout(() => setToast(null), duration);
    },
    [duration],
  );

  useEffect(() => () => clearTimeout(timer.current), []);
  return { toast, show, dismiss };
}

export function Toast({ toast, onClose }: { toast: ToastData | null; onClose: () => void }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 sm:bottom-auto sm:top-20 sm:justify-end"
    >
      {toast && (
        <div
          role={toast.type === "error" ? "alert" : "status"}
          className={`toast-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border bg-surface-high p-4 shadow-2xl shadow-black/40 ${
            toast.type === "success" ? "border-success/40" : "border-error/40"
          }`}
        >
          <span className={toast.type === "success" ? "text-success" : "text-error"}>
            <Icon path={toast.type === "success" ? mdiCheckCircle : mdiAlertCircle} />
          </span>
          <div className="flex-1">
            <p className="font-extrabold">{toast.title}</p>
            {toast.message && <p className="mt-0.5 text-sm text-dim">{toast.message}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="rounded-lg p-1 text-muted transition hover:bg-white/5 hover:text-white"
          >
            <Icon path={mdiClose} className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
