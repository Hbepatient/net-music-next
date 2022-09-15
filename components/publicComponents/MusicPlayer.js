import { singerNameFormat } from "../../public/js/util";
import { Image, Slider } from "react-vant";
import Marquee from "react-fast-marquee";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react";

const MusicPlayer = observer(({ curMusic, playMusic, closePop, isPlay, lyricList, updateDuration, audioRef }) => {
    const { globalStore = {} } = useStore() || {};
    const { currentTime = '', index = 0, length = 0, durationTime = 0 } = globalStore;
    const { name: songName = '', al: albumInfo = {}, ar: singerInfo = {} } = curMusic;
    const [isLyricVisible, setLyricVisible] = useState(false);
    const [percentage, setPercentage] = useState(0);
    // 歌词滚动
    const lrcRef = useRef();
    const handleTimeCheckout = (curLyric) => {
        if (currentTime * 1000 >= curLyric.time && currentTime * 1000 <= curLyric.after) {
            return true;
        } else {
            return false;
        }
    }
    const handleChangePosition = () => {
        const p = document.querySelector('.curLyric');
        if (p && p.offsetTop > 300) {
            lrcRef.current.scrollTop = p.offsetTop - 300;
        }
        console.log(1);
    }
    useEffect(() => {
        if (currentTime >= durationTime) {
            handleSwitchSong(1);
        }
        // throttle(() => handleChangePosition(), 1000);
        updateDuration();
        handleProgressFormat();
    }, [currentTime]);
    // 切换歌曲
    const handleSwitchSong = (offset) => {
        let curIndex = index + offset;
        if (curIndex < 0) {
            curIndex = length - 1;
        } else if (curIndex > length - 1) {
            curIndex = 0;
        }
        lrcRef.current.scrollTop = 0;
        globalStore.updateIndex(curIndex);
        globalStore.updateCurrentTime(0);
    }
    // 进度条百分比计算
    const handleProgressFormat = useCallback(() => {
        const cur = Math.floor(currentTime);
        const all = Math.floor(durationTime);
        const percentage = Math.floor(cur / all * 100);
        setPercentage(percentage);
    }, [currentTime])
    return (
        <div className="playerContainer">
            <Image lazyload className="bcgImg" src={albumInfo.picUrl} alt='img' />
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
                            className={handleTimeCheckout(item) ? 'curLyric' : ''}
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
                <Image lazyload className={isPlay ? 'needleImg_active' : 'needleImg'} src={'/img/needle.png'} alt='img' />
                <Image lazyload className="cdImg" src={'/img/cd.png'} alt='img' />
                <Image lazyload round className={`albumImg ${isPlay ? 'albumImg_active' : 'albumImg_paused'}`} src={albumInfo.picUrl} alt='img' />
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
                <Slider
                    className="footerMiddle"
                    buttonSize={12}
                    value={percentage}
                    onChange={(value) => {
                        const changeTime = (value / 100) * durationTime;
                        globalStore.updateCurrentTime(changeTime);
                        audioRef.current.currentTime = changeTime;
                    }}
                />;
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
                        onClick={() => handleSwitchSong(-1)}
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
                        onClick={() => handleSwitchSong(1)}
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