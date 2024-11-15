import React from 'react';
import { motion } from 'framer-motion';
import { DetailingType } from '../types';
import { fadeVariants } from '../utils/animations';

interface Props {
  onSelect: (type: DetailingType) => void;
}

export function DetailingTypeSelection({ onSelect }: Props) {
  return (
    <motion.div
      key="step2"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Service Type</h2>
      <div className="space-y-4">
        {['interior', 'exterior', 'both'].map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type as DetailingType)}
            className="w-full p-4 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-lg capitalize transition-colors"
          >
            {type}
          </button>
        ))}
      </div>
    </motion.div>
  );
}