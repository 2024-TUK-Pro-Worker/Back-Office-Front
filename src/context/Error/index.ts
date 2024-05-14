import React from "react";

export const ErrorContext = React.createContext<any>(null);

export function useErrorContext() {
  return React.useContext(ErrorContext);
}
