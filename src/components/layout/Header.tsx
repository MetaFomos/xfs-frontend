import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/actions";
import { Navigate } from "react-router-dom";
import logoImg from '../../assets/imgs/logo.png';

interface IHeaderProps {}

export const Header: React.FC<IHeaderProps> = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const { role } = useSelector((state: any) => state.auth.user);
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="navbar bg-base-200">
      <ToastContainer />
      <div className="container mx-auto">
        <div className="w-[40%]">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {isAuthenticated && (
                <>
                  <li>
                    <Link to="/completed">Completed</Link>
                  </li>
                  <li>
                    <Link to="/inprogress">In progress</Link>
                  </li>
                  <li>
                    <Link to="/fundrequired">Fund Required</Link>
                  </li>
                  {role === "1" && (
                    <li>
                      <Link to="/proposed">Proposed</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/approved">Approved</Link>
                  </li>
                  {role === "1" && (
                    <li>
                      <Link to="/pending">Pending</Link>
                    </li>
                  )}
                  {role === "1" && (
                    <li>
                      <Link to="/createidea">Create Idea</Link>
                    </li>
                  )}
                </>
              )}

              {/* <li tabIndex={0}>
                            <a className="justify-between">
                                Parent
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                            </a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li> */}
            </ul>
          </div>
          <Link to="/dashboard" className="btn btn-ghost normal-case text-xl bold">
            <img src={logoImg} style={{ width: '30px', height: '30px' }} /> &nbsp;
            XFS : XDAG Funding System
          </Link>
        </div>
        <div className="w-[60%] hidden md:flex justify-around">
          <ul className="menu menu-horizontal p-0">
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/createidea">Create Idea</Link>
                </li>
                {role === "1" && (
                  <li>
                    <Link to="/pending">Pending</Link>
                  </li>
                )}
                <li>
                  <Link to="/approved">Approved</Link>
                </li>
                {role === "1" && (
                  <li>
                    <Link to="/proposed">Proposed</Link>
                  </li>
                )}
                <li>
                  <Link to="/fundrequired">Fund Required</Link>
                </li>
                <li>
                  <Link to="/inprogress">In progress</Link>
                </li>
                <li>
                  <Link to="/completed">Completed</Link>
                </li>
              </>
            )}

            {/* <li tabIndex={0}>
                            <a>
                                Parent
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                            </a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li> */}
          </ul>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {isAuthenticated ? (
                  <img src="/assets/img/default_avatar.png" />
                ) : (
                  <img src="/assets/img/defualt_avatar1.png" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to={"/profile"}>
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <span onClick={() => onLogout()}>Logout</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signin">SignIn</Link>
                  </li>
                  <li>
                    <Link to="/signup">SignUp</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
