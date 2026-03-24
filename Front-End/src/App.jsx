import { useEffect } from "react";
import gsap from "gsap"
import "./App.css";
import { Approutes } from "./routes/Approutes";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getThemeByUserId } from "./Redux/Slice/themeSlice";
import { CreateThemeMaterial } from "./Services/CreateMaterialTheme";
import { useAppTheme } from "./Context/ThemeContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { applyTheme } from "./Services/applyTheme";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const dispatch = useDispatch()
 const{ theme }  = useAppTheme()
 const muiTheme =CreateThemeMaterial(theme)
const {user} = useSelector((state)=>state.auth);
  console.log(theme,"App component")
  useEffect(() => {

     const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    applyTheme(JSON.parse(savedTheme));
  } else {
     dispatch(getThemeByUserId(user?._id))
  }
   
    gsap.utils.toArray(".btn-theme").forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    });
  }, []);


  // if(!theme) return null

  return (
    
        <DndProvider backend={HTML5Backend}>

    <ThemeProvider theme={muiTheme}>
    <CssBaseline/>
      <Approutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
       
       

      />
      </ThemeProvider>
        </DndProvider>
   
  );
}

export default App;
