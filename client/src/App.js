import './App.css';
import LandingPage from './view/landing/LandingPage';
import Home from './view/home/Home';
import { Route , Routes, useLocation } from "react-router-dom";
import CreatePoke from './componentes/createPoke/CreatePoke';
import Detail from './view/detail/Detail';
import Nav from './componentes/navBar/Nav';
import About from './view/about/About';
import NotFound from './view/notFound/NotFound';

function App() {
  const location = useLocation();
    return(
    <div>
      {location.pathname !== "/" && <Nav/>}
      
      <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/pokemons' element={<CreatePoke/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='*' element={<NotFound />} />
      </Routes>
      
    </div>
  );
}

export default App;
