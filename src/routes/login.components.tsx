import { useEffect } from 'react';

import { Button } from '@mui/material';
import {
  auth,
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from '../libraries/utils/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../components/sign-up-form/sign-up-form.component';

const LogIn = () => {
  // useEffect(() => {
  //   const getUser = async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //     if (response) {
  //       const { user } = response;
  //       const userDocRef = await createUserDocumentFromAuth(user);
  //     }
  //   };
  //   getUser();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <h1>登入頁</h1>
      <Button variant="contained" size="small" onClick={logGoogleUser}>
        Popup
      </Button>
      <SignUpForm />
      {/* <Button variant="contained" size="small" onClick={signInWithGoogleRedirect}>
        redirect
      </Button> */}
    </>
  );
};

export default LogIn;
