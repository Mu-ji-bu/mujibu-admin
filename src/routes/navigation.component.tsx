import { Outlet, Link } from 'react-router-dom';
import { Component } from 'react';

const Navigation = () => {
  return (
    <>
      <div className="flex justify-between w-40">
        <Link className="logo-container" to="/">
          <div>LOGO</div>
        </Link>
        <div className="links-container">
          <Link className="nav-link" to="/">
            登入
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
