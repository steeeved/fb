import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { MainPage, Error, Login, CreatePost } from './Pages';
import { NavBar } from './Components';
import './App.css';

function App() {
  const [logged, setLogged] = useState(false);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </div>
  );
}

export default App;
