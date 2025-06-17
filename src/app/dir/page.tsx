'use client';

// components/DirectoriosSection.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { wrap } from 'framer-motion';
import Image from 'next/image';

const DirectoriosSection = () => {
  // Estados para el carrusel
  const [[page, direction], setPage] = useState([0, 0]);
  
  // Imágenes para el carrusel
  const images = [
    "/directory-structure.png",
  ];
  
  // Tipos de directorios especiales
  const specialDirs = [
    {
      name: "Directorio Raíz (/)",
      description: "El directorio principal que contiene todos los demás directorios y archivos",
      icon: "🌳"
    },
    {
      name: "Directorio Home (~)",
      description: "Directorio personal de cada usuario, donde guarda sus archivos y configuraciones",
      icon: "🏠"
    },
    {
      name: "Directorio Bin (/bin)",
      description: "Contiene ejecutables esenciales para el funcionamiento del sistema",
      icon: "🛠️"
    },
    {
      name: "Directorio etc (/etc)",
      description: "Almacena archivos de configuración del sistema y aplicaciones",
      icon: "⚙️"
    },
    {
      name: "Directorio tmp (/tmp)",
      description: "Para archivos temporales que se eliminan al reiniciar el sistema",
      icon: "⏱️"
    },
    {
      name: "Directorio var (/var)",
      description: "Contiene datos variables como logs, cachés y archivos en cola de impresión",
      icon: "📊"
    }
  ];
  
  // Comandos comunes para directorios
  const directoryCommands = [
    { command: "ls", description: "Listar contenido de directorio", example: "ls -l" },
    { command: "cd", description: "Cambiar directorio actual", example: "cd /home/usuario" },
    { command: "pwd", description: "Mostrar ruta del directorio actual", example: "pwd" },
    { command: "mkdir", description: "Crear nuevo directorio", example: "mkdir nuevo_directorio" },
    { command: "rmdir", description: "Eliminar directorio vacío", example: "rmdir directorio_vacio" },
    { command: "cp -r", description: "Copiar directorio recursivamente", example: "cp -r dir1 dir2" },
    { command: "mv", description: "Mover o renombrar directorio", example: "mv viejo nuevo" },
    { command: "find", description: "Buscar archivos y directorios", example: "find . -name '*.txt'" }
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
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-100"
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
            Directorios en Sistemas de Archivos
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
              Un <span className="font-semibold text-purple-600">directorio</span> es una estructura que organiza archivos y otros directorios en un sistema de archivos jerárquico. Funcionan como contenedores que permiten agrupar información relacionada, facilitando la navegación, búsqueda y gestión de archivos.
            </motion.p>
            
            <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed">
              En sistemas UNIX/Linux, todo parte del directorio raíz (<code className="bg-purple-100 px-2 py-1 rounded">/</code>), que contiene subdirectorios como <code className="bg-purple-100 px-2 py-1 rounded">/bin</code>, <code className="bg-purple-100 px-2 py-1 rounded">/home</code>, y <code className="bg-purple-100 px-2 py-1 rounded">/etc</code>. Cada usuario tiene su propio directorio home (<code className="bg-purple-100 px-2 py-1 rounded">/home/usuario</code>) donde almacena sus archivos personales.
            </motion.p>
            
            <motion.div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">Características Clave</h3>
              <ul className="space-y-3">
                {[
                  "Organización jerárquica en forma de árbol",
                  "Puede contener archivos y otros directorios (subdirectorios)",
                  "Cada directorio tiene enlaces a su directorio padre (..) y a sí mismo (.)",
                  "Permisos de acceso independientes para usuarios y grupos",
                  "Soporte para enlaces simbólicos y enlaces duros"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-purple-500 mr-2">•</span>
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
                    alt={`Imagen del directorio ${imageIndex + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
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
                    className={`w-3 h-3 rounded-full ${index === imageIndex ? 'bg-purple-600' : 'bg-gray-300'}`}
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
        
        {/* Estructura jerárquica */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Estructura Jerárquica de Directorios</h3>
          
          <div className="flex justify-center">
            <div className="w-full max-w-3xl bg-gray-800 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
              <div className="mb-1">/ <span className="text-gray-500"># Directorio raíz</span></div>
              <div className="ml-4 mb-1">├── bin/ <span className="text-gray-500"># Comandos esenciales</span></div>
              <div className="ml-4 mb-1">├── boot/ <span className="text-gray-500"># Archivos de arranque</span></div>
              <div className="ml-4 mb-1">├── dev/ <span className="text-gray-500"># Dispositivos</span></div>
              <div className="ml-4 mb-1">├── etc/ <span className="text-gray-500"># Configuraciones</span></div>
              <div className="ml-4 mb-1">├── home/ <span className="text-gray-500"># Usuarios</span></div>
              <div className="ml-8 mb-1">│   ├── alice/ <span className="text-gray-500"># Directorio de Alice</span></div>
              <div className="ml-8 mb-1">│   │   ├── documentos/</div>
              <div className="ml-8 mb-1">│   │   ├── imagenes/</div>
              <div className="ml-8 mb-1">│   │   └── musica/</div>
              <div className="ml-8 mb-1">│   └── bob/ <span className="text-gray-500"># Directorio de Bob</span></div>
              <div className="ml-4 mb-1">├── lib/ <span className="text-gray-500"># Bibliotecas</span></div>
              <div className="ml-4 mb-1">├── media/ <span className="text-gray-500"># Medios extraíbles</span></div>
              <div className="ml-4 mb-1">├── mnt/ <span className="text-gray-500"># Puntos de montaje</span></div>
              <div className="ml-4 mb-1">├── opt/ <span className="text-gray-500"># Software adicional</span></div>
              <div className="ml-4 mb-1">├── proc/ <span className="text-gray-500"># Información de procesos</span></div>
              <div className="ml-4 mb-1">├── root/ <span className="text-gray-500"># Home del superusuario</span></div>
              <div className="ml-4 mb-1">├── run/ <span className="text-gray-500"># Datos volátiles</span></div>
              <div className="ml-4 mb-1">├── sbin/ <span className="text-gray-500"># Comandos de sistema</span></div>
              <div className="ml-4 mb-1">├── srv/ <span className="text-gray-500"># Datos de servicios</span></div>
              <div className="ml-4 mb-1">├── sys/ <span className="text-gray-500"># Dispositivos del sistema</span></div>
              <div className="ml-4 mb-1">├── tmp/ <span className="text-gray-500"># Archivos temporales</span></div>
              <div className="ml-4 mb-1">├── usr/ <span className="text-gray-500"># Recursos de usuario</span></div>
              <div className="ml-8 mb-1">│   ├── bin/</div>
              <div className="ml-8 mb-1">│   ├── lib/</div>
              <div className="ml-8 mb-1">│   └── local/</div>
              <div className="ml-4">└── var/ <span className="text-gray-500"># Datos variables</span></div>
              <div className="ml-8">    ├── log/ <span className="text-gray-500"># Logs del sistema</span></div>
              <div className="ml-8">    ├── cache/ <span className="text-gray-500"># Archivos de caché</span></div>
              <div className="ml-8">    └── www/ <span className="text-gray-500"># Sitios web</span></div>
            </div>
          </div>
          
          <motion.div 
            className="mt-8 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-gray-700">
              Esta estructura jerárquica permite organizar el sistema de manera lógica y consistente. 
              Cada distribución de Linux sigue el <span className="font-semibold">Filesystem Hierarchy Standard (FHS)</span>, 
              que define el propósito de cada directorio principal.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Directorios especiales */}
        <motion.div 
          className="mt-16"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Directorios Especiales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialDirs.map((dir, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-3">{dir.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold text-purple-600">{dir.name}</h4>
                    <p className="text-gray-700 mt-2">{dir.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Comandos para gestión de directorios */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-purple-50 to-violet-50 p-8 rounded-2xl border border-purple-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Comandos Esenciales para Directorios</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                  <th className="py-3 px-4 text-left">Comando</th>
                  <th className="py-3 px-4 text-left">Descripción</th>
                  <th className="py-3 px-4 text-left">Ejemplo</th>
                </tr>
              </thead>
              <tbody>
                {directoryCommands.map((cmd, index) => (
                  <motion.tr 
                    key={index}
                    className={index % 2 === 0 ? "bg-purple-50" : "bg-violet-50"}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-purple-700">{cmd.command}</td>
                    <td className="py-3 px-4 text-gray-800">{cmd.description}</td>
                    <td className="py-3 px-4 font-mono text-sm bg-purple-100 text-gray-800 rounded">{cmd.example}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <motion.div 
            className="mt-8 bg-white p-6 rounded-xl border border-purple-300"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <h4 className="text-xl font-semibold mb-3 text-purple-700">Consejos para la Gestión de Directorios</h4>
            <ul className="space-y-3">
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <span className="text-purple-500 mr-2">•</span>
                <span className="text-gray-800">Usa nombres descriptivos y en minúsculas para directorios</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <span className="text-purple-500 mr-2">•</span>
                <span className="text-gray-800">Organiza tus directorios de forma lógica y consistente</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <span className="text-purple-500 mr-2">•</span>
                <span className="text-gray-800">Usa <code className="bg-purple-100 px-1 py-0.5 rounded">~</code> para referirte a tu directorio home</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <span className="text-purple-500 mr-2">•</span>
                <span className="text-gray-800">Utiliza <code className="bg-purple-100 px-1 py-0.5 rounded">.</code> para el directorio actual y <code className="bg-purple-100 px-1 py-0.5 rounded">..</code> para el directorio padre</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <span className="text-purple-500 mr-2">•</span>
                <span className="text-gray-800">Configura permisos adecuados para proteger tus directorios</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Tipos de enlaces */}
       {/*  <motion.div 
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Enlaces en Sistemas de Archivos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-blue-200"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <h4 className="text-xl font-bold mb-4 text-blue-600 flex items-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">🔗</div>
                Enlaces Duros (Hard Links)
              </h4>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">Apuntan directamente al inodo del archivo original</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">Comparten el mismo espacio de almacenamiento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">No pueden apuntar a directorios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">Funcionan solo dentro del mismo sistema de archivos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">Comando: <code className="bg-blue-100 px-1 py-0.5 rounded">ln origen destino</code></span>
                </li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg text-sm">
                <p className="font-semibold text-gray-800">Ejemplo:</p>
                <p className="font-mono text-gray-800">$ ln documento.txt enlace_duro.txt</p>
                <p className="mt-2 text-gray-800">Ambos archivos apuntan al mismo contenido físico</p>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg border border-purple-200"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            >
              <h4 className="text-xl font-bold mb-4 text-purple-600 flex items-center">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">🔗</div>
                Enlaces Simbólicos (Soft Links)
              </h4>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-800">Son accesos directos que apuntan a la ruta del archivo original</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-800">Ocupan espacio adicional como archivos independientes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-800">Pueden apuntar a directorios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-800">Pueden cruzar sistemas de archivos diferentes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-800">Comando: <code className="bg-purple-100 px-1 py-0.5 rounded">ln -s origen destino</code></span>
                </li>
              </ul>
              <div className="bg-purple-50 p-4 rounded-lg text-sm">
                <p className="font-semibold text-gray-800">Ejemplo:</p>
                <p className="font-mono text-gray-800">$ ln -s /ruta/larga/acceso_directo</p>
                <p className="mt-2 text-gray-800">Crea un acceso directo a la ruta larga</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8 }}
          >
            <div className="bg-gray-100 p-6 rounded-xl inline-block">
              <h4 className="text-lg font-bold mb-2 text-gray-800">Comparación: Enlaces Duros vs Simbólicos</h4>
              <div className="flex justify-center">
                <table className="text-sm text-left">
                  <thead>
                    <tr className="border-b text-gray-800">
                      <th className="px-4 py-2">Característica</th>
                      <th className="px-4 py-2">Enlace Duro</th>
                      <th className="px-4 py-2">Enlace Simbólico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b text-gray-800">
                      <td className="px-4 py-2 ">Apuntan a</td>
                      <td className="px-4 py-2 ">Inodo</td>
                      <td className="px-4 py-2 ">Ruta</td>
                    </tr>
                    <tr className="border-b text-gray-800">
                      <td className="px-4 py-2">Espacio usado</td>
                      <td className="px-4 py-2">Mínimo (solo entrada directorio)</td>
                      <td className="px-4 py-2">Tamaño de la ruta</td>
                    </tr>
                    <tr className="border-b text-gray-800">
                      <td className="px-4 py-2">Si se borra el original</td>
                      <td className="px-4 py-2">Sigue funcionando</td>
                      <td className="px-4 py-2">Se rompe (dangling link)</td>
                    </tr>
                    <tr className="border-b text-gray-800">
                      <td className="px-4 py-2">Puede apuntar a directorios</td>
                      <td className="px-4 py-2">❌ No</td>
                      <td className="px-4 py-2">✅ Sí</td>
                    </tr>
                    <tr className="border-b text-gray-800">
                      <td className="px-4 py-2">Cruzar sistemas de archivos</td>
                      <td className="px-4 py-2">❌ No</td>
                      <td className="px-4 py-2">✅ Sí</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div> */}
        
        {/* Buenas prácticas */}
        <motion.div 
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Buenas Prácticas con Directorios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Estructura lógica",
                description: "Organiza tus directorios en categorías claras",
                icon: "📂"
              },
              {
                title: "Nombres descriptivos",
                description: "Usa nombres que indiquen claramente el contenido",
                icon: "🏷️"
              },
              {
                title: "Evita espacios",
                description: "Usa guiones bajos o medios en lugar de espacios",
                icon: "🚫"
              },
              {
                title: "Permisos adecuados",
                description: "Protege tus directorios con permisos correctos",
                icon: "🔒"
              },
              {
                title: "Backups regulares",
                description: "Copia de seguridad para directorios importantes",
                icon: "💾"
              },
              {
                title: "Evita directorios profundos",
                description: "Máximo 3-4 niveles de profundidad",
                icon: "📏"
              },
             /*  {
                title: "Usa enlaces simbólicos",
                description: "Para accesos directos a rutas largas",
                icon: "🔗"
              }, */
              {
                title: "Documenta tu estructura",
                description: "README.md en directorios complejos",
                icon: "📝"
              }
            ].map((practice, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  rotate: index % 2 === 0 ? 2 : -2,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="text-4xl mb-4">{practice.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-purple-600">{practice.title}</h4>
                <p className="text-gray-700">{practice.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DirectoriosSection;