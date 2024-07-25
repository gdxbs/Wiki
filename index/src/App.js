
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login/login'
import Register from './pages/register/register'
import About from './pages/about/about'
import Create from './pages/workshop/create/create'
import Edit from './pages/workshop/edit/edit'
import Menu from './pages/menu/menu'
import Workshop from './pages/workshop/workshop'
import AboutUser from './pages/aboutuser/aboutuser';
import Account from './pages/account/account';
import MenuUser from './pages/menuuser/menuuser';
import WikiPage from './pages/wikipage/wikipage';
import WikiPageUser from './pages/wikipageuser/wikipageuser';


function App() {
  return (
  <Router>
  <Routes>
      <Route index element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/workshop/create" element={<Create />} />
      <Route path="/workshop/edit/:id" element={<Edit />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/workshop" element={<Workshop />} />
      <Route path="/aboutuser" element = {<AboutUser />} />
      <Route path="/menuuser" element={<MenuUser />} />
      <Route path="/account" element={<Account />} /> 
      <Route path="/wikipage/:id" element={<WikiPage />} />
      <Route path="/wikipageuser/:id" element={<WikiPageUser />} />


    
  </Routes>
</Router>
  );
}

export default App;