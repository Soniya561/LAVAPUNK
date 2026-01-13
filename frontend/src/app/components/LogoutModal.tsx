import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-[#FFD700] rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="bg-[#FFD700] bg-opacity-10 p-4 rounded-full mb-4 border-2 border-[#FFD700]">
            <LogOut className="w-8 h-8 text-[#FFD700]" />
          </div>

          <h2 className="text-white text-2xl mb-2">Logout Confirmation</h2>
          <p className="text-gray-400 mb-8">
            Are you sure you want to log out?
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-[#FFD700] text-black py-3 rounded-md hover:bg-[#FFC700] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
