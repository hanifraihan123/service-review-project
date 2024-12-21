import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import register from "../../assets/register.json"


const Register = () => {

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo, email, password)
  }

    return (
        <div className="flex gap-4 mx-auto items-center justify-center bg-emerald-200">
            <div className="px-4 w-1/2">
                <Lottie animationData={register}></Lottie>
            </div>
            <div className="w-1/2 px-4">
            <form onSubmit={handleSubmit} className="card-body bg-emerald-400 mt-4 rounded-lg">
            <h4 className="text-2xl font-bold text-center">Register now!</h4>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="url" name="photo" placeholder="Photo URL" className="input input-bordered" required />
        </div>
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
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
            <div className="text-center space-y-2 mt-4 mb-4">
            <button className="btn btn-secondary">Login With Google</button>
            <p className="text-center">Already have a account ? Please <Link to="/login"><span className="text-red-600">Login</span></Link></p>
            </div>
            </div>
        </div>
    );
};

export default Register;