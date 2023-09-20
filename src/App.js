import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './components/LoginPage/Login';
import Signup from './components/SignupPage/Signup';
import Home from './components/Home/Home';
import SetDisplay from './components/SetDisplayPage/SetDisplay';
import Written from './components/WrittenPage/Written';
import CopyArea from './components/CopyAreaPage/CopyArea';
import Matching from './components/MatchingPage/Matching';
import EditPage from './components/EditPage/EditPage';
import Learn from './components/LearnPage/Learn';
import TestPage from './components/TestPage/TestPage';
function App() {
  const editMode = {
    editSetMode: 0,
    addSetMode: 1
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home/SetDisplay" element={<SetDisplay/>}/>
          <Route path="/home/SetDisplay/written" element={<Written/>}/>
          <Route path="/home/SetDisplay/copy" element={<CopyArea />}/>
          <Route path="/home/SetDisplay/matching" element={<Matching/>}/>
          <Route path="/home/setDisplay/learn" element={<Learn/>}/>
          <Route path="/home/setDisplay/test" element={<TestPage/>}/>
          <Route path="/home/setDisplay/edit" element={<EditPage mode={editMode.editSetMode} modeEnum={editMode} />}/>
          <Route path="/home/add" element={<EditPage mode={editMode.addSetMode} modeEnum={editMode}/>}/>


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
