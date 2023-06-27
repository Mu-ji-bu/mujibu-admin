import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../libraries/utils/firebase.utils';
import { UserCredential } from 'firebase/auth';
import FormInput from '../form-input/form-input';

const defaultFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);
      const { user } = response as UserCredential;
      await createUserDocumentFromAuth(user, { displayName: name });
      resetFormFields();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>Sign up with your email and password</h2>
      <form onSubmit={handleSubmit}>
        <FormInput label="名稱" type="text" name="name" id="name" required onChange={handleChange} value={name} />

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

        <FormInput
          label="確認密碼"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        />

        <button type="submit">註冊</button>
      </form>
    </div>
  );
};

export default SignInForm;
