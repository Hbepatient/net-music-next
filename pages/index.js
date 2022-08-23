import TopNav from "../components/home/TopNav"
import TopSwiper from "../components/home/TopSwiper";
import { handleGetBanner, handleGetMusicList } from "../api/homeApi";
import IconList from "../components/home/IconList";
import MusicList from "../components/home/MusicList";

export default function Home(props) {
    const { banners: images  = [], result: musicList = [] } = props;
    return (
        <>
            <TopNav />
            <TopSwiper images={images} />
            <IconList />
            <MusicList musicList={musicList} />
        </>
    )
}

export async function getStaticProps() {
    const { banners } = await handleGetBanner();
    const { result } = await handleGetMusicList();
    return {
        props: { banners, result }, // will be passed to the page component as props
    }
}
