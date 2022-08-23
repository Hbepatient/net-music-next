import { Image } from "react-vant";

export default function Introduce({ creator, description, coverImgUrl, name }) {
    const { nickname = '', avatarUrl = '' } = creator;
    return (
        <div className="introduce">
            <div className="introLeft">
                <Image lazyload className="coverImg" src={coverImgUrl} alt={'img'} />
            </div>
            <div className="introRight">
                <span className="listName">{name}</span>
                <div className="userInfo">
                    <Image 
                    className="userImg" 
                    round={true} 
                    src={avatarUrl} 
                    alt='avatar' 
                    lazyload
                    />
                    <span className="nickName">{nickname}</span>
                </div>
                <span className="description">{description}</span>
            </div>
        </div>
    )
}