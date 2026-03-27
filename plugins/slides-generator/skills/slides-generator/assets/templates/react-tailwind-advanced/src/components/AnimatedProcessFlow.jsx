import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle } from 'lucide-react';

const AnimatedProcessFlow = ({ steps, theme }) => {
  const themeStyles = {
    tech: {
      line: 'bg-gradient-to-r from-cyan-400 to-purple-500',
      card: 'bg-slate-800 border-cyan-400',
      text: 'text-cyan-400'
    },
    modern: {
      line: 'bg-gradient-to-r from-purple-400 to-indigo-500',
      card: 'bg-white/10 border-purple-300',
      text: 'text-purple-300'
    }
  };

  const styles = themeStyles[theme] || themeStyles.modern;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Connection Line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
        <motion.div
          className={`h-full ${styles.line}`}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />
      </div>

      {/* Process Steps */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-5xl">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.2,
              type: 'spring',
              stiffness: 100
            }}
            viewport={{ once: true }}
          >
            {/* Step Card */}
            <motion.div
              className={`p-6 rounded-xl border-2 shadow-xl backdrop-blur-sm ${styles.card}`}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Step Number */}
              <motion.div
                className={`w-12 h-12 rounded-full ${styles.line} flex items-center justify-center text-white font-bold text-xl mb-3`}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {index + 1}
              </motion.div>

              {/* Step Icon */}
              {step.icon && (
                <div className="mb-3">
                  {step.icon}
                </div>
              )}

              {/* Step Title */}
              <h3 className={`text-lg font-bold ${styles.text} mb-2`}>
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-sm text-gray-300 text-center max-w-xs">
                {step.description}
              </p>

              {/* Completion Status */}
              {step.completed && (
                <motion.div
                  className="mt-3 flex items-center gap-2 text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <CheckCircle size={16} />
                  <span className="text-xs">Complete</span>
                </motion.div>
              )}
            </motion.div>

            {/* Arrow to next step */}
            {index < steps.length - 1 && (
              <motion.div
                className="mt-4"
                animate={{
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                <ChevronRight
                  className={theme === 'tech' ? 'text-cyan-400' : 'text-purple-300'}
                  size={32}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: '50%'
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedProcessFlow;
