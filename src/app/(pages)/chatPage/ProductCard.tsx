import Image from "next/image";

type Product = {
  name: string;
  price: number;
  image: string;
  desc: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-[#2b2b2b] border-1 border-black shadow-md mb-4 h-[400px] group transition-transform duration-300 hover:-translate-y-2">
      <div className="relative h-60 w-full border-b-1 border-black mb-2 bg-gray-100 transition-transform duration-300 group-hover:-translate-y-2">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
        />
      </div>
      <h3 className="font-semibold text-center mt-[35px] text-white">
        {product.name}
      </h3>
      <p className="text-sm text-white text-center mb-2">{product.desc}</p>
      <p className="text-white text-center font-bold">
        ₹{product.price.toLocaleString()}
      </p>
    </div>
  );
};

export default ProductCard;
