import { createContext, useState, useContext } from "react";

interface Value {
  theme: string;
  primaryColor: string;
  updateTheme: (colorCode: string) => void;
  updatePrimaryColor: any;
}

const ThemeContext = createContext<Value | null>(null);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("#395B64");
  const [primaryColor, setPrimaryColor] = useState<string>("green-500");

  const updateTheme = (colorCode: string) => {
    setTheme(colorCode);
  };

  const updatePrimaryColor = (colorCode: string) => {
    setPrimaryColor(colorCode);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, primaryColor, updateTheme, updatePrimaryColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
