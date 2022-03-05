import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Error, Form, FormButton, Input, Spinner, Wrapper } from '../../utils/widgets';
import { LoginRequest, useLoginMutation } from './auth.service';
import { setCredentials, useAuth } from './authSlice';

export default function Login() {
  const [formState, setFormState] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState();

  useEffect(() => {
    document.title = 'Login';
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const isInvalid = !formState.password || !formState.email;

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formState).unwrap();
      dispatch(setCredentials(user));
      navigate('/');
    } catch (e: any) {
      console.log('Login error:', e);
      setError(e.data.error);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={formState.email}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Enter your password'
          value={formState.password}
          onChange={handleChange}
        />
        <FormButton disabled={isInvalid || isLoading}>
          {isLoading && <Spinner />} <span>Login</span>
        </FormButton>
        {error && <Error>{error}</Error>}
      </Form>
    </Wrapper>
  );
}
