import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  title: string;
  body: string;
  id: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Card = ({ title, body, id }: CardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between min-h-[180px] border border-gray-100"
    >
      <h3 className="text-lg md:text-xl font-semibold mb-2 line-clamp-1 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{body}</p>
      <Link
        href={`/posts/${id}`}
        className="mt-auto text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base"
      >
        Read more →
      </Link>
    </motion.div>
  );
};

export default Card;
