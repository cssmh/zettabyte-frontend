// components/Card.tsx (Enhanced)
import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  title: string;
  body: string;
  id: number;
  index?: number;
  userId?: number;
}

const Card = ({ title, body, id, index = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between min-h-[180px]"
    >
      <div>
        <h3 className="text-lg font-semibold capitalize text-gray-800 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{body}</p>
      </div>
      <Link
        href={`/posts/${id}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
      >
        Read more
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </motion.div>
  );
};

export default Card;
