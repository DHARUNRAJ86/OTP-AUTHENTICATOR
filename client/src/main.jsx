import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";


export const Context = createContext({
     isAuthenticated : false,
     setIsAuthenticated : ()  =>{},
     user:null,
     setUser:() =>{}
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
