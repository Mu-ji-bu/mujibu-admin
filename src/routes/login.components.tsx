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
import SignInForm from '../components/sign-in-form/sign-in-form.component';

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
    await createUserDocumentFromAuth(user);
  };

  return (
    <main className="flex flex-col items-center">
      <h1>登入頁</h1>
      {/* <Button variant="contained" size="small" onClick={logGoogleUser}>
        Popup
      </Button>
      <div className="w-1/2">
        <SignUpForm />
      </div> */}
      <div className="w-1/2">
        <SignInForm />
      </div>
      {/* <Button variant="contained" size="small" onClick={signInWithGoogleRedirect}>
        redirect
      </Button> */}
    </main>
  );
};

export default LogIn;
