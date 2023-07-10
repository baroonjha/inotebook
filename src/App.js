
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route }  from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

function App(props) {
  return (
<Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  
 
</Router>
   
  );
}

export default App;
