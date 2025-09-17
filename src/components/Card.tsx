import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  title: string;
  body: string;
  id: number;
  index?: number;
}

const Card = ({ title, body, id, index = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{body}</p>
      <Link
        href={`/posts/${id}`}
        className="text-blue-500 hover:text-blue-700 font-medium"
      >
        Read more →
      </Link>
    </motion.div>
  );
};

export default Card;
