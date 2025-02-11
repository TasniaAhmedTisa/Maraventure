import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const {user, signOutUser} = useContext(AuthContext)
  //const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  

  const handleLogout = () => {
    signOutUser()  
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
      <li><Link to="/" className="text-lg text-white">Home</Link></li>
      <li><Link to="/marathon" className="text-lg text-white">Marathons</Link></li>
      <li><Link to="/contact" className="text-lg text-white">Contact Us</Link></li>
      <li><Link to="/FAQs" className="text-lg text-white">FAQ's</Link></li>


      
    </>
  );

  const linksAfterLogin = (
    <>
      <li><Link to="/" className="text-lg text-white">Home</Link></li>
      <li><Link to="/marathon" className="text-lg text-white">Marathons</Link></li>
      <li><Link to="/contact" className="text-lg text-white">Contact Us</Link></li>
      <li><Link to="/FAQs" className="text-lg text-white">FAQ's</Link></li>


      <li>
        <Link to="/dashboard" className="text-lg text-white">
          Dashboard
        </Link>
        
      </li>

    </>
  );
    return (
        <div className="navbar sticky top-0 z-50 shadow border  bg-gradient-to-r from-sky-500 to-black px-8">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle gap-1 lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-white"
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
        className="menu menu-sm dropdown-content bg-current rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {user ? linksAfterLogin : linksBeforeLogin}
        </ul>
    </div>
    <Link to="/" className="text-2xl font-extrabold text-white">Maraventure</Link>
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
                className="btn bg-red-300 text-black px-4"
              >
                Log Out
              </button>
              </div>
          ) : (
            <div className="flex gap-3">
                <NavLink to="/login" className="btn bg-red-200 text-black">
              Login
            </NavLink>
            <NavLink to="/register" className="btn bg-red-200 text-black">
              Register
            </NavLink>
            </div>
        
  ) }
    
  </div>
</div>
    );
};

export default Navbar;
