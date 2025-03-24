import { Link } from "react-router-dom"; 
import mensCollectionImage from "../../assets/images/mens-collection.webp";
import womensCollectionImage from "../../assets/images/womens-collection.webp";   

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
        <div className="relative flex-1 max-w-[500px]">
          <img 
            src={womensCollectionImage} 
            alt="Women's Collection" 
            className="w-full h-[450px] object-cover rounded shadow-lg" 
          />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 p-4 rounded ">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Women's Collection
            </h2>
            <Link to="/collections/all?gender=Women" className="text-gray-900 underline">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative flex-1 max-w-[500px]">
          <img 
            src={mensCollectionImage} 
            alt="Men's Collection" 
            className="w-full h-[450px] object-cover rounded  shadow-lg" 
          />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 p-4 rounded">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Men's Collection
            </h2>
            <Link to="/collections/all?gender=Men" className="text-gray-900 underline">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
