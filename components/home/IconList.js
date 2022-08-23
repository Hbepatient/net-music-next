export default function IconList() {
    return (
        <div className="iconList">
            <div className="listItem">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-tuijian"></use>
                </svg>
                <span>每日推荐</span>
            </div>
            <div className="listItem">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-zhibo"></use>
                </svg>
                <span>私人FM</span>
            </div>
            <div className="listItem">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-gedan"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div className="listItem">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-paihangbang"></use>
                </svg>
                <span>排行榜</span>
            </div>
        </div>
    )
}