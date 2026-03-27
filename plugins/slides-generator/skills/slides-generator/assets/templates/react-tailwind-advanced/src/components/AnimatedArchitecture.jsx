import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';

const AnimatedArchitecture = ({ architecture, theme }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(architecture.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(architecture.edges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Animated edge style
  const animatedEdgeStyle = {
    stroke: theme === 'tech' ? '#00f5ff' : '#a78bfa',
    strokeWidth: 2,
    animation: 'dash 1s linear infinite'
  };

  // Node animation variants
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Custom node component with animation
  const AnimatedNode = ({ data }) => (
    <motion.div
      className="px-4 py-2 rounded-lg shadow-lg border-2 border-cyan-400 bg-slate-800 text-white"
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)'
      }}
      onClick={() => setSelectedNode(data)}
      style={{
        minWidth: '120px',
        textAlign: 'center'
      }}
    >
      <div className="text-sm font-semibold">{data.label}</div>
      {data.subtitle && (
        <div className="text-xs opacity-75">{data.subtitle}</div>
      )}
      {data.icon && (
        <div className="mt-2">
          {data.icon}
        </div>
      )}
    </motion.div>
  );

  // Node types
  const nodeTypes = {
    animated: AnimatedNode
  };

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          type: 'animated',
          style: { background: 'transparent', border: 'none' }
        }))}
        edges={edges.map(edge => ({
          ...edge,
          animated: true,
          style: animatedEdgeStyle,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: theme === 'tech' ? '#00f5ff' : '#a78bfa'
          }
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-slate-900/50"
      >
        <Background
          color={theme === 'tech' ? '#00f5ff' : '#a78bfa'}
          gap={16}
          variant="dots"
        />
        <Controls
          className="bg-slate-800 border border-cyan-400/30"
        />
        <MiniMap
          className="bg-slate-800"
          maskColor="rgba(0, 0, 0, 0.5)"
          nodeColor="#00f5ff"
        />
      </ReactFlow>

      {/* Node detail panel */}
      {selectedNode && (
        <motion.div
          className="absolute top-4 right-4 w-80 bg-slate-800 border border-cyan-400 rounded-lg p-4 shadow-2xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-cyan-400">{selectedNode.label}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          {selectedNode.description && (
            <p className="text-sm text-gray-300 mb-2">
              {selectedNode.description}
            </p>
          )}
          {selectedNode.tech && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedNode.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-300">Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-300">Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-gray-300">Database</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-300">External Services</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedArchitecture;
