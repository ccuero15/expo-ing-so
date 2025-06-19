// pages/index.tsx
'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';

const HomePage = () => {
  // Secciones de la aplicación
  const sections = [
    {
      path: '/memoria',
      title: 'Memoria Secundaria',
      description: 'Almacenamiento permanente de datos',
      icon: '💾',
      bgColor: 'bg-blue-500'
    },
    {
      path: '/cache',
      title: 'Memoria Cache',
      description: 'Acelerando el acceso a datos frecuentes',
      icon: '⚡',
      bgColor: 'bg-green-500'
    },
    {
      path: '/swap',
      title: 'Espacio Swap',
      description: 'Memoria virtual en disco',
      icon: '🔄',
      bgColor: 'bg-yellow-500'
    },
    {
      path: '/dir',
      title: 'Directorios',
      description: 'Organización jerárquica de archivos',
      icon: '📁',
      bgColor: 'bg-purple-500'
    },
    {
      path: '/sisJerarquico',
      title: 'Sistema Jerárquico',
      description: 'Estructura en árbol para archivos',
      icon: '🌳',
      bgColor: 'bg-red-500'
    }
  ];

  // Configuración para el cambio de color del fondo
  const colorProgress = useMotionValue(0);
  const backgroundColor = useTransform(
    colorProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'hsl(210, 60%, 97%)', // Azul muy claro
      'hsl(120, 60%, 97%)', // Verde muy claro
      'hsl(60, 60%, 97%)',  // Amarillo muy claro
      'hsl(270, 60%, 97%)', // Morado muy claro
      'hsl(0, 60%, 97%)'    // Rojo muy claro
    ]
  );

  // Animación del fondo
  useEffect(() => {
    const animation = animate(colorProgress, 1, {
      duration: 30,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    });

    return () => animation.stop();
  }, [colorProgress]);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor }}
    >
      {/* Contenido principal */}
      <div className="max-w-4xl w-full px-4">
        {/* Título simple */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Explorando Sistemas de Archivos
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre los componentes fundamentales que hacen posible el almacenamiento 
            y organización de datos en sistemas informáticos modernos.
          </p>
        </div>
        
        {/* Tarjetas minimalistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <Link key={index} href={section.path} passHref>
              <div className={`${section.bgColor} rounded-xl p-6 shadow-sm cursor-pointer h-40 flex flex-col justify-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px]`}>
                <div className="text-center">
                  <div className="text-3xl mb-3">{section.icon}</div>
                  <h2 className="text-xl font-bold mb-2 text-white">{section.title}</h2>
                  <p className="text-gray-100">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pie de página simple */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Sistema de archivos - Fundamentos de almacenamiento</p>
          <div className="mt-3 flex justify-center">
            <div className="w-24 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;