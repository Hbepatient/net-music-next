import { Swiper } from "react-vant";
import Image from "next/image";

export default function TopSwiper({ images }) {
    return (
        <div className="topSwiper">
            <Swiper autoplay>
                {
                    images.map(image => (
                        <Swiper.Item key={image.bannerId}>
                            <Image 
                                src={image.pic}
                                alt='image' 
                                layout="fill"
                            />
                        </Swiper.Item>
                    ))
                }
            </Swiper>
        </div>
    )
}
