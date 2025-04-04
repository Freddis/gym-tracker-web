import {useMutation} from '@tanstack/react-query';
import {Link, useNavigate} from '@tanstack/react-router';
import {FC, useContext, useState} from 'react';
import {AuthContext} from 'src/frontend/components/layout/AuthProvider/AuthContext';
import {PageContainer} from 'src/frontend/components/layout/PageContainer/PageContainer';
import {postAuthLoginMutation} from 'src/frontend/openapi-client/@tanstack/react-query.gen';

export const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const mutation = useMutation({...postAuthLoginMutation()});
  const login = async () => {
    const result = await mutation.mutateAsync({
      body: {
        email,
        password,
      },
    });
    auth.login(result);
    navigate({to: '/feed'});
  };
  return (
    <PageContainer>
      <div>
        <label>Email:</label>
        <div>
          <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <label>Password:</label>
        <div>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
        </div>
        <div style={{marginTop: 20}}>
          <button onClick={login}>Login</button>
          <Link to="/auth/register" style={{marginLeft: 20}}>Register</Link>
        </div>
      </div>
    </PageContainer>
  );
};
