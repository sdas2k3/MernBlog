/* eslint-disable no-unused-vars */
import TopBar from './components/topbar/TopBar.jsx'
import { HomePage } from './pages/homepage/HomePage.jsx';
import Single from './pages/single/Single.jsx';
import Write from './pages/write/Write.jsx';
import Settings from './pages/settings/Settings.jsx';
import Login from './pages/login/Login.jsx';
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route,Routes,Link} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context.jsx';

function App() {
  const {user} = useContext(Context);
  return (
    <>
      <Router>
        <TopBar/>
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="/posts" element={<HomePage />}/>
          <Route path="/register" element={user ? <HomePage /> : <Register />} />
          <Route path="/login" element={user ? <HomePage /> : <Login />}/>
          <Route path="/post/:id" element={<Single/>}/>
          <Route path="/write" element={user ? <Write /> : <Login />}/>
          <Route path="/settings" element={user ? <Settings /> : <Login />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
