import React, { useEffect, useState } from 'react';
import './Contact.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

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
      'service_zsdhpbp',
      'template_6sweo54',
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      'dst9p7AgiSa9zImQA'
    )
    .then(() => {
      toast.success('Message sent successfully');
      setForm({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
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
