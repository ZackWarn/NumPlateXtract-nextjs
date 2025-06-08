// pages/_app.js
import '../styles/globals.css'; // ✅ global
// ❌ DO NOT import styles.module.css here

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
