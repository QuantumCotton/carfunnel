import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceType, VehicleType, DetailingType, TimeSlot } from './types';
import { ServiceSelection } from './components/ServiceSelection';
import { VehicleTypeSelection } from './components/VehicleTypeSelection';
import { DetailingTypeSelection } from './components/DetailingTypeSelection';
import { AddOnsSelection } from './components/AddOnsSelection';
import { DateSelection } from './components/DateSelection';
import { TimeAndConfirm } from './components/TimeAndConfirm';
import { SuccessMessage } from './components/SuccessMessage';
import { sendEmail } from './utils/email';

function App() {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType>(null);
  const [vehicleType, setVehicleType] = useState<VehicleType>(null);
  const [detailingType, setDetailingType] = useState<DetailingType>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(null);
  const [email, setEmail] = useState('');

  const handleServiceSelect = (type: ServiceType) => {
    setServiceType(type);
    setStep(2);
  };

  const handleVehicleSelect = (type: VehicleType) => {
    setVehicleType(type);
    setStep(3);
  };

  const handleDetailingTypeSelect = (type: DetailingType) => {
    setDetailingType(type);
    setStep(4);
  };

  const handleAddOnToggle = (id: number) => {
    setSelectedAddOns(prev =>
      prev.includes(id)
        ? prev.filter(addOnId => addOnId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      throw new Error('Please select a date');
    }

    const formData = {
      serviceType,
      vehicleType,
      detailingType,
      addOns: selectedAddOns,
      date: selectedDate.toLocaleDateString(),
      time: timeSlot,
      email,
    };

    await sendEmail(formData);
    setStep(7);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900/20 to-gray-900 text-cyan-300 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxwYXRoIGQ9Ik0wIDAgTDIwMCAyMDBNMjAwIDAgTDAgMjAwIiBzdHJva2U9InJnYmEoMTAzLDIzMiwyNDksMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')] opacity-20"></div>
      
      <motion.div 
        className="max-w-md w-full backdrop-blur-sm bg-gray-800/40 p-8 rounded-2xl shadow-2xl border border-cyan-500/30 relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent rounded-2xl"></div>
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {step === 1 && <ServiceSelection onSelect={handleServiceSelect} />}
            {step === 2 && serviceType === 'detailing' && (
              <VehicleTypeSelection onSelect={handleVehicleSelect} />
            )}
            {step === 3 && <DetailingTypeSelection onSelect={handleDetailingTypeSelect} />}
            {step === 4 && (
              <AddOnsSelection
                selectedAddOns={selectedAddOns}
                onAddOnToggle={handleAddOnToggle}
                onContinue={() => setStep(5)}
              />
            )}
            {step === 5 && (
              <DateSelection
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onContinue={() => setStep(6)}
              />
            )}
            {step === 6 && (
              <TimeAndConfirm
                timeSlot={timeSlot}
                email={email}
                onTimeSelect={setTimeSlot}
                onEmailChange={setEmail}
                onSubmit={handleSubmit}
              />
            )}
            {step === 7 && <SuccessMessage />}
          </AnimatePresence>

          {step > 1 && step < 7 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2 group"
            >
              <span className="transform transition-transform group-hover:-translate-x-1">←</span>
              <span>Back</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;