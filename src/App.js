import { useContext } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { LoginContext } from './contexts/LoginContextProvider';
import Chat from './page/Chat';
import Login from './page/Login';

function App() {

  const { isLogin } = useContext(LoginContext);

  return (
    <BrowserRouter>
      <Routes>
      { isLogin ? (
        <>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Chat />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
