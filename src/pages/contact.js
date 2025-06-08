import Head from 'next/head';
import Link from 'next/link';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - NumPlateXtract</title>
      </Head>
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/about" style={linkStyle}>About</Link>
        <Link href="/contact" style={linkStyle}>Contact</Link>
      </nav>
      <main style={mainCenterStyle}>
        <div style={contentBoxStyle}>
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you! Whether you're a developer, researcher, or government agency interested in NumPlateXtract, reach out below.
          </p>
          <p><strong>Email:</strong> <a href="mailto:support@numplatextract.com" style={linkStyle}>support@numplatextract.com</a></p>
          <p><strong>Phone:</strong> +91-98765-43210</p>
          <form style={{ marginTop: '1rem' }}>
            <input type="text" placeholder="Your Name" style={inputStyle} /><br />
            <input type="email" placeholder="Your Email" style={inputStyle} /><br />
            <textarea rows="4" placeholder="Your Message" style={inputStyle}></textarea><br />
            <button type="submit" style={buttonStyle}>Send</button>
          </form>
        </div>
      </main>
    </>
  );
}
const navStyle = {
  padding: '1rem',
  background: '#333',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
};


const mainCenterStyle = {
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem'
};

const contentBoxStyle = {
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '15px',
  padding: '2rem',
  maxWidth: '700px',
  width: '100%',
  color: '#fff',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  textAlign: 'center',
  backdropFilter: 'blur(10px)'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  margin: '0.5rem 0',
  borderRadius: '8px',
  border: 'none'
};

const buttonStyle = {
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  background: '#3498db',
  color: '#fff',
  cursor: 'pointer'
};
