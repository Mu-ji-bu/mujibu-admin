import { Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user.context';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
    return () => {};
  }, [currentUser]);

  return (
    <>
      <Typography component="h1" variant="h1" className="text-primary">
        大廳
      </Typography>
    </>
  );
};

export default Dashboard;
