import './components/Home'
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Weather from './components/Weather';
import Layout from './components/Layout';
import Converter from './components/Converter';
import SingUp from './components/SignUp';
import SingIn from './components/SignIn';
import Cookies from 'js-cookie';
import NotFound from './components/NotFound';
import Task from './components/Task';

function App() {

  function ProtectedRoute({ children }: { children: JSX.Element }) {
    let location = useLocation();

    if (!Cookies.get('access_token')) {
      return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<SingIn />} />
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            }
          />
          <Route path='/weather' element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
            }
          />
          <Route path='/converter' element={
            <ProtectedRoute>
              <Converter />
            </ProtectedRoute>
            }
          />
          <Route path='/task' element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
            }
          />
          <Route path='/signup' element={<SingUp />} />
          <Route path='*' element={<NotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
