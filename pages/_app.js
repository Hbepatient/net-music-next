import Script from 'next/script';
import '../styles/globals.scss';
import '../styles/home.scss';
import '../styles/detail.scss';
import '../styles/public.scss';
import { initStore, StoreProvider } from '../utils/store';
import FooterMusic from '../components/publicComponents/FooterMusic';

// 初始化全局音乐列表
const createStore = (defaultData) => {
  return {
    ...defaultData,
    updateGlobalPlayList(data) {
      const { trackList, index } = data;
      this.globalPlayList = trackList;
      this.index = index;
      this.update = true;
      this.length = trackList.length;
    },
    updateCurrentTime(data){
      this.currentTime = data;
      console.log(this.currentTime);
    },
    updateIndex(data){
      this.index = data;
    }
  }
}

const globalPlayListContent = {
  globalPlayList: [{
    al: {
      id: 126583656,
      name: "热爱105°C的你",
      pic: 109951166098679120,
      picUrl: "https://p2.music.126.net/6Herq6VjqEM2wJYiML3y4A==/109951166098679116.jpg",
      pic_str: "109951166098679116",
    },
    ar: [{
      id: 7122,
      name: "阿肆"
    }],
    name: "热爱105°C的你",
    id: 1840459406
  }],
  index: 0,
  length: 1,
  update: false,
  currentTime: 0,
};

function MyApp({ Component, pageProps }) {
  initStore(createStore(globalPlayListContent));
  return (
    <>
      <Script src={'/js/useRem.js'}></Script>
      <Script src={'/js/iconfont.js'}></Script>
      <StoreProvider>
        <Component {...pageProps} />
        <FooterMusic />
      </StoreProvider>
    </>)
}

export default MyApp
