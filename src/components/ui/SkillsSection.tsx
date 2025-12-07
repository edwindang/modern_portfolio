"use client";

import type React from "react";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Code,
  Brain,
  BarChart4,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: string[];
  color: string;
}

type SkillsSectionProps = React.HTMLAttributes<HTMLElement>;

const SkillsSection = forwardRef<HTMLElement, SkillsSectionProps>(
  function AboutSection(_props, ref) {
    const [activeCategory, setActiveCategory] = useState<string>("product");

    const skillCategories: SkillCategory[] = [
      {
        id: "product",
        title: "Product & Strategy",
        icon: <Briefcase className="h-6 w-6" />,
        description:
          "Transforming ideas into successful products through strategic planning and user-centered design.",
        skills: [
          "0 --> 1 Product Development",
          "API Design & Integration",
          "System Design",
          "A/B Testing",
          "Stakeholder Management",
          "User Research & Prototyping",
        ],
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: "technical",
        title: "Technical Proficiencies",
        icon: <Code className="h-6 w-6" />,
        description:
          "Building robust, scalable solutions with modern technologies and best practices.",
        skills: [
          "Data Modeling",
          "Scalable System Architecture",
          "MVP development",
          "Cloud Infrastructure",
          "JavaScript",
          "React",
          "GraphQL",
          "Redis",
          "AWS (S3, VPCs, API Gateway, IAM)",
          "Pulumi",
          "CI/CD Pipelines",
        ],
        color: "from-purple-500 to-pink-500",
      },
      {
        id: "ai",
        title: "AI/ML/Data",
        icon: <Brain className="h-6 w-6" />,
        description:
          "Leveraging data and machine learning to create intelligent solutions and derive actionable insights.",
        skills: [
          "Machine Learning Concepts",
          "LLM Applications",
          "Prompt Engineering",
          "AI Product Design",
          "Data Mapping & ETL",
          "MLOps",
          "Model Evaluation & Experimentation",
          "SaaS & Data Platform Development",
        ],
        color: "from-green-500 to-teal-500",
      },
      {
        id: "finance",
        title: "Finance/Investing/Quant",
        icon: <BarChart4 className="h-6 w-6" />,
        description:
          "Applying quantitative methods and financial expertise to drive investment strategies and business decisions.",
        skills: [
          "Financial Modeling",
          "DCF Analysis",
          "Equity Valuation",
          "Market Data APIs",
          "Accounting Principles",
        ],
        color: "from-amber-500 to-orange-500",
      },
    ];

    const activeSkillCategory = skillCategories.find(
      (category) => category.id === activeCategory
    )!;

    return (
      <section id="skills" className="py-16 md:py-24" ref={ref}>
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My Skills
          </h2>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Category Selection - Left Side */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="space-y-2">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`${activeCategory === category.id ? "text-white" : "text-primary"}`}
                      >
                        {category.icon}
                      </div>
                      <span className="ml-3 font-medium">{category.title}</span>
                    </div>
                    {activeCategory === category.id && (
                      <ChevronRight className="h-5 w-5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Display - Right Side */}
            <div className="md:col-span-8 lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div
                    className={`h-2 w-full bg-gradient-to-r ${activeSkillCategory.color}`}
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-r ${activeSkillCategory.color} text-white`}
                      >
                        {activeSkillCategory.icon}
                      </div>
                      <h3 className="text-2xl font-bold ml-4">
                        {activeSkillCategory.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {activeSkillCategory.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeSkillCategory.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                        >
                          <CheckCircle2
                            className={`h-5 w-5 mr-2 bg-gradient-to-r ${activeSkillCategory.color} text-transparent bg-clip-text`}
                          />
                          <span>{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default SkillsSection;
