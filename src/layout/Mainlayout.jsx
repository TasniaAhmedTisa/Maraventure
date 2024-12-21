import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const Mainlayout = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
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