import Image from "next/image";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  category: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/productPage?name=${encodeURIComponent(product.name)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-900 shadow-md mb-4 h-[300px] group transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-50 w-full mb-2 bg-gray-100 transition-transform duration-300 group-hover:-translate-y-2">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
        />
      </div>
      <h3 className="font-semibold text-center text-white">{product.name}</h3>
      <p className="text-sm text-white text-center mb-2">{product.desc}</p>
      <p className="text-white text-center text-sm">
        ₹{product.price.toLocaleString()}
      </p>
    </div>
  );
};

export default ProductCard;
