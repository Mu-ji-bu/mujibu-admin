import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../libraries/utils/firebase.utils';
import { UserCredential } from 'firebase/auth';

const defaultFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
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
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">名稱</label>
        <input type="text" name="name" id="name" required onChange={handleChange} value={name} />

        <label htmlFor="email">信箱</label>
        <input type="email" name="email" id="email" required onChange={handleChange} value={email} />

        <label htmlFor="password">密碼</label>
        <input type="password" name="password" id="password" required onChange={handleChange} value={password} />

        <label htmlFor="confirmPassword">確認密碼</label>
        <input
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

export default SignUpForm;
