import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// PAGES
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/User/Profile';
import MyPets from './pages/Pet/MyPets';
import AddPet from './pages/Pet/AddPet';
import EditPet from './pages/Pet/EditPet';
import PetDetails from './pages/Pet/PetDetails';
import MyAdoptions from './pages/Pet/MyAdoptions';

// COMPONENTS
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message'

// CONTEXT
import { UserProvider } from './context/UserContext';








function App() {

  return (
   <Router>
    <UserProvider>
      <Routes>   
      </Routes>
        <Navbar/>
        <Message/>
        <Container>
            <Routes>
                <Route path='/login' Component={Login}/>
                <Route path='/register' Component={Register}/>
                <Route path='/user/profile' Component={Profile}/>
                <Route path='/pet/mypets' Component={MyPets}/>
                <Route path='/pet/add' Component={AddPet}/>
                <Route path='/pet/edit/:id' Component={EditPet}/>
                <Route path='/pet/:id' Component={PetDetails}/>
                <Route path='/pet/myadoptions' Component={MyAdoptions}/>
                <Route path='/' Component={Home}/>
            </Routes>
          </Container>
        <Footer/>
    </UserProvider>
   </Router>
  );
}

export default App;
