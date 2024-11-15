import React from 'react';
import { motion } from 'framer-motion';
import { Car, Wrench } from 'lucide-react';
import { ServiceType } from '../types';
import { fadeVariants } from '../utils/animations';

interface Props {
  onSelect: (type: ServiceType) => void;
}

export function ServiceSelection({ onSelect }: Props) {
  return (
    <motion.div
      key="step1"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Service</h2>
      <div className="space-y-4">
        <button
          onClick={() => onSelect('detailing')}
          className="w-full p-4 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-lg flex items-center justify-between transition-colors"
        >
          <span>Premium Detailing</span>
          <Car className="w-6 h-6" />
        </button>
        <button
          onClick={() => onSelect('services')}
          className="w-full p-4 bg-cyan-900/50 hover:bg-cyan-800/50 rounded-lg flex items-center justify-between transition-colors"
        >
          <span>Maintenance Services</span>
          <Wrench className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}