import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About - NumPlateXtract</title>
      </Head>
      <nav style={navStyle}>
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/about" style={linkStyle}>About</Link>
        <Link href="/contact" style={linkStyle}>Contact</Link>
      </nav>
      <main style={mainCenterStyle}>
        <div style={contentBoxStyle}>
          <h1>About NumPlateXtract</h1>
          <p>
            NumPlateXtract is an AI-powered license plate detection platform designed to help law enforcement,
            traffic analysts, and smart city projects by automatically identifying and extracting number plates from uploaded images.
          </p>
          <h2>Our Mission</h2>
          <p>
            To simplify vehicle monitoring and enhance public safety using cutting-edge machine learning and computer vision technologies.
          </p>
          <h2>Technologies Used</h2>
          <ul>
           <a> Next.js</a><br></br>
            <a>React</a><br></br>
            <a>TensorFlow / PyTorch</a><br></br>
            <a>Custom Image Preprocessing</a>
          </ul>
        </div>
      </main>
    </>
  );
}


const mainCenterStyle = {
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  margin: '0 auto',
};

const contentBoxStyle = {
  borderRadius: '15px',
  padding: '1rem',
  maxWidth: '800px',
  width: '100%',
  color: '#fff',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

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





