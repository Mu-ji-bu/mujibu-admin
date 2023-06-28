import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mt-8">
      <Typography component="h1" variant="h1" className="text-primary flex justify-center">
        募質部 ADMIN
      </Typography>{' '}
    </div>
  );
};

export default Home;
