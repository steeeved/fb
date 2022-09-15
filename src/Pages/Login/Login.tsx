import { auth, provider } from '../../Config/Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ILogged } from '../../Elements/types';

const Login = (props: ILogged) => {
  const { setLogged } = props;
  const navigate = useNavigate();
  setLogged(false);
  
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate('/');
    setLogged(true);
  };

  return (
    <div>
      <h1>This is the login PAGE</h1>
      <p>Sign in with Google</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  );
};

export default Login;
