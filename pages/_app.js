import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
// Import our custom CSS
import '../styles/customStyles.css';
// File: components/LanguageCurrencyBar.js
import { useEffect } from 'react';
 

 
function MyApp({ Component, pageProps }) {
  // Add Bootstrap JS on component mount
  useEffect(() => {
    // Bootstrap functionality requires these globals
    if (typeof document !== 'undefined') {
      // We need to import Bootstrap JS after the component mounts to avoid SSR issues
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

// File: pages/index.js (complete implementation)
 