import { Outlet, Link } from 'react-router-dom';
import { Component, useRef, useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import { signOutUser } from '../libraries/utils/firebase.utils';
import { Button } from '@mui/material';

const Navigation = () => {
  const headerRef = useRef(null);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
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
            {currentUser ? (
              <Button variant="outlined" onClick={signOutHandler}>
                登出
              </Button>
            ) : (
              // <span className="" onClick={signOutHandler}>
              //   登出
              // </span>
              <div className="links-container">
                <Button variant="outlined" color="secondary" className="ml-5">
                  <Link className="nav-link visited:text-black" to="/login">
                    登入
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Navigation;
