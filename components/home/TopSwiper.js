import { Swiper, Image } from "react-vant";

export default function TopSwiper({ images }) {
    return (
        <div className="topSwiper">
            <Swiper autoplay>
                {
                    images.map(image => (
                        <Swiper.Item key={image.bannerId}>
                            <Image lazyload src={image.pic} alt='image' />
                        </Swiper.Item>
                    ))
                }
            </Swiper>
        </div>
    )
}
