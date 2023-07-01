import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Login from '../src/components/Login.js'
import Signup from './components/Signup';
import Home from './components/Home/Home';


import SetDisplay from './components/SetDisplay';
import Written from './components/Written';
import Learn from './components/Learn';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>root</h1>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/home/SetDisplay" element={<SetDisplay />}/>
          {/* <Route path="/home/SetDisplay/learn" element={<Learn />}/> */}
          <Route path="/home/SetDisplay/learn/written" element={<Written />}/>
          <Route path="/home/setDisplay/learn" element={<Learn />}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
