"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface TechItem {
  name: string
  color: string
  size: number
  speed: number
}

export default function AnimatedTechSphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const technologies: TechItem[] = [
    { name: "React", color: "#61DAFB", size: 60, speed: 5 },
    { name: "Next.js", color: "#000000", size: 70, speed: 4 },
    { name: "TypeScript", color: "#3178C6", size: 55, speed: 6 },
    { name: "Tailwind", color: "#06B6D4", size: 65, speed: 3 },
    { name: "JavaScript", color: "#F7DF1E", size: 50, speed: 7 },
    { name: "HTML", color: "#E34F26", size: 45, speed: 8 },
    { name: "CSS", color: "#1572B6", size: 45, speed: 6 },
    { name: "Node.js", color: "#339933", size: 55, speed: 5 },
    { name: "Git", color: "#F05032", size: 40, speed: 9 },
    { name: "Framer", color: "#0055FF", size: 50, speed: 7 },
  ]

  return (
    <div ref={containerRef} className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="absolute flex items-center justify-center rounded-full font-bold text-white shadow-lg text-xs md:text-sm"
          initial={{
            x: Math.random() * 100 - 50 + 50,
            y: Math.random() * 100 - 50 + 50,
          }}
          animate={{
            x: [
              Math.random() * 200 - 100 + 150,
              Math.random() * 200 - 100 + 150,
              Math.random() * 200 - 100 + 150,
              Math.random() * 200 - 100 + 150,
            ],
            y: [
              Math.random() * 200 - 100 + 150,
              Math.random() * 200 - 100 + 150,
              Math.random() * 200 - 100 + 150,
              Math.random() * 200 - 100 + 150,
            ],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: tech.speed * 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundColor: tech.color,
            width: tech.size,
            height: tech.size,
            zIndex: Math.floor(tech.size),
          }}
        >
          {tech.name}
        </motion.div>
      ))}
      
      {/* Glowing orb in the center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-70 blur-xl" />
        <motion.div 
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Floating code snippets */}
      <motion.div
        className="absolute bottom-5 right-5 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-xs font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <pre className="text-indigo-600 dark:text-indigo-400">{'<code>Epic()</code>'}</pre>
      </motion.div>
      
      <motion.div
        className="absolute top-5 left-5 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-xs font-mono"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <pre className="text-green-600 dark:text-green-400">{'function()'}</pre>
      </motion.div>
    </div>
  )
}