import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importamos el archivo de estilos de AOS
import { Link } from 'react-router-dom';  // Importamos Link para navegación
import NewsCard from '../../components/newsCard/NewsCard.jsx';
import NewsCard2 from '../../components/newsCard/NewsCard2.jsx';

const News = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });
  }, []);

  return (
    <div className="container-fluid margin-top-global">
      <div>
        <NewsCard
          title="ANGEL OR CRAZY"
          description="This collection explores a bold and rebellious style by taking classic, traditional pieces and giving them a modern twist. The use of dyed leather creates a unique, textured look, while eye-catching prints are strategically integrated to add a daring and unexpected edge to the pieces. 'Angel or Crazy' reflects a sense of duality — the sweet, angelic side contrasted with a daring, edgy twist. Perfect for those who want to stand out and redefine what it means to be fashionable."
          link="ANGEL%20OR%20CRAZY"  // Usamos el nombre exacto de la colección
          image="/news1.png"
        />

        <NewsCard2
          title="GOOD BOY GONE BAD"
          description="'Good Boy Gone Bad' takes a rebellious approach to fashion by focusing on minimalist monochrome styling. This collection plays with black and white tones, creating a striking yet simple aesthetic. The absence of prints allows the raw structure and layers of the garments to take center stage, emphasizing creativity through accessories and carefully crafted layers. This look is for the bold, the rebellious, and those who love to add personality through every piece they wear, with an emphasis on layering and bold accessories."
          link="GOOD%20BOY%20GONE%20BAD"  // Usamos el nombre exacto de la colección
          image="/news2.png"
        />

        <NewsCard
          title="This Is Eclipse"
          description="'This Is Eclipse' captures the mysterious and powerful energy of an eclipse by blending elegant, sophisticated designs with the raw edge of streetwear. This collection is characterized by its dark, moody color palette, with shades of black, deep blues, and grays that evoke a sense of depth and drama. Much like the celestial event itself, the pieces are dynamic, contrasting between polished elegance and the ruggedness of urban fashion. Ideal for those who want to merge sophistication with an effortless, street-inspired look, making a statement wherever they go."
          link="This%20Is%20Eclipse"  // Usamos el nombre exacto de la colección
          image="/news3.png"
        />
      </div>
    </div>
  );
};

export default News;
