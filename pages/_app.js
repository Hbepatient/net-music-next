import Script from 'next/script';
import Head from 'next/head';
import '../styles/globals.scss';
import '../styles/home.scss';
import '../styles/detail.scss';
import '../styles/public.scss';
import FooterMusic from '../components/publicComponents/FooterMusic';
import App from 'next/app';
import { initializeStore, isServer } from '../store/Store';
import { StoreProvider } from '../utils/useStore';

function MyApp({ Component, pageProps, initialStore }) {
  const mobxStore = isServer ? initialStore : initializeStore(initialStore);
  console.log('mobx', mobxStore);
  return (
    <div>
      <Head>
        <title>net-music</title>
      </Head>
      <Script src={'/js/useRem.js'}></Script>
      <Script src={'/js/iconfont.js'}></Script>
      <StoreProvider store={mobxStore}>
        <Component {...pageProps} />
        <FooterMusic />
      </StoreProvider>
    </div>)
}

MyApp.getInitialProps = async (appContext) => {
  const initialStore = initializeStore();
  // console.log(initialStore);
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
    initialStore
  }
}

export default MyApp
