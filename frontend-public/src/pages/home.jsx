import React from 'react';
import Carousel from '../components/carousel/Carousel'; 
import HomeCard from '../components/HomeCard/HomeCard';

const Home = () => {
    return (
    <>
          <Carousel />
          <HomeCard
          title="WHO WE ARE"
          description="At Virtual Angel, we bring to life a bold fusion of alternative fashion and timeless elegance. Our collections are for those who embrace their individuality and aren’t afraid to push boundaries. From edgy streetwear to sophisticated pieces, we blend rebellious vibes with high-quality materials to create clothing that makes a statement. Our designs reflect the duality of the modern world — part angelic, part daring. Explore our world of fearless fashion and find your unique voice."
          link="about"
          image="/homecard-image.png"
        />
    </>
    );
};

export default Home;
