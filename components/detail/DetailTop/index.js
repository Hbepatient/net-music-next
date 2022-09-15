import { Image } from "react-vant";
import { useRouter } from "next/dist/client/router";
import Introduce from "./Introduce";
import { ToolItems } from "./ToolItems";
import { useStore } from "../../../utils/useStore";

export default function DetailTop() {
    const router = useRouter();
    const { detailStore } = useStore();
    const { coverImgUrl = '', creator = {}, description = '', name = '', commentCount = '', shareCount = '' } = detailStore.playListContent;
    return (
        <>
            <div className="detailTop">
                <Image src={coverImgUrl} alt='bcg' className="bgImg"></Image>
                <div className="topLeft">
                    <svg
                        onClick={() => {
                            router.push('/');
                        }}
                        className="icon"
                        aria-hidden="true"
                    >
                        <use xlinkHref="#icon-zuojiantou-white"></use>
                    </svg>
                    <span className="topTitle">歌单</span>
                </div>
                <div className="topRight">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-sousuo-white"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-liebiao-white"></use>
                    </svg>
                </div>
            </div>
            <Introduce
                creator={creator}
                coverImgUrl={coverImgUrl}
                description={description}
                name={name}
            />
            <ToolItems
                commentCount={commentCount}
                shareCount={shareCount}
            />
        </>
    )
}