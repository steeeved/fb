import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import { MainPage, Error, Login, CreatePost } from './Pages';
import { NavBar } from './Components';
import './App.css';

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <div className='App'>
      <Router>
        <NavBar isLogged={logged} setLogged={setLogged} />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route
            path='/login'
            element={<Login isLogged={logged} setLogged={setLogged} />}
          />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
