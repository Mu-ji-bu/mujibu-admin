import { Routes, Route } from 'react-router-dom';
import Dashboard from './routes/dashboard.components';
import Home from './routes/home.components';
import LogIn from './routes/login.components';
import Navigation from './routes/navigation.component';
import SignUp from './routes/signup.components';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
