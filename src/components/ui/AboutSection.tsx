"use client"

import React, { forwardRef, useRef } from "react"
import { motion, useScroll } from "framer-motion"
import DevelopmentImpactAnimation from "./DevelopmentImpactAnimation"

type AboutSectionProps = React.HTMLAttributes<HTMLElement>;

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>
(function AboutSection(_props, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })



  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-50 dark:to-indigo-950/20 opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            About Me
          </h2>
          <div className="h-1 w-20 bg-indigo-600 dark:bg-indigo-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I&apos;m a Technical Product Manager building AI-powered software products from 0 to 1 
                at a healthcare technology company. I thrive at the intersection of engineering and 
                product, working cross-functionally to ship products that reimagine how we work. 
                With a background in software development, I still build side projects that explore 
                the practical applications of AI and technology in the physical world. Beyond tech, 
                I’m a value investor passionate about understanding businesses at their core. I write 
                investment theses grounded in valuation, fundamental analysis, and strategic insight 
                — always looking for opportunities where technology and capital can create long-term value.
            </p>
          </motion.div>

          {/* Right side with development impact animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <DevelopmentImpactAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default AboutSection