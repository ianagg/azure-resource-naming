import Navbar from './components/Navbar';
import Home from './pages/Home';
import {BrowserRouter as StaticRouter, Route, Routes } from 'react-router-dom';
import Documentation from './pages/Documentation';

function App() {
  return (
    <StaticRouter basename="/azure-resource-naming">
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/docs" element = {<Documentation />}/>
      </Routes>
    </div>
    </StaticRouter>
  );
}

export default App;
