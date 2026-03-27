import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSlide = ({ slide, theme, isActive }) => {
  const themeClasses = {
    modern: 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white',
    minimalist: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-gray-100',
    colorful: 'bg-gradient-to-br from-pink-500 to-orange-400 text-white',
    tech: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'
  };

  const baseClasses = themeClasses[theme] || themeClasses.modern;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div
      className={`h-full w-full flex flex-col justify-center items-center p-8 md:p-16 ${baseClasses} relative overflow-hidden`}
    >
      {/* Animated background elements for tech theme */}
      {theme === 'tech' && (
        <>
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scaleX: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </>
      )}

      {/* Slide Number */}
      <motion.div
        className="absolute bottom-8 right-8 text-sm opacity-60"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {slide.number}
      </motion.div>

      <motion.div
        className="max-w-5xl w-full h-full flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="slide-content flex-1 space-y-6">
          {/* Slide Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            variants={itemVariants}
          >
            {slide.title}
          </motion.h1>

          {/* Slide Content */}
          {slide.content && (
            <motion.p
              className="text-xl md:text-2xl opacity-90"
              variants={itemVariants}
            >
              {slide.content}
            </motion.p>
          )}

          {/* Bullet Points with staggered animation */}
          {slide.bullets && slide.bullets.length > 0 && (
            <motion.ul
              className="space-y-4 text-lg md:text-xl"
              variants={containerVariants}
            >
              {slide.bullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.span
                    className="mr-3 text-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1
                    }}
                  >
                    •
                  </motion.span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* Author on Title Slide */}
          {slide.isTitle && slide.author && (
            <motion.p
              className="text-lg md:text-xl opacity-75 mt-8"
              variants={itemVariants}
            >
              {slide.author}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedSlide;
