import React from 'react';
import { motion } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { fadeVariants } from '../utils/animations';
import 'react-day-picker/dist/style.css';

interface Props {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onContinue: () => void;
}

export function DateSelection({ selectedDate, onDateSelect, onContinue }: Props) {
  return (
    <motion.div
      key="step4"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Date</h2>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="bg-gray-800 p-4 rounded-lg mx-auto"
        classNames={{
          day_selected: "bg-cyan-600 text-white",
          day: "text-cyan-300 hover:bg-cyan-900/50",
        }}
      />
      {selectedDate && (
        <button
          onClick={onContinue}
          className="w-full p-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
        >
          Continue
        </button>
      )}
    </motion.div>
  );
}