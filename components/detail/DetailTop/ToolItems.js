export function ToolItems({ shareCount, commentCount }) {
    return (
        <div className="toolList">
            <div className="toolItem">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-xiaoxi-white"></use>
                </svg>
                <span>{commentCount}</span>
            </div>
            <div className="toolItem">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-fenxiang-white"></use>
                </svg>
                <span>{shareCount}</span>
            </div>
            <div className="toolItem">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-xiazai-wenjianxiazai-07-white"></use>
                </svg>
                <span>下载</span>
            </div>
            <div className="toolItem">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-xuanze-duoxuan-tianchong-white"></use>
                </svg>
                <span>多选</span>
            </div>
        </div>
    )
}