import {Link, useNavigate} from '@tanstack/react-router';
import {CSSProperties, MouseEventHandler, useContext} from 'react';
import {AuthContext} from '../AuthProvider/AuthContext';

export function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const style: CSSProperties = {
    background: 'rgba(15, 18, 20, 0.6)',
    height: '62.5px',
    lineHeight: '62.5px',
    top: '0px',
    left: '0px',
    color: 'white',
    position: 'fixed',
    width: '100%',
    backdropFilter: 'blur(8px)',
    textAlign: 'center',
    fontSize: '18px',
    fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    borderBottom: '1px solid rgba(61, 71, 81, 0.3)',
    zIndex: 1,
  };
  const aStyle: CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    margin: '0px 10px',
  };
  const logout: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    auth.logout();
    navigate({to: '/'});
  };
  return <div style={style}>
    {<Link to="/" style={aStyle}>Home</Link>}
    {auth.user && <Link to="/feed" style={aStyle}>My Feed</Link>}
    {auth.user && <Link to="/workouts" style={aStyle}>Workouts</Link>}
    {auth.user && <Link to="/exercises" style={aStyle}>Exercise Library</Link>}
    {auth.user && <Link to="/" onClick={logout} style={aStyle}>Logout</Link>}
    {!auth.user && <Link to="/auth/login" style={aStyle}>Login</Link>}
  </div>;
}
