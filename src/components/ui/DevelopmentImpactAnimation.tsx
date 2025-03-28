"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DevelopmentImpactAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [isInView, setIsInView] = useState(false)

  // Setup intersection observer to detect when animation is in view
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }, // Start when 30% visible
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-cycle through stages when in view
  useEffect(() => {
    if (!isInView) return

    // Set up interval to cycle through stages every 3 seconds
    const interval = setInterval(() => {
      setCurrentStage((prevStage) => (prevStage + 1) % 4) // Cycle through 0-3
    }, 3000)

    // Clean up interval when component is not in view or unmounted
    return () => clearInterval(interval)
  }, [isInView])

  // Animation variants for each stage
  const stageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, position: "absolute" },
  }

  // Content for each stage
  const stages = [
    {
      title: "Code",
      color: "from-blue-500 to-cyan-500",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-900 p-4 font-mono text-sm">
          <pre className="text-gray-300">
            <code>{`function optimizeUser(data) {
  const metrics = analyzePatterns(data);
  const insights = generateInsights(metrics);
  
  return {
    recommendations: insights.map(insight => ({
      action: insight.action,
      impact: calculateImpact(insight),
      priority: insight.confidence * insight.value
    })),
    projectedROI: calculateProjectedROI(insights)
  };
}`}</code>
          </pre>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent"></div>

          {/* Animated cursor */}
          <motion.div
            className="absolute top-[4.5rem] left-[10.5rem] h-4 w-2 bg-blue-500"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      ),
    },
    {
      title: "Product Design",
      color: "from-purple-500 to-pink-500",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-4">
          <div className="flex flex-col gap-4">
            <div className="h-8 w-full rounded-md bg-gray-200 dark:bg-gray-700">
              <div className="flex h-full items-center px-4">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <div className="h-full rounded-md bg-gray-200 dark:bg-gray-700 p-3">
                  <div className="mb-2 h-3 w-3/4 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                  <div className="mb-2 h-3 w-full rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-3 w-2/3 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="h-full rounded-md bg-gray-200 dark:bg-gray-700 p-3">
                  <div className="mb-3 h-4 w-1/3 rounded-sm bg-purple-400 dark:bg-purple-600"></div>
                  <div className="mb-2 h-3 w-full rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                  <div className="mb-2 h-3 w-full rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-3 w-4/5 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-3 h-24">
                <div className="mb-2 h-3 w-1/2 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-16 w-full rounded-sm bg-purple-200 dark:bg-purple-900/30"></div>
              </div>
              <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-3 h-24">
                <div className="mb-2 h-3 w-1/2 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-16 w-full rounded-sm bg-pink-200 dark:bg-pink-900/30"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "User Metrics",
      color: "from-green-500 to-teal-500",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-1/3 rounded-sm bg-green-500 dark:bg-green-600"></div>
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-6 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-3">
                <div className="mb-1 h-3 w-1/2 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">+24%</div>
                <div className="h-2 w-2/3 rounded-sm bg-gray-200 dark:bg-gray-600 mt-2"></div>
              </div>
              <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-3">
                <div className="mb-1 h-3 w-1/2 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">12.8k</div>
                <div className="h-2 w-2/3 rounded-sm bg-gray-200 dark:bg-gray-600 mt-2"></div>
              </div>
              <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-3">
                <div className="mb-1 h-3 w-1/2 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">98.3%</div>
                <div className="h-2 w-2/3 rounded-sm bg-gray-200 dark:bg-gray-600 mt-2"></div>
              </div>
            </div>

            <div className="h-40 rounded-md bg-gray-100 dark:bg-gray-700 p-3 relative">
              <div className="mb-2 h-3 w-1/4 rounded-sm bg-gray-300 dark:bg-gray-600"></div>

              {/* Chart bars */}
              <div className="absolute bottom-3 left-3 right-3 flex h-28 items-end justify-between gap-2">
                {[40, 65, 45, 80, 60, 75, 50].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-full bg-teal-500 dark:bg-teal-600 rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Financial Impact",
      color: "from-amber-500 to-orange-500",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-2/5 rounded-sm bg-amber-500 dark:bg-amber-600"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-3">
                <div className="mb-1 h-3 w-1/2 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-xl font-bold text-amber-600 dark:text-amber-400">$1.2M</div>
                <div className="flex items-center mt-1">
                  <div className="h-4 w-4 text-green-500">↑</div>
                  <div className="text-xs text-green-600 dark:text-green-400 ml-1">32% YoY</div>
                </div>
              </div>
              <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-3">
                <div className="mb-1 h-3 w-1/2 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">428%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">ROI</div>
              </div>
            </div>

            <div className="h-40 rounded-md bg-gray-100 dark:bg-gray-700 p-3 relative">
              <div className="mb-2 h-3 w-1/3 rounded-sm bg-gray-300 dark:bg-gray-600"></div>

              {/* Line chart */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M0,80 C20,70 30,50 40,40 S60,20 80,10 L100,0 V100 H0 Z"
                  fill="url(#gradient)"
                  fillOpacity="0.2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.path
                  d="M0,80 C20,70 30,50 40,40 S60,20 80,10 L100,0"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Data points */}
              {[
                { x: 0, y: 80 },
                { x: 20, y: 70 },
                { x: 40, y: 40 },
                { x: 60, y: 20 },
                { x: 80, y: 10 },
                { x: 100, y: 0 },
              ].map((point, i) => (
                <motion.div
                  key={i}
                  className="absolute h-3 w-3 rounded-full bg-white border-2 border-orange-500 dark:border-orange-400"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div ref={containerRef} className="relative h-[400px] md:h-[500px] w-full" id="animation-container">
      {/* Background gradient that changes with stage */}
      <motion.div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stages[currentStage].color} opacity-10 dark:opacity-20`}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Stage title */}
      <AnimatePresence mode="wait">
        <motion.div
          className="absolute top-4 left-4 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          key={`title-${currentStage}`}
        >
          <h3
            className={`text-xl font-bold bg-gradient-to-r ${stages[currentStage].color} text-transparent bg-clip-text`}
          >
            {stages[currentStage].title}
          </h3>
        </motion.div>
      </AnimatePresence>

      {/* Stage content with animation */}
      <div className="absolute inset-0 p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`stage-${currentStage}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={stageVariants}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            {stages[currentStage].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stage indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {stages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentStage ? "bg-white" : "bg-gray-400 dark:bg-gray-600"}`}
            animate={{
              scale: index === currentStage ? 1.5 : 1,
              opacity: index === currentStage ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

