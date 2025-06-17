'use client';
// components/CacheSection.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { wrap } from 'framer-motion';
import Image from 'next/image';

const CacheSection = () => {
  // Estados para el carrusel
  const [[page, direction], setPage] = useState([0, 0]);
  
  // Imágenes para el carrusel
  const images = [
    "/cache-hierarchy.png",
    "/cache-mapping.png",
    "/cache-access.png",
    "/cpu-cache.png"
  ];
  
  // Niveles de caché
  const cacheLevels = [
    {
      title: "Caché L1",
      description: "La caché más rápida y cercana al procesador, dividida en instrucciones y datos.",
      size: "32-64 KB por núcleo",
      speed: "1-4 ciclos de CPU",
      icon: "🚀"
    },
    {
      title: "Caché L2",
      description: "Más grande que L1 pero más lenta, sirve como intermediaria entre L1 y L3.",
      size: "256-512 KB por núcleo",
      speed: "10-20 ciclos",
      icon: "⚡"
    },
    {
      title: "Caché L3",
      description: "Caché compartida entre todos los núcleos, la más grande pero más lenta.",
      size: "2-32 MB por procesador",
      speed: "30-50 ciclos",
      icon: "🔗"
    },
    {
      title: "Caché L4 (eDRAM)",
      description: "En algunos sistemas, actúa como buffer entre memoria principal y caché L3.",
      size: "64-128 MB",
      speed: "50-100 ciclos",
      icon: "🔄"
    }
  ];
  
  // Políticas de escritura
  const writePolicies = [
    { 
      name: "Write-Through", 
      description: "Escribe simultáneamente en caché y memoria principal",
      pros: ["Consistencia inmediata", "Sencilla implementación"],
      cons: ["Mayor latencia", "Alto tráfico de bus"],
      icon: "📝"
    },
    { 
      name: "Write-Back", 
      description: "Escribe solo en caché y actualiza memoria principal más tarde",
      pros: ["Menor latencia", "Menor tráfico de bus"],
      cons: ["Posible inconsistencia", "Compleja implementación"],
      icon: "⏱️"
    }
  ];
  
  // Animación para cambiar imágenes
  const imageIndex = wrap(0, images.length, page);
  
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  
  // Animación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [page]);

  return (
    <motion.section 
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-teal-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Memoria Caché
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff4694] to-[#776fff] mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido informativo */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed">
              La <span className="font-semibold text-green-600">memoria caché</span> es un componente de hardware o software que almacena datos temporalmente para que futuras solicitudes de esos datos puedan atenderse con mayor rapidez. Actúa como un buffer entre la CPU y la memoria principal, reduciendo significativamente el tiempo de acceso a datos frecuentemente utilizados.
            </motion.p>
            
            <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Su funcionamiento se basa en el principio de localidad: los programas tienden a acceder repetidamente a las mismas instrucciones y datos. Al almacenar esta información en caché, se evitan accesos lentos a la memoria principal, acelerando la ejecución de programas hasta en un 40%.
            </motion.p>
            
            <motion.div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-green-700">¿Cómo funciona?</h3>
              <ul className="space-y-3">
                {[
                  "1. CPU solicita datos a la memoria",
                  "2. Primero se busca en caché L1",
                  "3. Si no está (cache miss), busca en L2",
                  "4. Si no está en L2, busca en L3",
                  "5. Si no está en caché, accede a RAM",
                  "6. Los datos accedidos se almacenan en caché"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-green-500 mr-2">{index < 5 ? "→" : "✓"}</span>
                    <span className='text-gray-800'>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          {/* Carrusel interactivo */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-white">
              <motion.div
                key={page}
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                {/* Contenedor de imagen con animación */}
                <motion.div 
                  className="w-4/5 h-4/5 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring" }}
                >
                <Image
                    src={images[imageIndex]}
                    alt={`Diagrama de ${images[imageIndex]}`}
                    width={800}
                    height={600}
                    className="object-contain max-w-full max-h-full"
                />    
                  {/* Imagen real iría aquí */}
               {/*    <span className="text-center p-4">
                    Diagrama de {images[imageIndex].replace("/", "").replace(".svg", "").replace("-", " ")}
                  </span> */}
                </motion.div>
              </motion.div>
              
              {/* Controles del carrusel */}
              <button 
                onClick={() => paginate(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                aria-label="Imagen anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => paginate(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                aria-label="Siguiente imagen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
                    className={`w-3 h-3 rounded-full ${index === imageIndex ? 'bg-green-600' : 'bg-gray-300'}`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <motion.div 
              className="mt-6 text-center text-gray-600 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {images[imageIndex].replace("/", "").replace(".svg", "").replace("-", " ")}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Niveles de caché */}
        <motion.div 
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Niveles de Memoria Caché</h3>
          <div className="flex justify-center mb-8">
            <div className="w-3/4 h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full relative">
              {cacheLevels.map((_, index) => (
                <motion.div 
                  key={index}
                  className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-green-500 shadow-lg"
                  style={{ left: `${(index / (cacheLevels.length - 1)) * 100}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cacheLevels.map((level, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-3">{level.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-green-600">{level.title}</h4>
                    <div className="flex space-x-2 mb-3">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{level.size}</span>
                      <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">{level.speed}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-3">{level.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Políticas de escritura */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border border-green-100"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Políticas de Escritura</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {writePolicies.map((policy, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{policy.icon}</div>
                    <h4 className="text-xl font-bold text-green-700">{policy.name}</h4>
                  </div>
                  <p className="text-gray-700 mb-4">{policy.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-600 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Ventajas
                      </h5>
                      <ul className="space-y-1">
                        {policy.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-1">✓</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        Desventajas
                      </h5>
                      <ul className="space-y-1">
                        {policy.cons.map((con, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start">
                            <span className="text-red-500 mr-1">✗</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={`px-6 py-3 text-center ${
                  index === 0 ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {index === 0 ? "Usada en sistemas que requieren alta consistencia" : "Usada en sistemas que priorizan velocidad"}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Jerarquía de memoria */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Jerarquía de Memoria</h3>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              {[
                { name: "Registros", speed: "1 ciclo", size: "KB", cost: "Muy alto" },
                { name: "Caché L1", speed: "1-4 ciclos", size: "KB", cost: "Alto" },
                { name: "Caché L2", speed: "10-20 ciclos", size: "KB-MB", cost: "Medio-alto" },
                { name: "Caché L3", speed: "30-50 ciclos", size: "MB", cost: "Medio" },
                { name: "RAM", speed: "100-300 ciclos", size: "GB", cost: "Bajo" },
                { name: "Almacenamiento", speed: "10,000+ ciclos", size: "GB-TB", cost: "Muy bajo" }
              ].map((level, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center mb-4 p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ backgroundColor: "#f0fdf4" }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="font-bold text-gray-800">{level.name}</div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Velocidad: {level.speed}</span>
                      <span>Tamaño: {level.size}</span>
                      <span>Costo: {level.cost}</span>
                    </div>
                  </div>
                  <div className="text-2xl">
                    {index < 3 ? "⚡" : index === 3 ? "🔰" : index === 4 ? "💾" : "💿"}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 text-center max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <h4 className="text-xl font-semibold mb-3 text-green-700">Principio de Jerarquía</h4>
              <p className="text-gray-700">
                La jerarquía de memoria organiza los tipos de almacenamiento en niveles según su velocidad, tamaño y costo. 
                Los niveles superiores (registros, caché) son más rápidos pero más caros y pequeños, mientras que los niveles 
                inferiores (RAM, almacenamiento) son más lentos pero más baratos y con mayor capacidad.
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Optimización de caché */}
        <motion.div 
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Técnicas de Optimización</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Prefetching",
                description: "Cargar datos en caché antes de que sean solicitados",
                example: "Predecir próximas instrucciones",
                icon: "🔮"
              },
              {
                title: "Asociatividad",
                description: "Número de bloques en cada conjunto de caché",
                example: "Caché directa, asociativa, totalmente asociativa",
                icon: "🧩"
              },
              {
                title: "Algoritmos de Reemplazo",
                description: "Decidir qué datos eliminar cuando la caché está llena",
                example: "LRU (Least Recently Used), FIFO, LFU",
                icon: "🔄"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.2 + index * 0.2, duration: 0.5 }}
                whileHover={{ 
                  rotate: index % 2 === 0 ? 1 : -1,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{tech.icon}</div>
                  <h4 className="text-xl font-bold text-green-600">{tech.title}</h4>
                </div>
                <p className="text-gray-700 mb-3">{tech.description}</p>
                <div className="text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                  {tech.example}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CacheSection;