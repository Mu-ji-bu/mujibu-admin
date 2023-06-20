import { Outlet, Link } from 'react-router-dom';
import { Component, useRef } from 'react';

const Navigation = () => {
  const headerRef = useRef(null);
  return (
    <>
      <header ref={headerRef} className="border-0 border-b border-solid border-secondary-10">
        <div className="max-w-screen-xl mx-auto px-5 py-2 flex justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <div className="logo w-[128px] h-[48px]">
              <Link className="logo-container" to="/">
                <img src="/logo@2x.png" alt="募質部" />
              </Link>
            </div>
            <div className="links-container">
              <Link className="nav-link" to="/login">
                登入
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Navigation;
