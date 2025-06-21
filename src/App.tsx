import { AlertProvider } from "./Components/Notifications/AlertProvider"
import Layout from "./Components/AppBarLayout"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasicListPage from "./Pages/BasicListPage";

function App() {
  return (
    <Router>
      <AlertProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<BasicListPage />} />
          </Routes>
        </Layout>
      </AlertProvider>
    </Router>
  )
}

export default App
