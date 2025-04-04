import {Link, useNavigate} from '@tanstack/react-router';
import {FC, useState} from 'react';
import {PageContainer} from 'src/frontend/components/layout/PageContainer/PageContainer';

export const RegistrationPage: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const register = () => {
    navigate({to: '/'});
  };

  return (
    <PageContainer>
      <div>
        <label>Name:</label>
        <div>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
        </div>
        <label>Email:</label>
        <div>
          <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <label>Password:</label>
        <div>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <label>Password Again:</label>
        <div>
          <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} />
        </div>
        <div style={{marginTop: 20}}>
          <button onClick={register}>Register</button>
          <Link to="/auth/login" style={{marginLeft: 20}}>Sign in</Link>
        </div>
      </div>
    </PageContainer>
  );
};
