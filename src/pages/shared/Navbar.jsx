import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg"
import { useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth()
  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
  })
  return () => unsubscribe();
  }, [auth]);
  

  const handleLogout = () => {
    signOut(auth)  
      .then(() => {
        setIsLoggedIn(false); // Set login status to false after logout
        navigate("/login"); 
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };
  const linksBeforeLogin = (
    <>
      <li><Link to="/" className="text-lg">Home</Link></li>
      <li><Link to="/marathon" className="text-lg">Marathons</Link></li>
      
    </>
  );

  const linksAfterLogin = (
    <>
      <li><Link to="/" className="text-lg">Home</Link></li>
      <li><Link to="/marathon" className="text-lg">Marathons</Link></li>
      <li tabIndex={0} className="relative group">
        <Link to="/dashboard" className="text-lg">
          Dashboard
        </Link>
        <ul
          className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg z-10 p-2 w-40"
          style={{ top: "100%", left: "0" }}
        >
          <li>
            <Link to="/dashboard/addmara" className="block px-4 py-2 hover:bg-gray-100">
              Add Marathon
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-list" className="block px-4 py-2 hover:bg-gray-100">
              My List
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
    return (
        <div className="navbar shadow border rounded-t-lg mb- bg-gradient-to-r from-white via-blue-200 to-black ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {user ? linksAfterLogin : linksBeforeLogin}
        </ul>
    </div>
    <a className="btn btn-ghost text-2xl font-extrabold"><img src={logo} alt="" className="w-20 h-[50px]"/>Maraventure</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {user ? linksAfterLogin : linksBeforeLogin}
    </ul>
  </div>
  <div className="gap-2 navbar-end">
  {user ? (
            <div className="flex items-center gap-2">
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border border-gray-300"
                  title={user.displayName} // Show name on hover
                />
                <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded shadow-lg top-12">
                  {user.displayName}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-primary bg-red-600 text-white px-4"
              >
                Log Out
              </button>
              </div>
          ) : (
            <div className="flex gap-3">
                <NavLink to="/login" className="btn bg-gray-800 text-white">
              Login
            </NavLink>
            <NavLink to="/register" className="btn bg-gray-800 text-white">
              Register
            </NavLink>
            </div>
        
  ) }
    
  </div>
</div>
    );
};

export default Navbar;
