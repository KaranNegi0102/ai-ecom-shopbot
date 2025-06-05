// import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  // image: string;
  desc: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="relative h-40 w-full mb-2">
        {/* <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        /> */}
      </div>
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.desc}</p>
      <p className="text-blue-600 font-bold">
        ₹{product.price.toLocaleString()}
      </p>
    </div>
  );
};

export default ProductCard;
