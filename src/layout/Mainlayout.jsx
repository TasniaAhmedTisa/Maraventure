import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const Mainlayout = () => {
    return (
        <div>
            <div className='w-11/12 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet> 

        </div>
        <div className='m-10 mx-10'>
        <Footer></Footer>
        </div>
        </div>
    );
};

export default Mainlayout;