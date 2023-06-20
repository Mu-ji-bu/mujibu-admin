import { Button } from '@mui/material';
import { signInWithGooglePopUp } from '../libraries/utils/firebase.utils';

const LogIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopUp();
    console.log(response);
  };
  return (
    <>
      <div>Sign In!</div>
      <Button variant="contained" size="small" onClick={logGoogleUser}>
        small按鈕
      </Button>
      <button onClick={logGoogleUser}>Sign in with Google!</button>
    </>
  );
};

export default LogIn;
