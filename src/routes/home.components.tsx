import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Typography component="h1" variant="h1" className="text-primary">
        募質部 ADMIN
      </Typography>
    </>
  );
};

export default Home;
