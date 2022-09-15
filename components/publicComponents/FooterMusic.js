import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, Popup, Cell } from "react-vant";
import { singerNameFormat } from "../../public/js/util";
import { useStore } from "../../utils/useStore";
import MusicPlayer from "./MusicPlayer";

const FooterMusic = observer(() => {
    const { globalStore = {} } = useStore() || {};
    const { globalPlayList = [], index = 0, update = false } = globalStore;
    const [isPlay, setPlay] = useState(false);
    const [visible, setVisible] = useState(false);
    const audioRef = useRef();
    const intervalRef = useRef();
    // 播放音乐回调
    const handlePlayMusic = useCallback(() => {
        if (isPlay) {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
            setPlay(false);
        } else {
            audioRef.current.play();
            handleUpdateTime();
            setPlay(true);
        }
    }, [isPlay])
    // 关闭弹窗
    const handleClosePop = () => {
        setVisible(false);
    }
    // 切换歌曲自动播放
    useEffect(() => {
        audioRef.current.autoplay = true;
        if (update) {
            setPlay(true);
            handleUpdateTime();
        }
    }, [index, update]);
    // 获取歌词
    useEffect(() => {
        const fetchData = async () => {
            if(typeof globalStore.fetchLyrics == 'function')
            await globalStore?.fetchLyrics(globalPlayList[index]?.id);
        }
        fetchData();
        return () => {
            clearInterval(intervalRef.current);
        }
    }, [index, update])
    // 持续更新播放时间
    const handleUpdateTime = () => {
        intervalRef.current = setInterval(() => {
            globalStore.updateCurrentTime(audioRef.current.currentTime);
        }, 1000)
    }
    // 持续更新进度条
    const handleUpdateDuration = () => {
        if (audioRef.current.duration) {
            globalStore.updateDurationTime(audioRef.current.duration);
        } else {
            globalStore.updateDurationTime(9999);
        }
    }
    return (
        <div className="footerMusic">
            <div
                className="footerLeft"
                onClick={() => {
                    setVisible(true);
                }}
            >
                <Image className="trackImg" round src={globalPlayList[index]?.al.picUrl} alt="img" />
                <div className="songInfo">
                    <span className="name">{globalPlayList[index]?.name}</span>
                    <span className="singer">
                        {
                            globalPlayList[index]?.ar.map((item, i, arr) => {
                                return singerNameFormat(item.name, i, arr);
                            })
                        }
                    </span>
                </div>
            </div>
            <div className="footerRight">
                {
                    isPlay ? <svg
                        onClick={handlePlayMusic}
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-zanting"></use>
                    </svg>
                        :
                        <svg
                            onClick={handlePlayMusic}
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
            <audio ref={audioRef} src={`https://music.163.com/song/media/outer/url?id=${globalPlayList[index]?.id}.mp3`}></audio>
            <Popup
                visible={visible}
                position={'right'}
                style={{ width: '100%', height: '100%', backgroundColor: 'rgb(147, 139, 139)' }}
            >
                <MusicPlayer
                    closePop={handleClosePop}
                    curMusic={globalPlayList[index]}
                    playMusic={handlePlayMusic}
                    isPlay={isPlay}
                    lyricList={globalStore.lyricList}
                    updateDuration={handleUpdateDuration}
                    audioRef={audioRef}
                />
            </Popup>
        </div>
    )
})

export default FooterMusic;