import React from 'react';

export const CategorySlider = () => {
  const categories = [
    { name: 'Alkaram', img: 'https://alkaram.com/wp-content/themes/ak/images/logo-alkaram-black.png' },
    { name: 'Maria.B', img: 'https://isloou.com/cdn/shop/collections/Logo_MariaB.jpg?v=1656044490' },
    { name: 'Sana Safinaz', img: 'https://images.seeklogo.com/logo-png/24/2/sana-safinaz-logo-png_seeklogo-249755.png' },
    { name: 'Bonanza Satrangi', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCZClMNdR82a7kjOZBjnH9nuNq50hKa2kRg&s' },
    ];

  return (
    <div className="text-left p-1  ">
<h2 className="text-4xl font-bold border-l-8 pl-3 mb-6" style={{ borderColor: "rgba(219, 68, 68, 1)" }}>
  Brands
</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-20">
        {categories.map(({ name, img }) => (
          <div
            key={name}
            className="bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer gap-4"
          >
            <img src={img} alt={name} className="h-30 w-30 object-contain" />
            {/* <span className="font-medium text-center border border-black p-2">{name}</span> */}
            </div>
        ))}
      </div>
    </div>
  );
};