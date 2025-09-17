import { motion } from "framer-motion";
import { User } from "@/types";

interface ModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ user, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        {user && (
          <div className="space-y-3 text-black">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-semibold">Website:</span> {user.website}
            </p>
            <p>
              <span className="font-semibold">Company:</span>{" "}
              {user.company.name}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {user.address.street}, {user.address.city}
            </p>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
