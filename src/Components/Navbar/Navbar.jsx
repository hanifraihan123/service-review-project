import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {

  const {user,logOut} = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
    .then(()=>{
      toast.success('Logout Successfully')
    })
    .catch(error=>{
      toast.error(error.message)
    })  
  }

    return (
        <div className="navbar bg-gradient-to-r from-purple-500 to-pink-500">
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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/service">Services</NavLink>
      </ul>
    </div>
    <img className="h-12 w-12 rounded-full" src="https://i.ibb.co.com/6mcCmGK/verified-reviews-vector-icons-logo-trust-badges-images-526569-1300.jpg" alt="" />
    <h3 className="ml-4 font-bold text-2xl">Service Review</h3>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal flex gap-3 px-1">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/service">Services</NavLink>
      {
        user && <><NavLink to="/addService">Add Service</NavLink> <NavLink to="/myReviews">My Reviews</NavLink> </>
      }
    </ul>
  </div>
  <div className="navbar-end">
   {
    user? <div className="flex gap-2 items-center"><img className="h-12 w-12 rounded-full" src={user?.photoURL} alt="" /> <button onClick={handleLogout} className="btn">Logout</button></div>  : 
    <div className="flex gap-2 items-center"><Link to="login"><button className="btn">Login</button></Link>
   <Link to="register"><button className="btn">Register</button></Link></div>
   }
  </div>
</div>
    );
};

export default Navbar;