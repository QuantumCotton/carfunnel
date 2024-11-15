import React from 'react';
import { motion } from 'framer-motion';
import { Car, Truck } from 'lucide-react';
import { VehicleType } from '../types';
import { fadeVariants } from '../utils/animations';

interface Props {
  onSelect: (type: VehicleType) => void;
}

const vehicleTypes = [
  { id: 'coupe', label: 'Coupe', icon: Car, description: 'Sports & Compact Cars' },
  { id: 'sedan', label: 'Sedan', icon: Car, description: '4-Door Cars' },
  { id: 'small-suv', label: 'Small SUV/Truck', icon: Truck, description: 'Crossovers & Mid-size' },
  { id: 'large-suv', label: 'Large SUV/Truck', icon: Truck, description: 'Full-size & Heavy Duty' },
];

export function VehicleTypeSelection({ onSelect }: Props) {
  return (
    <motion.div
      key="step2"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Select Vehicle Type</h2>
      <div className="grid grid-cols-2 gap-4">
        {vehicleTypes.map(({ id, label, icon: Icon, description }) => (
          <button
            key={id}
            onClick={() => onSelect(id as VehicleType)}
            className="group relative flex flex-col items-center p-4 bg-cyan-900/30 hover:bg-cyan-800/40 rounded-xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Icon className="w-8 h-8 mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">{label}</span>
            <span className="text-xs text-cyan-400/60 mt-1">{description}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}