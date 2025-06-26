import { AlertProvider } from "./Components/Notifications/AlertProvider"
import Layout from "./Layouts/AppBarLayout"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasicListPage from "./Pages/BasicListPage";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, greenTheme } from "./Style/Themes/GreenTheem";

function App() {
  const [useGreen, setUseGreen] = useState(true);

  return (
    <ThemeProvider theme={useGreen ? greenTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <AlertProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<BasicListPage />} />
            </Routes>
          </Layout>
        </AlertProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
