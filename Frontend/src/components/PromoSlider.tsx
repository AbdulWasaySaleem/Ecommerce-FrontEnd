import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const promos = [
  {
    title: "Alkaram Sale Fest",
    description: "Get trendy styles at up to 50% off. Don't miss out!",
    image: "https://www.brandinginasia.com/wp-content/uploads/2023/02/Alkaram-Studio-.jpg",
    buttonText: "Shop Now",
    buttonColor: "bg-white",
    countdown: { days: 23, hours: 5, minutes: 59, seconds: 35 },
    bgColor: "bg-black",
    textColor: "text-white",
    link: "https://www.alkaramstudio.com/"
  },
  {
    title: "Maria B Luxe Deals",
    description: "Luxury fashion now at amazing discounts. Shop today!",
    image: "https://ibaasonline.com/cdn/shop/files/D-8_91963866-a74d-4535-a3f5-6009ba3dedc6.jpg?v=1715693257&width=1445",
    buttonText: "Shop Now",
    buttonColor: "bg-yellow-500",
    countdown: { days: 15, hours: 10, minutes: 30, seconds: 45 },
    bgColor: "bg-yellow-50",
    textColor: "text-black",
    link: "https://www.mariab.pk/"
  },
  {
    title: "Bonanza Satrangi Sale",
    description: "Discover timeless traditions at unbeatable prices!",
    image: "https://scontent.fkhi6-2.fna.fbcdn.net/v/t39.30808-6/486945287_9577225405670633_3866872280559636980_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=1tDl-0VXEEkQ7kNvwEJcGet&_nc_oc=Adn_IJ5_D2xpdSk5BTKqHmLUkZIexkKkt-EvwJl20Lhs7t2Z5gDfAT2x--1wXbCrpxs&_nc_zt=23&_nc_ht=scontent.fkhi6-2.fna&_nc_gid=teZ6-JZbXHl-jrK_gp2Ozw&oh=00_AfE28dLEth32-knG_ddz2S1LRZ3C-m_wRESexXogc57a6g&oe=6815A874",
    buttonText: "Explore Now",
    buttonColor: "bg-white",
    countdown: { days: 18, hours: 8, minutes: 45, seconds: 20 },
    bgColor: "bg-black",
    textColor: "text-white",
    link: "https://bonanzasatrangi.com/"
  },
  {
    title: "Sana Safinaz Exclusive Sale",
    description: "Luxury redefined! Shop Sana Safinaz exclusive deals.",
    image: "https://www.sanasafinaz.com/media/wysiwyg/Muzlin-February-2025-Main-Banner.jpg",
    buttonText: "Shop Now",
    buttonColor: "bg-yellow-500",
    countdown: { days: 25, hours: 8, minutes: 45, seconds: 20 },
    bgColor: "bg-yellow-50",
    textColor: "text-black",
    link: "https://sanasafinaz.com/"
  }
];

export const PromoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState(promos[0].countdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % promos.length;
    setCurrentSlide(nextIndex);
    setCountdown(promos[nextIndex].countdown);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + promos.length) % promos.length;
    setCurrentSlide(prevIndex);
    setCountdown(promos[prevIndex].countdown);
  };

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 5000);
    return () => clearInterval(autoSlide);
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promos.map((promo, index) => (
          <div
            key={index}
            className={`w-full px-6 md:px-[100px] flex-none ${promo.bgColor} ${promo.textColor}`}
          >
            <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{promo.title}</h2>
                <p className="text-lg md:text-xl mb-6">{promo.description}</p>
                <div className="flex gap-4 md:gap-6 mb-6 md:mb-8 justify-center md:justify-start">
                  {['days', 'hours', 'minutes', 'seconds'].map((unit, i) => (
                    <div key={i} className="text-center">
                      <span className="block text-xl md:text-3xl font-bold">
                        {countdown[unit]}
                      </span>
                      <span className="text-xs md:text-sm capitalize">{unit}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={promo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block text-gray-900 px-6 md:px-8 py-2 md:py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors ${promo.buttonColor}`}
                >
                  {promo.buttonText}
                </a>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-8">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};
