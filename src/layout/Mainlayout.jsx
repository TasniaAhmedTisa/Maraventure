import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const Mainlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet> 


        <div className='mt-10'>
        <Footer></Footer>
        </div>
        </div>
    );
};

export default Mainlayout;