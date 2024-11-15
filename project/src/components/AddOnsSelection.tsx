import React from 'react';
import { motion } from 'framer-motion';
import { AddOn } from '../types';
import { addOns } from '../data/addOns';
import { fadeVariants } from '../utils/animations';

interface Props {
  selectedAddOns: number[];
  onAddOnToggle: (id: number) => void;
  onContinue: () => void;
}

export function AddOnsSelection({ selectedAddOns, onAddOnToggle, onContinue }: Props) {
  return (
    <motion.div
      key="step3"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Add-ons</h2>
      <div className="space-y-4">
        {addOns.map((addon) => (
          <label
            key={addon.id}
            className="flex items-center justify-between p-4 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-lg cursor-pointer"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedAddOns.includes(addon.id)}
                onChange={() => onAddOnToggle(addon.id)}
                className="mr-3"
              />
              <span>{addon.name}</span>
            </div>
            <span>${addon.price}</span>
          </label>
        ))}
        <button
          onClick={onContinue}
          className="w-full p-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg mt-4 transition-colors"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}