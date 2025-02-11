import Lottie from 'lottie-react';
import loginAnimation from '../assets/login.json'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { auth } from '../firebase.config';
import AuthContext from '../context/AuthContext';



const Login = () => {
  const {signInUser} = useContext(AuthContext)
  const navigate = useNavigate();
  //const [user, setUser] = useState(null);

  //const [errorMessage, setErrorMessage] = useState('');


  const provider = new GoogleAuthProvider()

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, provider)
    .then((res) =>{
     // console.log(res)
      navigate('/');
    })
    .catch(error =>{
      console.log('Error', error)
    })
  }
  const handleLogin = e =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    //console.log(email, password)

    signInUser(email, password)
      .then((res) => {
        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 2000,
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error)
       
      })
    }

    return (
        <div className="hero bg-gradient-to-r from-blue-100 via-red-200 to-blue-400 min-h-screen">
          <ToastContainer></ToastContainer>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left w-80">
      <Lottie animationData={loginAnimation}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="mt-4 text-5xl font-bold text-center">Login now!</h1>

      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button onSubmit={handleLogin} className="btn btn-primary bg-blue-300 text-black">Login</button>
          <div className="divider">OR</div>

          <button onClick={handleGoogleSignIn} className="btn bg-red-200 btn-primary text-black">Login with Google</button>
        </div>
      </form>
      <p className=' mb-4 text-center'>New to this website? please <Link className='text-blue-600' to={"/register"}>Register</Link></p>

    </div>
  </div>
</div>
    );
};

export default Login;