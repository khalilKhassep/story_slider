import React from 'react';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, Lazy, Mousewheel} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import chapters from './data';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './styles/storySlider.scss';
import img_1800x1200 from './images/img_1800x1200.jpg';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Lazy, Mousewheel]);

const StorySlider = () => {

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            mousewheel={true}
            lazy
            pagination={
                {
                    clickable: true,
                    renderBullet: function (index, className) {
                        className = `${className} custom-bullet`;
                        return `<span class="${className}"></span>`
                    }
                }
            }
            onChange={() => console.log('SLider changes ')}
            onSwiper={(swiper) => {
                const bullets = swiper.pagination.bullets;

                const slides = swiper.slides;

                slides.map((slide, index) => {
                    const centerEl = slide.childNodes[0].offsetHeight / 2;
                    const topLeft = slide.childNodes[0].offsetHeight / 10;
                    slide.childNodes[1].style.top = `${centerEl}px`;
                    slide.childNodes[2].style.top = `${topLeft}px`;
                    if (slide.classList.contains('chapter')) {
                        bullets[index].classList.add(`chapter-slide-${index}`);
                        bullets[index].classList.add(`g-chapter-bullet`);
                        bullets[index].innerHTML = `<strong class="strong">${slide.getAttribute('data-chapter')}</strong>`
                    }
                    return slide;
                });

            }}
        >
            {chapters.map((chapter, index) => {

                return chapter.stories.map((story, index) => {
                    story.image = img_1800x1200;
                    let isChapter = chapter.stories.length === index + 1;
                    return <SwiperSlide className={`slide-custom ${isChapter && 'chapter'}`}
                                        data-chapter={isChapter && chapter.title}>
                        <div className="img-box">
                            <img alt={story.title} data-src={story.image} className="swiper-lazy"/>
                        </div>
                        <h3 className="title">{isChapter ? chapter.title : story.title} </h3>
                        <p className="caption">{story.caption}</p>
                        <div className="swiper-lazy-preloader"/>
                    </SwiperSlide>
                })
            })}
        </Swiper>)
};
export default StorySlider;