// components/MemoriaSecundariaSection.tsx
'use client';
import { motion } from 'framer-motion';
import { useState,  useEffect } from 'react';
import { wrap } from 'framer-motion';
import Image from 'next/image';

const MemoriaSecundariaSection = () => {
  // Estados para el carrusel
  const [[page, direction], setPage] = useState([0, 0]);
  //const [currentImage, setCurrentImage] = useState(0);
  
  // Imágenes para el carrusel (puedes reemplazar con tus propias rutas)
  const images = [
    "/hdd-diagram.svg",
    "/ssd-diagram.svg",
    "/storage-types.png",
    "/cloud-storage.svg"
  ];
  
  // Tipos de memoria secundaria
  const storageTypes = [
    {
      title: "Discos Duros (HDD)",
      description: "Utilizan discos magnéticos giratorios para almacenar datos. Alta capacidad y bajo costo por GB.",
      icon: "📀"
    },
    {
      title: "Unidades de Estado Sólido (SSD)",
      description: "Usan memoria flash, son más rápidas, silenciosas y resistentes que los HDD.",
      icon: "💾"
    },
    {
      title: "Medios Ópticos",
      description: "CDs, DVDs y Blu-ray. Utilizan tecnología láser para leer y escribir datos.",
      icon: "💿"
    },
    {
      title: "Almacenamiento en la Nube",
      description: "Datos almacenados en servidores remotos accesibles a través de internet.",
      icon: "☁️"
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
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100"
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
            Memoria Secundaria
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
              La <span className="font-semibold text-blue-600">memoria secundaria</span>, también conocida como almacenamiento secundario, es un tipo de memoria no volátil que se utiliza para almacenar datos de forma permanente, incluso cuando el dispositivo está apagado. A diferencia de la memoria principal (RAM), la memoria secundaria retiene la información a largo plazo.
            </motion.p>
            
            <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Este tipo de memoria es fundamental en sistemas informáticos porque permite guardar grandes cantidades de datos, programas y archivos del sistema operativo. Su capacidad es mucho mayor que la memoria principal, aunque su velocidad de acceso es más lenta.
            </motion.p>
            
            <motion.div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Características clave:</h3>
              <ul className="space-y-3">
                {[
                  "No volátil: Conserva los datos sin necesidad de energía eléctrica",
                  "Alta capacidad de almacenamiento (desde GB hasta TB)",
                  "Más económica que la memoria principal",
                  "Velocidad de acceso más lenta que la RAM"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-green-500 mr-2">✓</span>
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
                  {/* Imagen real iría aquí */}
                  <Image
                    src={images[imageIndex]}
                    alt={`Diagrama de ${images[imageIndex]}`}
                    width={600}
                    height={400}
                    className="object-contain w-full h-full"
                  />
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
                    className={`w-3 h-3 rounded-full ${index === imageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
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
        
        {/* Tipos de memoria secundaria */}
        <motion.div 
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Tipos de Memoria Secundaria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storageTypes.map((type, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-blue-600">{type.title}</h4>
                <p className="text-gray-700">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Comparativa HDD vs SSD */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Comparación: HDD vs SSD</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <th className="py-3 px-4 text-left">Característica</th>
                  <th className="py-3 px-4 text-center">HDD</th>
                  <th className="py-3 px-4 text-center">SSD</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Velocidad", "Más lento (100-150 MB/s)", "Más rápido (500-3500 MB/s)"],
                  ["Durabilidad", "Partes móviles, más susceptible a daños", "Sin partes móviles, más resistente"],
                  ["Consumo", "Mayor consumo energético", "Menor consumo energético"],
                  ["Ruido", "Genera ruido por discos giratorios", "Silencioso"],
                  ["Precio", "Menor costo por GB", "Mayor costo por GB"],
                  ["Tiempo de acceso", "5-10 ms", "0.1 ms"]
                ].map(([feature, hdd, ssd], index) => (
                  <motion.tr 
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    whileHover={{ backgroundColor: "#f0f9ff" }}
                  >
                    <td className="py-3 px-4 border-b border-gray-200 font-medium text-gray-800">{feature}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center text-gray-800">{hdd}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center text-green-600 font-medium">{ssd}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Evolución del almacenamiento */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Evolución del Almacenamiento</h3>
          <div className="relative h-32">
            {[
              { year: "1980", tech: "Diskettes 5.25\"", capacity: "360 KB" },
              { year: "1990", tech: "CD-ROM", capacity: "650 MB" },
              { year: "2000", tech: "DVD", capacity: "4.7 GB" },
              { year: "2010", tech: "HDD", capacity: "1-2 TB" },
              { year: "2020", tech: "SSD NVMe", capacity: "2-4 TB" },
              { year: "2025", tech: "QLC SSD", capacity: "8-16 TB" },
            ].map((item, index, arr) => (
              <motion.div 
                key={index}
                className="absolute flex flex-col items-center"
                style={{ left: `${(index / (arr.length - 1)) * 100}%`, top: "50%", transform: "translate(-50%, -50%)" }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              >
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center min-w-[120px]">
                  <div className="font-bold text-blue-600">{item.year}</div>
                  <div className="text-sm text-gray-800">{item.tech}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.capacity}</div>
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-4 h-4 bg-blue-500 rounded-full"></div>
              </motion.div>
            ))}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MemoriaSecundariaSection;