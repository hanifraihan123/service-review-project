import Lottie from "lottie-react";
import login from "../../assets/login.json"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from 'react-hot-toast';
import axios from "axios";


const Login = () => {

  const {userLogin,logInWithGoogle} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

        if(!regex.test(password)){
          toast.error("Password should be at least one uppercase, one lowercase, 6 or more character");
          return;
        }    

        userLogin(email, password)
        .then(result=>{
          if(result.user){
            toast.success('Login Succesfully')
            navigate(location.state || '/')
          }
        })
        .catch(error=>{
          toast.error(error.message)
        })
  }

  const handleGoogle = () => {
    logInWithGoogle()
    .then(result=>{
      if(result.user){
        toast.success('Login Succesfully')
        navigate(location.state || '/')
      }
    })
    .catch(error=>{
      toast.error(error.message)
    })
  }

    return (
        <div className="flex gap-4 mx-auto items-center justify-center bg-emerald-200 w-full px-4">
            <div className="lg:py-10 md:py-6 py-2 px-4">
                <Lottie animationData={login}></Lottie>
            </div>
            <div className="w-1/2 py-4">
            <form onSubmit={handleSubmit} className="card-body bg-emerald-400 rounded-lg">
            <h4 className="text-2xl font-bold text-center">Login now!</h4>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
            <div className="text-center space-y-2 mt-4">
            <button onClick={handleGoogle} className="btn btn-secondary">Login With Google</button>
            <p className="text-center">Create a account ? Please <Link to="/register"><span className="text-red-600">Register</span></Link></p>
            </div>
            </div>
        </div>
    );
};

export default Login;