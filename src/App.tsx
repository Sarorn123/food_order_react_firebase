import { FC } from "react";
import SingIn from "./components/auth/SingIn";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./components/homePage/HomePage";
import SignUp from "./components/auth/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import ThemeContextProvider from "./context/themeContext";
import AuthContextProvider from "./context/authContext";

const App: FC = () => {
  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/auth/signin" element={<SingIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Routes>
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
