import { singerNameFormat } from "../../public/js/util";
import { Image } from "react-vant";
import Marquee from "react-fast-marquee";

const MusicPlayer = ({ curMusic, playMusic, closePop, isPlay }) => {
    const { id, name: songName, al: albumInfo, ar: singerInfo } = curMusic
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
            <div className="playerContent">
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
}

export default MusicPlayer;