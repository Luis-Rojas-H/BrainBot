import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import Examen from './pages/Examen';
import Preguntas from './pages/Preguntas'
import { AppContextProvider } from "./AppContext";


function App() {
  
  return (
    <div className="App">
      <Router>
        <AppContextProvider>
            <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/examen" element={<Examen />} />
              <Route path="/preguntas" element={<Preguntas />} />
            </Routes>
          </AppContextProvider>
        </Router>

    </div>
  );
}

export default App;
