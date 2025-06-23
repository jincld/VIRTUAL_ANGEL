import React from 'react';
import Carousel from '../components/carousel/Carousel'; 
import HomeCard from '../components/HomeCard/HomeCard';
import './home.css';

const Home = () => {
    return (
    <>
        <Carousel />
                {/* Video section */}
                <div className="video-container">
          <video autoPlay loop muted className="video">
            <source src="/virtualangelvideo1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <HomeCard
          title="WHO WE ARE"
          description="At Virtual Angel, we bring to life a bold fusion of alternative fashion and timeless elegance. Our collections are for those who embrace their individuality and aren’t afraid to push boundaries. From edgy streetwear to sophisticated pieces, we blend rebellious vibes with high-quality materials to create clothing that makes a statement. Our designs reflect the duality of the modern world — part angelic, part daring. Explore our world of fearless fashion and find your unique voice."
          link="about"
          image="/homecard-image.png"
        />
                        <div className="video-container">
          <video autoPlay loop muted className="video">
            <source src="/virtualangelvideo2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
    </>
    );
};

export default Home;
