import {Link} from '@tanstack/react-router';
import {CSSProperties} from 'react';

export function Header() {
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
  return <div style={style}>
    <Link to="/" style={aStyle}>Home</Link>
  </div>;
}
