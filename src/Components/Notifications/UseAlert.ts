import { useContext } from "react";
import { AlertContext } from "./AlertProvider";

export const useAlert = ()=>{
  const context = useContext(AlertContext);
    if (!context) {
      throw new Error("useAlert must be used within a AlertProvider");
    }
    return context;
}