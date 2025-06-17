'use client';

// components/SistemaJerarquicoSection.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { wrap } from 'framer-motion';
import Image from 'next/image';

const SistemaJerarquicoSection = () => {
  // Estados para el carrusel
  const [[page, direction], setPage] = useState([0, 0]);
  
  // Imágenes para el carrusel
  const images = [
    "/hierarchy-tree.png",
    "/permissions-diagram.jpg",
  ];
  
  // Ventajas del sistema jerárquico
  const advantages = [
    {
      title: "Organización Lógica",
      description: "Agrupa archivos relacionados en directorios y subdirectorios",
      icon: "📂"
    },
    {
      title: "Facilidad de Navegación",
      description: "Rutas claras para acceder a cualquier archivo",
      icon: "🧭"
    },
    {
      title: "Gestión de Permisos",
      description: "Control de acceso por niveles de directorio",
      icon: "🔐"
    },
    {
      title: "Eficiencia en Búsquedas",
      description: "Búsqueda más rápida al reducir el ámbito",
      icon: "🔍"
    }
  ];
  
  // Sistemas de archivos jerárquicos
  const filesystems = [
    {
      name: "EXT4",
      os: "Linux",
      features: ["Journaling", "Soporte grandes archivos", "Asignación retardada"],
      icon: "🐧"
    },
    {
      name: "NTFS",
      os: "Windows",
      features: ["Compresión", "Encriptación", "Cuotas de disco"],
      icon: "🪟"
    },
    {
      name: "APFS",
      os: "macOS",
      features: ["Snapshots", "Clonación", "Encriptación nativa"],
      icon: "🍎"
    },
    {
      name: "ZFS",
      os: "Solaris/BSD",
      features: ["Pool de almacenamiento", "Checksums", "Deduplicación"],
      icon: "💾"
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
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-100"
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
            Sistema de Archivos Jerárquico
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
              Un <span className="font-semibold text-red-600">sistema de archivos jerárquico</span> organiza los datos en una estructura de árbol, comenzando con un directorio raíz que contiene subdirectorios y archivos. Este modelo permite una organización lógica y escalable de la información, donde cada nodo puede contener otros nodos (subdirectorios) u hojas (archivos).
            </motion.p>
            
            <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Desarrollado originalmente en los años 70 para sistemas UNIX, este modelo se ha convertido en el estándar para la mayoría de sistemas operativos modernos. Su principal ventaja es la capacidad de agrupar archivos relacionados en directorios, creando una estructura intuitiva que refleja relaciones lógicas entre los datos.
            </motion.p>
            
            <motion.div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-red-700">Elementos Clave</h3>
              <ul className="space-y-3">
                {[
                  "Directorio Raíz (/): El punto de entrada de todo el sistema",
                  "Subdirectorios: Divisiones lógicas dentro de directorios",
                  "Archivos: Unidades básicas de almacenamiento",
                  "Metadatos: Información sobre archivos y directorios",
                  "Enlaces: Conexiones entre diferentes partes del sistema"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-red-500 mr-2">{index === 0 ? "🌱" : index === 1 ? "📁" : index === 2 ? "📄" : index === 3 ? "🏷️" : "🔗"}</span>
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
                    alt={`Imagen ${imageIndex + 1}`}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full rounded-lg"
                 />
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
                    className={`w-3 h-3 rounded-full ${index === imageIndex ? 'bg-red-600' : 'bg-gray-300'}`}
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
        
        {/* Representación interactiva del árbol jerárquico */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Explorador de Sistema Jerárquico</h3>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Árbol de directorios */}
            <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="font-bold text-red-600 mb-4">Estructura Jerárquica</div>
              <div className="space-y-2">
                {[
                  { name: "📁 Raíz", level: 0 },
                  { name: "📁 Aplicaciones", level: 1 },
                  { name: "📁 Usuarios", level: 1 },
                  { name: "👤 María", level: 2 },
                  { name: "📂 Documentos", level: 3 },
                  { name: "📂 Imágenes", level: 3 },
                  { name: "👤 Pedro", level: 2 },
                  { name: "📁 Sistema", level: 1 },
                  { name: "📁 Bibliotecas", level: 2 },
                  { name: "📁 Configuraciones", level: 2 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors ${
                      item.level === 0 ? "font-bold text-red-700" : 
                      item.level === 1 ? "font-semibold text-gray-800" : 
                      item.level === 2 ? "text-gray-700" : "text-gray-600"
                    }`}
                    style={{ marginLeft: `${item.level * 1.5}rem` }}
                    whileHover={{ backgroundColor: "#fee2e2" }}
                  >
                    <div className="mr-2">{item.name.split(' ')[0]}</div>
                    <div>{item.name.split(' ').slice(1).join(' ')}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Información detallada */}
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <h4 className="text-lg font-bold mb-3 text-red-700">Características del Directorio</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-800">Nombre:</span> Documentos
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Ruta:</span> /Usuarios/María/Documentos
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Fecha creación:</span> 15/03/2025
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Permisos:</span> 
                      <div className="flex mt-2">
                        <div className="mr-4">
                          <div className="text-sm text-gray-600">Usuario</div>
                          <div className="bg-red-100 text-red-800 px-3 py-1 rounded">rwx</div>
                        </div>
                        <div className="mr-4">
                          <div className="text-sm text-gray-600">Grupo</div>
                          <div className="bg-red-100 text-red-800 px-3 py-1 rounded">r-x</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Otros</div>
                          <div className="bg-red-100 text-red-800 px-3 py-1 rounded">r--</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <h4 className="text-lg font-bold mb-3 text-red-700">Contenido del Directorio</h4>
                  <div className="space-y-3">
                    {[
                      { name: "📄 informe.pdf", size: "2.4 MB", date: "Ayer" },
                      { name: "📄 presupuesto.xlsx", size: "1.1 MB", date: "Hoy" },
                      { name: "📄 contrato.docx", size: "3.2 MB", date: "15/03" },
                      { name: "📂 Proyectos", size: "24 MB", date: "10/03" },
                      { name: "📂 Personal", size: "8.7 MB", date: "05/03" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-red-100">
                        <div className='text-gray-800'>{item.name}</div>
                        <div className="text-sm text-gray-600">{item.size} • {item.date}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl border border-red-300"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <h4 className="text-lg font-bold mb-3 text-red-700">Operaciones Jerárquicas</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Copiar estructura", icon: "📋" },
                    { name: "Mover subárbol", icon: "📦" },
                    { name: "Buscar recursivo", icon: "🔍" },
                    { name: "Comprimir", icon: "🗜️" }
                  ].map((op, index) => (
                    <motion.div
                      key={index}
                      className="bg-red-50 p-4 rounded-lg text-center cursor-pointer hover:bg-red-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl mb-2">{op.icon}</div>
                      <div className="font-medium text-gray-800">{op.name}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Ventajas del sistema jerárquico */}
        <motion.div 
          className="mt-16"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Ventajas del Modelo Jerárquico</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{adv.icon}</div>
                  <h4 className="text-xl font-semibold text-red-600">{adv.title}</h4>
                </div>
                <p className="text-gray-700">{adv.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Comparación con otros modelos */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Comparación con Otros Modelos</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-red-500 to-orange-600 text-white">
                  <th className="py-3 px-4 text-left">Característica</th>
                  <th className="py-3 px-4 text-left">Jerárquico</th>
                  <th className="py-3 px-4 text-left">Plano (Flat)</th>
                  <th className="py-3 px-4 text-left">Base de Datos</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Organización", "Excelente", "Pobre", "Buena"],
                  ["Escalabilidad", "Muy buena", "Limitada", "Excelente"],
                  ["Acceso a archivos", "Por ruta", "Por nombre", "Por consulta"],
                  ["Complejidad", "Moderada", "Baja", "Alta"],
                  ["Uso típico", "Sistemas operativos", "Sistemas embebidos", "Aplicaciones especializadas"],
                  ["Búsquedas", "Rutas específicas", "Tabla completa", "Consultas complejas"],
                  ["Ejemplos", "EXT4, NTFS", "FAT32, UFS", "WinFS, ReiserFS"]
                ].map(([feature, hierarchical, flat, database], index) => (
                  <motion.tr 
                    key={index}
                    className={index % 2 === 0 ? "bg-red-50" : "bg-orange-50"}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">{feature}</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{hierarchical}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">{flat}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{database}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <motion.div 
            className="mt-8 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <p className="text-gray-700">
              El modelo jerárquico ofrece el mejor equilibrio entre organización y simplicidad para sistemas de propósito general. 
              Mientras que los sistemas planos son más simples pero menos organizados, los sistemas basados en bases de datos ofrecen 
              más flexibilidad pero con mayor complejidad de implementación.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Sistemas de archivos jerárquicos */}
        <motion.div 
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Sistemas de Archivos Jerárquicos Populares</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filesystems.map((fs, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.2 + index * 0.2, duration: 0.5 }}
                whileHover={{ 
                  rotate: index % 2 === 0 ? 1 : -1,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className={`p-6 ${
                  fs.os === "Linux" ? "bg-gradient-to-r from-red-500 to-orange-500" :
                  fs.os === "Windows" ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                  fs.os === "macOS" ? "bg-gradient-to-r from-gray-800 to-gray-600" :
                  "bg-gradient-to-r from-purple-500 to-indigo-500"
                } text-white`}>
                  <div className="text-3xl mb-2">{fs.icon}</div>
                  <h4 className="text-xl font-bold">{fs.name}</h4>
                  <div className="text-sm opacity-80">{fs.os}</div>
                </div>
                <div className="p-6">
                  <h5 className="font-semibold mb-3 text-red-600">Características:</h5>
                  <ul className="space-y-2">
                    {fs.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className='text-gray-800'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Buenas prácticas */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Buenas Prácticas en Sistemas Jerárquicos</h3>
          <div className="space-y-6">
            {[
              {
                title: "Diseña antes de implementar",
                description: "Planifica la estructura de directorios considerando futuras necesidades",
                icon: "📐"
              },
              {
                title: "Mantén una profundidad razonable",
                description: "Evita más de 4-5 niveles de anidación para no complicar las rutas",
                icon: "📏"
              },
              {
                title: "Usa nombres descriptivos",
                description: "Nombres claros que indiquen el contenido del directorio",
                icon: "🏷️"
              },
              {
                title: "Agrupa lógicamente",
                description: "Coloca archivos relacionados en el mismo directorio",
                icon: "🧩"
              },
              {
                title: "Aplica permisos consistentes",
                description: "Define políticas de permisos por niveles de directorio",
                icon: "🔑"
              },
            /*   {
                title: "Documenta tu estructura",
                description: "Incluye README.md en directorios importantes",
                icon: "📝"
              } */
            ].map((practice, index) => (
              <motion.div 
                key={index}
                className="flex items-start p-4 bg-red-50 rounded-lg border border-red-200"
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 3 + index * 0.2, duration: 0.5 }}
              >
                <div className="text-2xl mr-4">{practice.icon}</div>
                <div>
                  <div className="font-bold text-red-700">{practice.title}</div>
                  <div className="text-gray-700 mt-1">{practice.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Evolución futura */}
    {/*     <motion.div 
          className="mt-16 bg-gradient-to-r from-red-100 to-orange-100 p-8 rounded-2xl border border-red-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.6, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Evolución y Futuro</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-red-700">Tendencias Actuales</h4>
              <ul className="space-y-3">
                {[
                  "Sistemas jerárquicos distribuidos (Ceph, GlusterFS)",
                  "Metadatos enriquecidos (etiquetas, propiedades extendidas)",
                  "Soporte para snapshots y versionado",
                  "Integración con almacenamiento en la nube"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-red-700">Futuro de los Sistemas Jerárquicos</h4>
              <ul className="space-y-3">
                {[
                  "Inteligencia Artificial para organización automática",
                  "Sistemas híbridos jerárquico-relacionales",
                  "Jerarquías adaptativas basadas en uso",
                  "Interfaces visuales 3D para navegación",
                  "Integración con sistemas de búsqueda semántica"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 4, duration: 0.6 }}
          >
            <div className="inline-block bg-white p-6 rounded-xl shadow border border-red-200">
              <h4 className="text-xl font-bold mb-3 text-red-700">Conclusión</h4>
              <p className="text-gray-700 max-w-3xl">
                Aunque han surgido modelos alternativos, el sistema jerárquico sigue siendo el paradigma dominante 
                en gestión de archivos debido a su simplicidad conceptual, eficiencia organizativa y facilidad de uso. 
                Su evolución continúa adaptándose a las necesidades modernas de almacenamiento, combinando la estructura 
                tradicional con nuevas capacidades de metadatos y distribución.
              </p>
            </div>
          </motion.div>
        </motion.div> */}
      </div>
    </motion.section>
  );
};

export default SistemaJerarquicoSection;