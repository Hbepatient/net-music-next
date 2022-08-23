export default function TopNav() {
    return (
        <div className="topNav">
            <div className="topLeft">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-liebiao_o"></use>
                </svg>
            </div>
            <div className="topContent">
                <span>我的</span>
                <span>发现</span>
                <span>云村</span>
                <span>视频</span>
            </div>
            <div className="topRight">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-sousuo-white"></use>
                </svg>
            </div>
        </div>
    )
}