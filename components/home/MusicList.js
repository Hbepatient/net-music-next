import { Button, Swiper, Image } from "react-vant";
import { numberFormat } from "../../public/js/util";
import { useRouter } from "next/router";

export default function MusicList({ musicList }) {
    const router = useRouter();
    return (
        <div className="musicList">
            <div className="musicTitle">
                <span className="find">发现好歌单</span>
                <Button round hairline size="small" type="default">查看更多</Button>
            </div>
            <div className="musicItem">
                <Swiper
                    slideSize={31}
                    loop={false}
                    indicator={false}
                >
                    {
                        musicList.map(music => (
                            <Swiper.Item 
                                key={music.id}
                                onClick={() => {
                                    router.push({
                                        pathname: '/detail',
                                        query: {
                                            id: music.id
                                        }
                                    })
                                }} 
                            >
                                <Image src={music.picUrl} alt="music" />
                                <div className="playCount">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-zanting1-white"></use>
                                    </svg>
                                    <span className="number">{numberFormat(music.playCount)}</span>
                                </div>
                                <span className="describe">{music.name}</span>
                            </Swiper.Item>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}