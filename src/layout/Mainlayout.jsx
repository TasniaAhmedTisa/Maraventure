import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const Mainlayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="flex-grow">
             <Outlet />
            </div>

        <div className='mt-10'>
        <Footer></Footer>
        </div>
        </div>
    );
};

export default Mainlayout;