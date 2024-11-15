import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TimeSlot } from '../types';
import { fadeVariants } from '../utils/animations';
import { AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  timeSlot: TimeSlot;
  email: string;
  onTimeSelect: (time: TimeSlot) => void;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function TimeAndConfirm({ timeSlot, email, onTimeSelect, onEmailChange, onSubmit }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeSlot || !email) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(e);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      key="step5"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Time & Confirm</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {['9:00 AM', '1:30 PM'].map((time) => (
            <button
              key={time}
              onClick={() => onTimeSelect(time as TimeSlot)}
              className={`p-4 rounded-lg transition-colors ${
                timeSlot === time
                  ? 'bg-cyan-600'
                  : 'bg-cyan-900/50 hover:bg-cyan-800/50'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={!timeSlot || !email || isSubmitting}
            className="w-full p-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Confirming...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}