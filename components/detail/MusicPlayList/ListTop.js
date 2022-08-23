export default function ListTop() {
    return (
        <div className="listTop">
            <div className="topLeft">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-bofang2-red"></use>
                </svg>
                <span className="playAll">播放全部</span>
                <span className="trackCount">共{'(' + 11 + ')'}首</span>
            </div>
            <div className="topRight">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-jiahao"></use>
                </svg>
                <span className="favor">收藏{'(' + 1222 + ')'}</span>
            </div>
        </div>
    )
}