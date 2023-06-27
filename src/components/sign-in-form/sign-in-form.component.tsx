import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from '../../libraries/utils/firebase.utils';
import { UserCredential } from 'firebase/auth';
import FormInput from '../form-input/form-input';

import { UserContext } from '../../contexts/user.context';
import { Button } from '@mui/material';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // google 第三方登入，而目前使用 email password 登入
  // const signInWithGoogle = async () => {
  //   const { user } = await signInWithGooglePopUp();
  //   await createUserDocumentFromAuth(user);
  // }

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(response?.user);
      resetFormFields();
    } catch (error: any) {}
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser]);

  return (
    <div>
      <h2>使用 Email 和密碼進行登入</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="信箱" type="email" name="email" id="email" required onChange={handleChange} value={email} />

        <FormInput
          label="密碼"
          type="password"
          name="password"
          id="password"
          required
          onChange={handleChange}
          value={password}
        />
        <Button type="submit" variant="contained" size="small">
          登入
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
