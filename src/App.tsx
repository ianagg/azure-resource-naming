import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter as StaticRouter, Route, Routes } from 'react-router-dom';
import Documentation from './pages/Documentation';

const { REACT_APP_VERSION } = process.env;

function App() {
  return (
    <StaticRouter basename="/azure-resource-naming">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
        <Footer version={REACT_APP_VERSION} />
      </div>
    </StaticRouter>
  );
}

export default App;
