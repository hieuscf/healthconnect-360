import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React from "react";

// Provider để wrap app
export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    autoHideDuration={3000}
  >
    {children}
  </SnackbarProvider>
);

// Hàm tiện ích gọi snackbar
export const notify = {
  success: (message: string) =>
    enqueueSnackbar(message, { variant: "success" }),
  error: (message: string) =>
    enqueueSnackbar(message, { variant: "error" }),
  info: (message: string) =>
    enqueueSnackbar(message, { variant: "info" }),
  warning: (message: string) =>
    enqueueSnackbar(message, { variant: "warning" }),
};
