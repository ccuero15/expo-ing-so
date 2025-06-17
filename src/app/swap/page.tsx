'use client'
// components/SwapSection.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { wrap } from 'framer-motion';
import Image from 'next/image';

const SwapSection = () => {
    // Estados para el carrusel
    const [ [ page, direction ], setPage ] = useState([ 0, 0 ]);
    //const [currentImage, setCurrentImage] = useState(0);

    // Imágenes para el carrusel
    const images = [
        "/swap-diagram.png",
    ];

    // Configuraciones comunes de swap
    const swapConfigurations = [
        {
            title: "Swap Partition",
            description: "Partición dedicada exclusivamente para swap, generalmente más eficiente.",
            pros: [ "Mejor rendimiento", "Menor fragmentación" ],
            cons: [ "Requiere partición dedicada", "Menos flexible" ],
            icon: "🔧"
        },
        {
            title: "Swap File",
            description: "Archivo especial en el sistema de archivos usado como espacio de intercambio.",
            pros: [ "Fácil de configurar", "Tamaño ajustable" ],
            cons: [ "Ligeramente más lento", "Sujeto a fragmentación" ],
            icon: "📄"
        },
        {
            title: "Swap Zram",
            description: "Usa memoria comprimida en RAM como espacio de intercambio virtual.",
            pros: [ "Muy rápido", "Reduce I/O en disco" ],
            cons: [ "Consume CPU", "Capacidad limitada" ],
            icon: "💨"
        }
    ];

    // Animación para cambiar imágenes
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([ page + newDirection, newDirection ]);
    };

    // Animación automática del carrusel
    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 5000);

        return () => clearInterval(interval);
    }, [ page ]);

    return (
        <motion.section
            className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-100"
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
                        Memoria Swap
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
                            La <span className="font-semibold text-amber-600">memoria swap</span> es un espacio en el disco duro que el sistema operativo utiliza como extensión de la memoria RAM física. Cuando la memoria física se agota, el sistema mueve páginas de memoria inactivas al espacio swap, liberando RAM para procesos activos.
                        </motion.p>

                        <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Aunque el swap permite ejecutar más aplicaciones de las que la RAM física podría soportar, su uso excesivo puede degradar significativamente el rendimiento debido a la mayor latencia de los discos duros (10,000 veces más lento que la RAM).
                        </motion.p>

                        <motion.div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-amber-700">¿Cuándo se usa Swap?</h3>
                            <ul className="space-y-3">
                                {[
                                    "Cuando la memoria física (RAM) está casi llena",
                                    "Para procesos inactivos que no se usan hace tiempo",
                                    "En sistemas con poca memoria RAM",
                                    "Durante picos de uso de memoria",
                                    "Para hibernación del sistema (suspend-to-disk)"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start"
                                        whileHover={{ x: 10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <span className={`text-amber-500 mr-2`}>
                                            {index === 0 ? "1️⃣" : index === 1 ? "2️⃣" : index === 2 ? "3️⃣" : index === 3 ? "4️⃣" : "💤"}
                                        </span>
                                        <span className='text-gray-800' >{item}</span>
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
                                        src={images[ imageIndex ]}
                                        alt={`Diagrama de Swap ${imageIndex + 1}`}
                                        className="rounded-lg"
                                        width={200}
                                        height={200}
                                    />
                                    {/*   <span className="text-center p-4">
                                        Diagrama de {images[ imageIndex ].replace("/", "").replace(".svg", "").replace("-", " ")}
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
                                        onClick={() => setPage([ index, index > imageIndex ? 1 : -1 ])}
                                        className={`w-3 h-3 rounded-full ${index === imageIndex ? 'bg-amber-600' : 'bg-gray-300'}`}
                                        aria-label={`Ir a imagen ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <motion.div
                            className="mt-6 text-center text-gray-600 font-medium"
                            animate={{ opacity: [ 0.7, 1, 0.7 ] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            {images[ imageIndex ].replace("/", "").replace(".svg", "").replace("-", " ")}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Visualización de uso de memoria */}
                <motion.div
                    className="mt-16 bg-white rounded-2xl shadow-lg p-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Visualización de Memoria RAM vs Swap</h3>

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-full max-w-2xl bg-gray-800 text-white rounded-xl p-6 shadow-xl">
                            <div className="flex justify-between mb-4">
                                <div className="text-amber-300 font-medium">RAM: 8GB</div>
                                <div className="text-blue-300 font-medium">Swap: 4GB</div>
                            </div>

                            {/* Barra de memoria RAM */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>0GB</span>
                                    <span>8GB</span>
                                </div>
                                <div className="h-8 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "75%" }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                </div>
                                <div className="text-right text-xs mt-1 text-gray-400">Usado: 6GB (75%)</div>
                            </div>

                            {/* Barra de memoria Swap */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>0GB</span>
                                    <span>4GB</span>
                                </div>
                                <div className="h-8 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "40%" }}
                                        transition={{ duration: 1.5, delay: 0.8 }}
                                    />
                                </div>
                                <div className="text-right text-xs mt-1 text-gray-400">Usado: 1.6GB (40%)</div>
                            </div>
                        </div>

                        <motion.div
                            className="mt-8 text-center max-w-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            <p className="text-gray-700">
                                Cuando la memoria RAM se llena (barra verde), el sistema comienza a usar el espacio swap (barra naranja).
                                Un uso elevado de swap (50%) generalmente indica que el sistema necesita más memoria RAM física.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                state: "Estado Óptimo",
                                ram: "<70%",
                                swap: "<30%",
                                color: "bg-green-100 text-green-800",
                                icon: "✅",
                                description: "Sistema con memoria suficiente"
                            },
                            {
                                state: "Advertencia",
                                ram: "70-90%",
                                swap: "30-50%",
                                color: "bg-yellow-100 text-yellow-800",
                                icon: "⚠️",
                                description: "Considerar aumentar RAM"
                            },
                            {
                                state: "Crítico",
                                ram: ">90%",
                                swap: ">50%",
                                color: "bg-red-100 text-red-800",
                                icon: "❌",
                                description: "Rendimiento degradado, acción requerida"
                            }
                        ].map((status, index) => (
                            <motion.div
                                key={index}
                                className={`p-6 rounded-xl shadow-md border ${status.color}`}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center mb-3">
                                    <div className="text-2xl mr-2">{status.icon}</div>
                                    <h4 className="text-xl font-bold">{status.state}</h4>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>RAM:</span>
                                    <span className="font-bold">{status.ram}</span>
                                </div>
                                <div className="flex justify-between mb-3">
                                    <span>Swap:</span>
                                    <span className="font-bold">{status.swap}</span>
                                </div>
                                <p>{status.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Configuraciones de Swap */}
                <motion.div
                    className="mt-16"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Configuraciones de Swap</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {swapConfigurations.map((config, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            >
                                <div className="flex items-start mb-4">
                                    <div className="text-3xl mr-3">{config.icon}</div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-amber-600">{config.title}</h4>
                                        <p className="text-gray-700 mt-2">{config.description}</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h5 className="font-semibold text-green-600 mb-2">Ventajas:</h5>
                                    <ul className="space-y-1 mb-3">
                                        {config.pros.map((pro, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-green-500 mr-2">✓</span>
                                                <span className='text-gray-800' >{pro}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <h5 className="font-semibold text-red-600 mb-2">Desventajas:</h5>
                                    <ul className="space-y-1">
                                        {config.cons.map((con, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-red-500 mr-2">✗</span>
                                                <span className='text-gray-800'>{con}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Comandos de gestión de Swap */}
                <motion.div
                    className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Gestión de Swap en Linux</h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                                    <th className="py-3 px-4 text-left">Comando</th>
                                    <th className="py-3 px-4 text-left">Descripción</th>
                                    <th className="py-3 px-4 text-left">Ejemplo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    [ "free -h", "Muestra uso de memoria y swap", "free -h" ],
                                    [ "swapon --show", "Muestra dispositivos swap activos", "swapon --show" ],
                                    [ "mkswap", "Crea un espacio swap", "mkswap /dev/sda2" ],
                                    [ "swapon", "Activa un dispositivo swap", "swapon /swapfile" ],
                                    [ "swapoff", "Desactiva un dispositivo swap", "swapoff /swapfile" ],
                                    [ "sysctl vm.swappiness", "Muestra la propensión a usar swap", "sysctl vm.swappiness" ],
                                    [ "sysctl -w vm.swappiness=10", "Ajusta la propensión a usar swap", "sysctl -w vm.swappiness=10" ]
                                ].map(([ command, description, example ], index) => (
                                    <motion.tr
                                        key={index}
                                        className={index % 2 === 0 ? "bg-amber-50" : "bg-orange-50"}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                                    >
                                        <td className="py-3 px-4 font-mono font-bold text-amber-700">{command}</td>
                                        <td className="py-3 px-4 text-gray-800 ">{description}</td>
                                        <td className="py-3 px-4 font-mono text-sm bg-amber-100 rounded text-gray-800">{example}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <motion.div
                        className="mt-8 bg-white p-6 rounded-xl border border-amber-300"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 2, duration: 0.6 }}
                    >
                        <h4 className="text-xl font-semibold mb-3 text-amber-700">Optimización del Swap</h4>
                        <p className="mb-4 text-gray-800">El parámetro <code className="bg-amber-100 px-2 py-1 rounded">vm.swappiness</code> controla la propensión del sistema a usar swap:</p>
                        <div className="flex items-center mb-3">
                            <span className="mr-2 text-green-600">0</span>
                            <div className="flex-grow h-4 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full">
                                <motion.div
                                    className="h-4 rounded-full border-2 border-white"
                                    style={{ width: "20%", position: "absolute" }}
                                    animate={{
                                        x: [ "0%", "200%", "0%" ],  // Usamos transform: translateX en lugar de left
                                        backgroundColor: [ "#f0f9ff", "#fef3c7", "#fef3c1" ]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 4,
                                        ease: "easeInOut",
                                        times: [ 0, 0.5, 1 ]
                                    }}
                                />
                            </div>
                            <span className="ml-2 text-red-600">100</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="font-bold text-green-600" >0-30</div>
                                <div className="text-sm text-green-600">Minimizar swap</div>
                            </div>
                            <div>
                                <div className="font-bold text-amber-600">30-60</div>
                                <div className="text-sm text-amber-600">Balanceado</div>
                            </div>
                            <div>
                                <div className="font-bold text-red-600">60-100</div>
                                <div className="text-sm text-red-600">Usar swap agresivamente</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Buenas prácticas */}
                <motion.div
                    className="mt-16"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Buenas Prácticas con Swap</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Tamaño adecuado",
                                description: "Generalmente 1-2x el tamaño de la RAM",
                                icon: "📏"
                            },
                            {
                                title: "SSD vs HDD",
                                description: "Usar SSD para swap mejora rendimiento 10x",
                                icon: "💽"
                            },
                            {
                                title: "Monitoreo constante",
                                description: "Vigilar uso de swap con herramientas",
                                icon: "👀"
                            },
                            {
                                title: "Priorizar RAM",
                                description: "Añadir RAM física es mejor que aumentar swap",
                                icon: "💪"
                            }
                        ].map((practice, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 2.4 + index * 0.2, duration: 0.5 }}
                                whileHover={{
                                    rotate: index % 2 === 0 ? 2 : -2,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <div className="text-4xl mb-4">{practice.icon}</div>
                                <h4 className="text-xl font-bold mb-2 text-amber-600">{practice.title}</h4>
                                <p className="text-gray-700">{practice.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Mitos sobre Swap */}
                <motion.div
                    className="mt-16 bg-white rounded-2xl shadow-lg p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8, duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Mitos y Realidades sobre Swap</h3>
                    <div className="space-y-6">
                        {[
                            {
                                myth: "Swap es innecesario si tienes suficiente RAM",
                                reality: "El swap ayuda con la hibernación y manejo de picos de memoria",
                                icon: "❓"
                            },
                            {
                                myth: "Más swap siempre mejora el rendimiento",
                                reality: "Swap excesivo puede causar thrashing y degradar rendimiento",
                                icon: "📉"
                            },
                            {
                                myth: "Swap solo se usa cuando la RAM está llena",
                                reality: "Algunos sistemas mueven páginas inactivas a swap antes",
                                icon: "⏱️"
                            },
                            {
                                myth: "Eliminar swap acelera el sistema",
                                reality: "Sin swap, el sistema puede fallar al quedarse sin memoria",
                                icon: "⚠️"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200"
                                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 3 + index * 0.2, duration: 0.5 }}
                            >
                                <div className="text-2xl mr-4">{item.icon}</div>
                                <div>
                                    <div className="font-bold text-red-600 mb-1">Mito: {item.myth}</div>
                                    <div className="font-semibold text-green-700">Realidad: {item.reality}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default SwapSection;