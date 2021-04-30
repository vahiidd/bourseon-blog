import '../styles/globals.css';
import Head from 'next/head';
import SearchBar from '~/components/SearchBar';
import Navbar from '~/components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
