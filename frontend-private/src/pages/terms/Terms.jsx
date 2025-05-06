import React, { useEffect } from 'react';
import './Terms.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importamos el archivo de estilos de AOS

const Terms = () => {
  // Inicializamos AOS cuando el componente se monte
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      easing: 'ease-in-out', // Easing para las animaciones
      once: true, // Las animaciones solo se ejecutan una vez
      offset: 200, // Distancia desde la parte superior para iniciar la animación
    });
  }, []);

  return (
    <>
      <div className="container-fluid backterms">
        <div className="row w-100 justify-content-center">
          <div className="col-10 col-md-6 colbgterms">
            {/* Título animado */}
            <img 
              src="/termstitle.png" 
              className="d-block w-75 abouttitle" 
              alt="..." 
              data-aos="fade" // Aplicamos la animación aquí
            />

            {/* Contenido animado */}
            <p className='text1' data-aos="fade" data-aos-delay="200">
              <strong>1. User Agreement</strong> <br></br>
              By accessing or using our website, you agree to comply with these terms and conditions. <br></br>
              You must be at least 18 years old to use this site or have parental consent. <br></br><br></br>

              <strong>2. Product Descriptions</strong> <br></br>
              All products are described as accurately as possible. However, we do not guarantee that product descriptions or other content are error-free. <br></br>
              Colors and styles may vary slightly due to monitor settings and lighting. <br></br><br></br>

              <strong>3. Payment Terms</strong> <br></br>
              We accept various payment methods, including credit cards and PayPal. <br></br>
              All payments must be made in full at the time of purchase. <br></br><br></br>

              <strong>4. Shipping and Delivery Policies</strong> <br></br>
              Orders will be processed within 1-3 business days. <br></br>
              Shipping times may vary based on location and shipping method selected at checkout. <br></br><br></br>

              <strong>5. Returns and Refunds</strong> <br></br>
              We accept returns within 30 days of purchase for a full refund, provided the items are in their original condition. <br></br>
              To initiate a return, please contact our customer service team for instructions. <br></br><br></br>

              <strong>6. Privacy Policy</strong> <br></br>
              We are committed to protecting your privacy. Your personal information will only be used in accordance with our privacy policy. <br></br>
              We do not sell or share your information with third parties without your consent. <br></br><br></br>

              <strong>7. Liability Limitations</strong> <br></br>
              Virtual Angel is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website. <br></br>
              Our total liability is limited to the amount paid for the product in question. <br></br><br></br>

              <strong>8. Governing Law</strong> <br></br>
              These terms and conditions are governed by the laws of the State of California. <br></br>
              Any disputes arising from these terms will be resolved in the courts located in Los Angeles County. <br></br><br></br>

              <strong>9. Changes to Terms</strong> <br></br>
              We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on our website. <br></br>
              Your continued use of the site after any changes constitutes your acceptance of the new terms. <br></br><br></br>

              <strong>10. Contact Information</strong> <br></br>
              For any questions or concerns regarding these terms and conditions, please contact us at support@virtualangel.com or call us at (123) 456-7890. <br></br>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
