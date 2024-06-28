import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import styles from '/styles/MySwiper.module.css'; 

const SwiperComponent: React.FC = () => {
  return (
    <div className={styles.swiperBackGround}>
        <div className={styles.swiperContainer}>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                loop={true}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                style={{ width: '100%', height: '100%' }}
            >
                <SwiperSlide>
                <Image src="/ss1.png" alt="Image 1" layout="responsive" width={500} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/ss2.png" alt="Image 2" layout="responsive" width={500} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/ss3.png" alt="Image 3" layout="responsive" width={500} height={400} />
                </SwiperSlide>
                <SwiperSlide>
                <Image src="/ss4.png" alt="Image 4" layout="responsive" width={500} height={400} />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
  );
};

export default SwiperComponent;