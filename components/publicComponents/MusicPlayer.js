import { singerNameFormat } from "../../public/js/util";
import { Image } from "react-vant";
import Marquee from "react-fast-marquee";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../utils/store";
import { observer } from "mobx-react-lite";
import { Progress } from 'react-vant';

const MusicPlayer = observer(({ curMusic, playMusic, closePop, isPlay, lyricList }) => {
    const { rootStore } = useStore();
    const { currentTime, index, length } = rootStore;
    const { name: songName, al: albumInfo, ar: singerInfo } = curMusic;
    const [isLyricVisible, setLyricVisible] = useState(false);
    // 歌词滚动
    const lrcRef = useRef();
    const timeCheckout = (curLyric) => {
        if (currentTime * 1000 >= curLyric.time && currentTime * 1000 <= curLyric.after) {
            return true;
        } else {
            return false;
        }
    }
    useEffect(() => {
        const p = document.querySelector('.curLyric');
        if(p && p.offsetTop > 300){
            lrcRef.current.scrollTop = p.offsetTop - 300;
        }
    }, [currentTime]);
    // 切换歌曲
    const switchSong = (offset) => {
        let curIndex = index + offset;
        if(curIndex < 0){
            curIndex = length - 1;
        }else if (curIndex > length - 1){
            curIndex = 0;
        }
        rootStore.updateIndex(curIndex);
        rootStore.updateCurrentTime(0);
    }
    return (
        <div className="playerContainer">
            <Image className="bcgImg" src={albumInfo.picUrl} alt='img' />
            <div className="playerTop">
                <div className="topLeft">
                    <svg
                        className="icon"
                        aria-hidden="true"
                        onClick={() => {
                            closePop(false);
                        }}
                    >
                        <use xlinkHref="#icon-zuojiantou-white"></use>
                    </svg>
                    <div className="songInfo">
                        <Marquee gradient={false} className="songName">
                            {songName}
                        </Marquee>
                        <span className="singerName">
                            {
                                singerInfo.map((item, i, arr) => {
                                    return singerNameFormat(item.name, i, arr);
                                })
                            }
                        </span>
                    </div>
                </div>
                <div className="topRight">
                    <svg
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-fenxiang-white"></use>
                    </svg>
                </div>
            </div>
            <div
                className="playerLyric"
                style={isLyricVisible ? { display: 'flex' } : { display: 'none' }}
                onClick={() => {
                    setLyricVisible(false);
                }}
                ref={lrcRef}
            >
                {
                    lyricList.map((item, index) => (
                        <p
                            key={index}
                            className={timeCheckout(item) ? 'curLyric' : ''}
                        >
                            {item.lyric}
                        </p>
                    ))
                }
            </div>
            <div
                className="playerContent"
                style={isLyricVisible ? { display: 'none' } : { display: 'flex' }}
                onClick={() => {
                    setLyricVisible(true);
                }}
            >
                <Image className={isPlay ? 'needleImg_active' : 'needleImg'} src={'/img/needle.png'} alt='img' />
                <Image className="cdImg" src={'/img/cd.png'} alt='img' />
                <Image round className={`albumImg ${isPlay ? 'albumImg_active' : 'albumImg_paused'}`} src={albumInfo.picUrl} alt='img' />
            </div>
            <div className="playerFooter">
                <div className="footerTop">
                    <svg
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-aixin"></use>
                    </svg>
                    <svg
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-xiazai-wenjianxiazai-07-white"></use>
                    </svg>
                    <svg
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-review"></use>
                    </svg>
                    <svg
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-liebiao-"></use>
                    </svg>
                </div>
                <div className="footerMiddle">
                    <Progress percentage="50" />;
                </div>
                <div className="footerContent">
                    <svg
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-xunhuanbofang"></use>
                    </svg>
                    <svg
                        className="icon"
                        aria-hidden="true"
                        onClick={ () => switchSong(-1)}
                    >
                        <use xlinkHref="#icon-shangyishoushangyige"></use>
                    </svg>
                    {
                        isPlay ?
                            <svg
                                className="icon play"
                                aria-hidden="true"
                                onClick={playMusic}
                            >
                                <use xlinkHref="#icon-zanting"></use>
                            </svg> :
                            <svg
                                className="icon play"
                                aria-hidden="true"
                                onClick={playMusic}
                            >
                                <use xlinkHref="#icon-bofang1-copy"></use>
                            </svg>
                    }
                    <svg
                        className="icon"
                        aria-hidden="true"
                        onClick={() => switchSong(1)}
                    >
                        <use xlinkHref="#icon-xiayigexiayishou"></use>
                    </svg>
                    <svg
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-zu"></use>
                    </svg>
                </div>
            </div>
        </div>
    )
})

export default MusicPlayer;