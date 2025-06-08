import Head from 'next/head';
import Link from 'next/link';
import LicensePlateDetector from '../components/UploadPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>NumPlateXtract - AI-Powered License Plate Detection</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav
  style={{
    padding: '1rem',
    background: '#333',          // dark background
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    fontWeight: 'bold' ,
  }}
>
  <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
    Home
  </Link>
  <Link href="/about" style={{ color: '#fff', textDecoration: 'none' }}>
    About
  </Link>
  <Link href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>
    Contact
  </Link>
</nav>


      <LicensePlateDetector />
    </>
  );
}
