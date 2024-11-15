import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { fadeVariants } from '../utils/animations';

const beforeAfterImages = [
  {
    before: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800',
    after: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&w=800',
    title: 'Exterior Detailing'
  },
  {
    before: 'https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?auto=format&fit=crop&w=800',
    after: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800',
    title: 'Interior Detailing'
  },
  {
    before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800',
    after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800',
    title: 'Paint Correction'
  }
];

export function SuccessMessage() {
  return (
    <motion.div
      key="success"
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <CheckCircle className="w-16 h-16 mx-auto text-cyan-400" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Your Car's Spa Day Awaits!
        </h2>
        <p className="text-cyan-300/80">
          Thank you for choosing our premium detailing services. We'll make your car shine like never before!
        </p>
        <p className="text-sm text-cyan-300/60 mb-8">
          Confirmation details have been sent to your email.
        </p>
      </div>

      <div className="space-y-12">
        {beforeAfterImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-center text-cyan-400">{image.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <motion.img
                  src={image.before}
                  alt="Before"
                  className="w-full h-48 object-cover rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="absolute bottom-2 left-2 text-white text-sm font-medium">Before</span>
                </div>
              </div>
              <div className="relative group">
                <motion.img
                  src={image.after}
                  alt="After"
                  className="w-full h-48 object-cover rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="absolute bottom-2 left-2 text-white text-sm font-medium">After</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}