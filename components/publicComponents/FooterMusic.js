import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Image, Popup, Cell } from "react-vant";
import service from "../../public/js/service";
import { singerNameFormat } from "../../public/js/util";
import { useStore } from "../../utils/store";
import MusicPlayer from "./MusicPlayer";

const FooterMusic = observer(() => {
    const { rootStore } = useStore();
    const { globalPlayList, index, update } = rootStore;
    const [isPlay, setPlay] = useState(false);
    const [visible, setVisible] = useState(false);
    const [lyrics, setLyrics] = useState([]);
    const audioRef = useRef();
    // 播放音乐回调
    const playMusic = () => {
        if (isPlay) {
            audioRef.current.pause();
            setPlay(false);
        } else {
            audioRef.current.play();
            setPlay(true);
        }
    };
    // 关闭弹窗
    const closePop = () => {
        setVisible(false);
    }
    // 自动播放
    useEffect(() => {
        audioRef.current.autoplay = true;
        if (update) {
            setPlay(true);
        }
    }, [index, update]);
    // 获取歌词
    useEffect(() => {
        const getMusicLyrics = async () => {
            const {data} = await service({
                method:'GET',
                url: '/lyric',
                params:{
                    id: globalPlayList[index].id
                }
            });
            console.log(data);
        }
        getMusicLyrics();
    }, [index])
    return (
        <div className="footerMusic">
            <div
                className="footerLeft"
                onClick={() => {
                    setVisible(true);
                }}
            >
                <Image className="trackImg" round src={globalPlayList[index].al.picUrl} alt="img" />
                <div className="songInfo">
                    <span className="name">{globalPlayList[index].name}</span>
                    <span className="singer">
                        {
                            globalPlayList[index].ar.map((item, i, arr) => {
                                return singerNameFormat(item.name, i, arr);
                            })
                        }
                    </span>
                </div>
            </div>
            <div className="footerRight">
                {
                    isPlay ? <svg
                        onClick={playMusic}
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-zanting"></use>
                    </svg>
                        :
                        <svg
                            onClick={playMusic}
                            className="icon"
                            aria-hidden="true"
                        >
                            <use xlinkHref="#icon-zanting1"></use>
                        </svg>
                }
                <svg
                    className="icon"
                    aria-hidden="true"
                >
                    <use xlinkHref="#icon-zu"></use>
                </svg>

            </div>
            <audio ref={audioRef} src={`https://music.163.com/song/media/outer/url?id=${globalPlayList[index].id}.mp3`}></audio>
            <Popup
                visible={visible}
                position={'right'}
                style={{ width: '100%', height: '100%', backgroundColor: 'rgb(147, 139, 139)' }}
            >
                <MusicPlayer
                    closePop={closePop}
                    curMusic={globalPlayList[index]}
                    playMusic={playMusic}
                    isPlay={isPlay}
                />
            </Popup>
        </div>
    )
})

export default FooterMusic;