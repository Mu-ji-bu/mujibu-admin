import { Routes, Route } from 'react-router-dom';
import Home from './routes/home.components';
import LogIn from './routes/login.components';
import Navigation from './routes/navigation.component';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />} />
      </Route>
    </Routes>
  );
};

export default App;
