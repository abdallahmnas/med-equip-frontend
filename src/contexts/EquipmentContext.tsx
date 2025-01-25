import React, { createContext, useContext, useState } from "react";
// import { login } from '../services/auth.service'; // Function to handle login

interface AuthContextProps {
  equipment: any;
  setEquipment: any;
}

const EquipmentContext = createContext<AuthContextProps | undefined>(undefined);

export const EquipmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [equipment, setEquipment] = useState<any>(null);

  return (
    <EquipmentContext.Provider value={{ equipment, setEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = (): AuthContextProps => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error("useEquipment must be used within an EquipmentProvider");
  }
  return context;
};
