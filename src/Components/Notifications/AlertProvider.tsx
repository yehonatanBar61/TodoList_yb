import { Fade } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { createContext, useEffect, useState, type ReactNode } from "react";

type AlertType = 'Success' | 'Error' | 'Warning';

type Alert = {
    id: number;
    type : AlertType;
    message : string;
}

type AlertContext = { // describes what the context will provide (what functions)
    showAlert : (type: AlertType, message : string) => void;
}

type AlertContextProvider = { //the expected props
  children: ReactNode;
};

/**
 * creating a React Context called AlertContext 
 * with a default (empty) implementation of showAlert
 */
export const AlertContext = createContext<AlertContext>({
  showAlert: () => {},
});

export const AlertProvider: React.FC<AlertContextProvider> = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState<Alert[]>([]);

  const hideAlert = (index: number) => {
    setAlertMessage((prev) => prev.filter((_, i) => i != index));
  };

  const contextValue: AlertContext = {
    showAlert: (type, message) => {
      const id = Date.now();
      const alertMessage: Alert = {
        id,
        type,
        message,
      };
      setAlertMessage((prev) => {
        let updated = [...prev];
        if(prev.length > 1){
          updated.pop();
          updated.unshift(alertMessage);
          console.log(updated);
        }else{
          updated = [alertMessage, ...prev];
        }
        
        return updated;
      });

      setTimeout(() => {
        setAlertMessage((prev) => prev.filter((alert) => alert.id !== id));
      }, 3000)
    }
  };

  return (
    <AlertContext.Provider value={contextValue}>
      <div
        style={{
          position: 'fixed',
          top: 65,
          right: 20,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '300px',
        }}
      >
        {alertMessage.map((alert, index) => (
        <Fade in={true} timeout={500}>
          <Alert
            key={index}
            onClose={() => hideAlert(index)}
          >
            <div>{alert.message}</div>
          </Alert>
        </Fade>
        ))}
      </div>
      {children}
    </AlertContext.Provider>
  );
};