import Lottie from 'lottie-react';
import RegisterAnimation from '../assets/register.json'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [user,setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider()

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then((res) =>{
     // console.log(res.user)
      setUser(res.user)
      navigate('/');
    })
    .catch(error =>{
      //console.log('Error', error)
    })
  }
  const handleRegister = e =>{
    e.preventDefault();
    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    //console.log(name, email, password)

    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase) {
      setErrorMessage('Password must include at least one uppercase letter.');
      return;
    }

    if (!hasLowercase) {
      setErrorMessage('Password must include at least one lowercase letter.');
      return;
    }

    if (!isLongEnough) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    // Clear error message if validation passes
      setErrorMessage('');

      createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        toast.success('Registration successful!', {
          position: 'top-center',
          autoClose: 2000,
        });
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error(`Error: ${error.message}`, {
          position: 'top-center',
        });
      });
  };

    return (
        <div className="hero bg-base-200 min-h-screen">
                    <ToastContainer></ToastContainer>

  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left w-80">
     <Lottie animationData={RegisterAnimation}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="ml-10 mt-4 text-5xl font-bold">Register now!</h1>

      <form onSubmit={handleRegister}  className="card-body">
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
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
       type={showPass ? 'text' : 'password'}
        name="password"
        placeholder="password" className="input input-bordered" required />
      <button
      onClick={() => setShowPass(!showPass)}
       className='btn btn-xs absolute right-4 top-12 bg-inherit'>
        {
          showPass ? <FaEyeSlash />: <FaEye />
        }
      </button>
    </div>
    {errorMessage && (
                <div className="text-red-500 mt-2 text-center">
                  {errorMessage}
                </div>
              )}
        <div className="form-control mt-6">
          <button className="btn btn-primary bg-blue-300 text-black">Register</button>
          <div className="divider">OR</div>

          <button onClick={handleGoogleSignIn} className="btn bg-red-200 text-black btn-primary">SignIn with Google</button>
        </div>
      </form>
      <p className='mb-4 text-center'>Already have an account? please <Link className='text-blue-600' to={"/login"}>login</Link></p>

    </div>
  </div>
</div>
    );
};

export default Register;