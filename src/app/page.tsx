// pages/index.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  // Secciones de la aplicación
  const sections = [
    {
      path: '/memoria',
      title: 'Memoria Secundaria',
      description: 'Almacenamiento permanente de datos',
      icon: '💾',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      path: '/cache',
      title: 'Memoria Cache',
      description: 'Acelerando el acceso a datos frecuentes',
      icon: '⚡',
      color: 'from-green-500 to-teal-600'
    },
    {
      path: '/swap',
      title: 'Espacio Swap',
      description: 'Memoria virtual en disco',
      icon: '🔄',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      path: '/dir',
      title: 'Directorios',
      description: 'Organización jerárquica de archivos',
      icon: '📁',
      color: 'from-purple-500 to-pink-600'
    },
    {
      path: '/sisJerarquico',
      title: 'Sistema Jerárquico',
      description: 'Estructura en árbol para archivos',
      icon: '🌳',
      color: 'from-red-500 to-orange-600'
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Fondo interactivo suavizado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Capa base estática */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,50,0.8)_0%,rgba(10,10,20,1)_70%)]"></div>
        
        {/* Elementos de fondo sutiles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, 
                hsl(${200 + i * 30}, 60%, 60%), 
                transparent 70%)`
            }}
            animate={{
              x: mousePosition.x * 0.05,
              y: mousePosition.y * 0.05,
            }}
            transition={{ 
              type: "tween", 
              ease: "easeOut",
              duration: 2
            }}
          />
        ))}
        
        {/* Gradiente central suave */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(56, 189, 248, 0.05), 
              rgba(15, 23, 42, 0) 80%
            )`
          }}
          transition={{ 
            type: "tween",
            ease: "easeOut",
            duration: 1.5
          }}
        />
      </div>

      {/* Contenido principal */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl w-full px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          animate={{
            background: `linear-gradient(
              to right, 
              hsl(${200 + mousePosition.x * 0.5}, 80%, 70%), 
              hsl(${250 + mousePosition.y * 0.5}, 80%, 70%)
            )`
          }}
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          transition={{ duration: 1 }}
        >
          Explorando Sistemas de Archivos
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Descubre los componentes fundamentales que hacen posible el almacenamiento 
          y organización de datos en sistemas informáticos modernos.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <Link key={index} href={section.path} passHref>
              <motion.div
                className={`bg-gradient-to-br ${section.color} rounded-2xl p-6 shadow-xl cursor-pointer h-48 flex flex-col justify-center relative overflow-hidden`}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                {/* Efecto de fondo en tarjeta */}
                <motion.div 
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: `radial-gradient(
                      circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(255, 255, 255, 0.2), 
                      transparent 70%
                    )`
                  }}
                  transition={{ 
                    type: "tween",
                    ease: "easeOut",
                    duration: 1.5
                  }}
                />
                
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{section.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                  <p className="text-gray-200">{section.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>Sistema de archivos - Fundamentos de almacenamiento</p>
          <div className="mt-2 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-50"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;