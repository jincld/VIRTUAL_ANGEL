import React, { useEffect, useState } from 'react';
import './Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from 'emailjs-com';

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });
  }, []);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_zsdhpbp',       // Reemplaza con tu Service ID
      'template_6sweo54',      // Reemplaza con tu Template ID
      {
        from_name: form.name,      // Campo para el nombre
        from_email: form.email,    // Campo para el email
        message: form.message,     // Campo para el mensaje
        // Añadir más campos si es necesario
      },
      'dst9p7AgiSa9zImQA'        // Reemplaza con tu Public Key
    )
    .then(() => {
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });

      // Borrar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setStatus('');
      }, 3000);  // 3000 milisegundos = 3 segundos
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      setStatus('Failed to send message. Please try again.');

      // Borrar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setStatus('');
      }, 3000);  // 3000 milisegundos = 3 segundos
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="back" data-aos="fade-in"></div>
        <div className="back2"></div>
      </div>

      <div className="content-wrapper">
        <div className="colbg">
          <h1 className='contacttittle'>CONTACT US</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text">NAME</span>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">EMAIL</span>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-group-text">MESSAGE</span>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <br />
            <button type="submit" className="custom-send-btn">SEND</button>
            {status && <p style={{ marginTop: '10px' }}>{status}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
