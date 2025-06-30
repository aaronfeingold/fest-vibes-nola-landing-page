"use client";

import EnhancedBetaSignup from "./EnhancedBetaSignup";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BetaSignupModal({
  isOpen,
  onClose,
}: BetaSignupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold transition-colors"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            🎵 Join the Beta!
          </h3>
          <p className="text-gray-300">
            Be the first to experience Fest Vibes when we launch in New Orleans.
          </p>
        </div>

        <EnhancedBetaSignup onClose={onClose} />
      </div>
    </div>
  );
}
