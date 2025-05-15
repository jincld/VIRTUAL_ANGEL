import React, { useEffect } from 'react';
import './Lookbook.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Lookbook = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,  // Para que las animaciones se disparen cada vez que la imagen entre en la vista
      offset: 200,  // Ajuste para que se activen cuando las imágenes estén cerca de ser vistas
    });
  }, []);

  return (
    <div className="lookbook-container">
      {/* Card de Información */}
      <div className="lookbook-info-card">
        <h1 className='lookbook-title margin-top-global'>LOOKBOOK</h1>
        <p>The Lookbook showcases a wide variety of alternative fashion looks, designed to inspire and help you express your unique style. Featuring a range of bold and creative outfits from VIRTUAL ANGEL catalog, this collection of looks highlights the latest trends in alternative fashion. From edgy streetwear to experimental vibes, and everything in between, our curated styles cater to all tastes. Whether you're looking to reinvent your wardrobe or simply want to get inspired, our Lookbook offers endless possibilities to help you find the perfect look that speaks to your individuality and personal style.</p>
      </div>

      {/* Galería de imágenes */}
      <div className="lookbook-gallery">
        <div className="image-item full-width" data-aos="fade">
          <img src="/lookbook/lb1.png" alt="Look 1" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb2.png" alt="Look 2" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb3.png" alt="Look 3" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb4.png" alt="Look 4" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb5.png" alt="Look 5" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb6.png" alt="Look 6" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb7.png" alt="Look 7" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb8.png" alt="Look 8" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb9.png" alt="Look 9" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb10.png" alt="Look 10" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb11.png" alt="Look 11" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb12.png" alt="Look 12" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb13.png" alt="Look 13" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb14.png" alt="Look 14" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb15.png" alt="Look 15" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb16.png" alt="Look 16" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb17.png" alt="Look 17" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb18.png" alt="Look 18" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb19.png" alt="Look 19" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb20.png" alt="Look 20" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb21.png" alt="Look 21" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb22.png" alt="Look 22" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb23.png" alt="Look 23" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb24.png" alt="Look 24" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb25.png" alt="Look 25" />
        </div>
        <div className="image-item full-width">
          <img src="/lookbook/lb26.png" alt="Look 26" />
        </div>
      </div>
    </div>
  );
};

export default Lookbook;
