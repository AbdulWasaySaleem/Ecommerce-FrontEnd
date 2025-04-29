const brands = [
  {
    name: "Alkaram",
    logo: "https://alkaram.com/wp-content/themes/ak/images/logo-alkaram-black.png",
    description:
      "Alkaram Textile Mills, the parent concern of Alkaram started back in 1986 under the leadership of its founder Mr. Fawad Anwer, a first-generation entrepreneur. Stretching a span of more than 35 years, Alkaram Textile Mills continues its bequest to cater the modern textile solutions globally. Alkaram emerged as a fashion retail brand in 2010 with the inauguration of its very first outlet, starting the journey with its enticing unstitched category...",
  },
  {
    name: "Maria.B",
    logo: "https://isloou.com/cdn/shop/collections/Logo_MariaB.jpg?v=1656044490",
    description:
      "Maria.B pioneered in 1999 with one retail outlet and a small stitching unit. Her sole focus was to provide ready-to-wear fashion that reflected an elegant fusion of East and West. Today Maria.B is Pakistan’s most diverse designer fashion brand with unstitched, ready-to-wear, kids girls, menswear, boyswear, couture, bridalwear, jewelry, perfumes, and accessories all within one affordable label while boasting an extensive retail network with 38 outlets comprising 30 Maria.B outlets, 4 MBasics Stores and 4 Maria.B Kiosk in 12 different cities across the country while expanding our operations to U.K with our online store.",
  },
  {
    name: "Sana Safinaz",
    logo: "https://images.seeklogo.com/logo-png/24/2/sana-safinaz-logo-png_seeklogo-249755.png",
    description:
      "Sana Safinaz is part of SSFR (PVT.) LIMITED, established in 1989 by Sana Hashwani and Safinaz Muneer. As one of Pakistan’s most prestigious and diversified fashion labels, Sana Safinaz has consistently set new benchmarks in the fashion industry through innovation and creative excellence.Our collections span Pret, Diffusion, and Bridal Couture lines, along with an exclusive retail venture offering luxury ready-to-wear and premium fashion fabrics. Our designs combine tasteful prints, intricate embroidery, and avant-garde silhouettes, catering to the modern woman.Since the launch of our retail chain in 2013, Sana Safinaz outlets across Pakistan provide a complete fashion experience with trendy eastern and western ready-to-wear clothing, unstitched fabrics, accessories, and footwear." },
  {
    name: "Bonanza Satrangi",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCZClMNdR82a7kjOZBjnH9nuNq50hKa2kRg&s",
    description:
      "With over 40 years of experience, Bonanza continues its legacy of providing superior fabric, value for money and trendsetting apparel to its consumers. It all began in 1976 when the textile industry had not even flourished to its complete potential, that Bonanza initiated ready-made winter wear, particularly knits for men, women and children. From then on, Bonanza became a prestigious brand and won respect as the master of detail in the realm of ready-made garments manufacturing.With over 80+ outlets across Pakistan, Bonanza stands as an enormous textile giant today. However, looking at the market potential amongst clothing brands for women, Bonanza furthermore ventured into creating its exclusive women’s clothing line Satrangi in 2012 which has now become a one-stop clothing solution for the women of Pakistan . Thus we became to be known as Bonanza | Satrangi" },
  ];

const BrandPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold border-l-8 pl-3 mb-6" style={{ borderColor: "rgba(219, 68, 68, 1)" }}>Brands</h2>

      <div className="space-y-8">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg shadow-md"
          >
            <div className="md:w-3/4 text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-2">{brand.name}</h2>
              <p className="text-justify text-gray-700">{brand.description}</p>
            </div>
            <div className="md:w-1/4 flex justify-center md:justify-end mt-4 md:mt-0">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;