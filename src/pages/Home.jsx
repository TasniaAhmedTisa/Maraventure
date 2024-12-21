import About from "../components/About";
import Banner from "../components/Banner";
import Marathon from "../components/Marathon";
import Testimonial from "../components/Testimonial";
import Upcoming from "../components/Upcoming";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Marathon></Marathon>
            {/* Upcoming Marathons Section */}
            <Upcoming></Upcoming>
            <About></About>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;