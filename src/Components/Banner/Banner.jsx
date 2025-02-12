// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import img3 from '../../assets/bgimg1.jpg'
import img1 from '../../assets/bgimg2.jpg'
import img2 from '../../assets/bgimg3.webp'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'


const Banner = () => {
    return (
        <div className='container p-6 mx-auto bg-lime-200'>
            <Swiper spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]} className="mySwiper">
        <SwiperSlide><Slide image={img1} text='Please Rate Our Services What We Provide.'></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img2} text='We Beleive on results,Not on talks.....'></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img3} text='Trust is the main thing in any situation.'></Slide></SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Banner;