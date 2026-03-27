import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const AnimatedChart = ({ data, type = 'bar', title, theme }) => {
  const [animatedData, setAnimatedData] = useState(
    data.map(item => ({ ...item, value: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  // Theme colors
  const colors = {
    modern: ['#667eea', '#764ba2', '#a78bfa', '#c4b5fd', '#ddd6fe'],
    tech: ['#00f5ff', '#b026ff', '#00ff88', '#ff0080', '#ffcc00'],
    colorful: ['#f093fb', '#f5576c', '#fbbf24', '#34d399', '#60a5fa']
  };

  const chartColors = colors[theme] || colors.modern;

  // Custom tooltip with animation
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          className="bg-slate-800 border border-cyan-400 rounded-lg p-3 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-cyan-400 font-semibold">{label}</p>
          <p className="text-white text-sm">
            Value: {payload[0].value}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  // Render chart based on type
  const renderChart = () => {
    const commonProps = {
      data: animatedData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              stroke={theme === 'tech' ? '#00f5ff' : '#fff'}
              tick={{ fill: theme === 'tech' ? '#00f5ff' : '#fff' }}
            />
            <YAxis
              stroke={theme === 'tech' ? '#00f5ff' : '#fff'}
              tick={{ fill: theme === 'tech' ? '#00f5ff' : '#fff' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="value"
              animationDuration={1500}
              animationBegin={300}
            >
              {animatedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              stroke={theme === 'tech' ? '#00f5ff' : '#fff'}
              tick={{ fill: theme === 'tech' ? '#00f5ff' : '#fff' }}
            />
            <YAxis
              stroke={theme === 'tech' ? '#00f5ff' : '#fff'}
              tick={{ fill: theme === 'tech' ? '#00f5ff' : '#fff' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColors[0]}
              strokeWidth={3}
              dot={{ fill: chartColors[0], r: 6 }}
              activeDot={{ r: 8, stroke: chartColors[1], strokeWidth: 2 }}
              animationDuration={2000}
              animationBegin={300}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart width={400} height={400}>
            <Pie
              data={animatedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={120}
              fill={chartColors[0]}
              dataKey="value"
              animationDuration={1500}
              animationBegin={300}
            >
              {animatedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {title && (
        <motion.h3
          className="text-2xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AnimatedChart;
