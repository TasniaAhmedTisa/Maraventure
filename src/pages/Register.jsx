import Lottie from 'lottie-react';
import RegisterAnimation from '../assets/register.json'
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left w-80">
     <Lottie animationData={RegisterAnimation}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="ml-10 mt-4 text-5xl font-bold">Register now!</h1>

      <form className="card-body">
        <div className="form-control">
        <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input type="text" name="username" placeholder="Enter your name" className="input input-bordered" required />
      <label className="label">
        <span className="label-text">Photo</span>
      </label>
      <input type="text" placeholder="Photo url" className="input input-bordered" required />
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary bg-blue-300 text-black">Register</button>
          <div className="divider">OR</div>

          <button onClick="" className="btn bg-red-200 text-black btn-primary">SignIn with Google</button>
        </div>
      </form>
      <p className='mb-4 text-center'>Already have an account? please <Link className='text-blue-600' to={"/login"}>login</Link></p>

    </div>
  </div>
</div>
    );
};

export default Register;