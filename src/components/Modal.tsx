import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/types";

interface ModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ user, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-md w-full mx-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {user && (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-4 mb-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-blue-600 font-medium text-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3 text-sm"
              >
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Phone
                  </label>
                  <p className="text-gray-800">{user.phone}</p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Website
                  </label>
                  <p className="text-gray-800">{user.website}</p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Company
                  </label>
                  <p className="text-gray-800">{user.company.name}</p>
                  <p className="text-xs text-gray-600 italic">
                    {user.company.catchPhrase}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Address
                  </label>
                  <p className="text-gray-800">
                    {user.address.suite} {user.address.street}
                  </p>
                  <p className="text-gray-800">
                    {user.address.city}, {user.address.zipcode}
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
