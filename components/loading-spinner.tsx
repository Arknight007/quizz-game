"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-black/60 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
      <div className="scale-125 overflow-visible">
        <motion.svg
          width="100"
          height="100"
          viewBox="0 0 105 105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Server Base */}
          <motion.g
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <rect x="25" y="45" width="55" height="35" rx="2" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
            <rect x="30" y="50" width="45" height="5" rx="1" fill="#3B82F6" fillOpacity="0.6" />
            <rect x="30" y="60" width="45" height="5" rx="1" fill="#3B82F6" fillOpacity="0.6" />
            <rect x="30" y="70" width="45" height="5" rx="1" fill="#3B82F6" fillOpacity="0.6" />
          </motion.g>

          {/* Vertical Lines */}
          <motion.line
            id="line-v1"
            x1="40"
            y1="20"
            x2="40"
            y2="45"
            stroke="#3B82F6"
            strokeWidth="2"
            animate={{
              y1: [20, 17, 20],
              y2: [45, 42, 45],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.line
            id="line-v2"
            x1="65"
            y1="15"
            x2="65"
            y2="45"
            stroke="#3B82F6"
            strokeWidth="2"
            animate={{
              y1: [15, 12, 15],
              y2: [45, 42, 45],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.2,
            }}
          />

          {/* Reflectors */}
          <motion.g
            id="reflectores"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            <circle cx="40" cy="20" r="3" fill="#60A5FA" />
            <circle cx="65" cy="15" r="3" fill="#60A5FA" />
          </motion.g>

          {/* Particles */}
          <motion.g
            id="particles"
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            {[
              { id: "p1", x: 38, delay: 0, duration: 2.2 },
              { id: "p2", x: 42, delay: 0.3, duration: 2.5 },
              { id: "p3", x: 63, delay: 0.6, duration: 2 },
              { id: "p4", x: 67, delay: 0.2, duration: 2.8 },
              { id: "p5", x: 40, delay: 0.4, duration: 2.3 },
              { id: "p6", x: 44, delay: 0.1, duration: 3 },
              { id: "p7", x: 61, delay: 0.5, duration: 2.1 },
              { id: "p8", x: 65, delay: 0.2, duration: 2.6 },
              { id: "p9", x: 69, delay: 0.3, duration: 2.4 },
            ].map((particle) => (
              <motion.circle
                key={particle.id}
                className={`particle ${particle.id}`}
                cx={particle.x}
                cy="40"
                r="1"
                fill="#93C5FD"
                animate={{
                  y: [0, -40],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear",
                }}
              />
            ))}
          </motion.g>
        </motion.svg>
      </div>
      <p className="mt-4 text-blue-300 text-lg">Loading questions...</p>
    </div>
  )
}

