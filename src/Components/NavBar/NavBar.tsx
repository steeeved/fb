import { Link } from 'react-router-dom';
import { auth } from '../../Config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { ILogged } from '../../Elements/types';

import Styles from './NavBar.module.scss';

const NavBar = (props: ILogged) => {
  const { isLogged, setLogged } = props;
  const [user, loading, error] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
    setLogged(false);
  };

  return (
    <div className={Styles.navBar}>
      <div className={Styles.user}>
        <p>{isLogged && user?.displayName}</p>
      </div>

      <div className={Styles.right}>
        <div className={Styles.links}>
          <Link to='/' className={Styles.button}>
            Home
          </Link>
          {isLogged && (
            <Link to='/createpost' className={Styles.button}>
              Create Post
            </Link>
          )}
          {isLogged ? (
            <Link to='/' onClick={handleSignOut} className={Styles.button}>
              Log Out
            </Link>
          ) : (
            <Link to='/login' className={Styles.button}>
              Login
            </Link>
          )}
        </div>
        <div className={Styles.info}>
          {isLogged && (
            <img src={user?.photoURL || ''} className={Styles.image} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
