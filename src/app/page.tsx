"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AboutSection from "@/components/ui/AboutSection";
import SkillsSection from "@/components/ui/SkillsSection";
import {projects} from "../components/ui/projects"
import {memos} from "../components/ui/memos"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const sections = ["home", "about", "skills", "projects", "memos", "contact"];
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Register refs for each section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find which section is currently in view
      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="min-h-screen bg-background">

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="#home" className="text-xl font-bold">
            Portfolio
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {sections.map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </nav>
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        ref={(el) => {(sectionRefs.current.home = el)}}
        className="pt-32 pb-16 md:pt-40 md:pb-24"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary mb-4">
              <Image
                src="/me_zoom.jpeg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Hi, I&apos;m <span className="text-primary">Edwin</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px]">
            Technical Product Manager | Software Developer | Investor Welcome to my Portfolio!
            </p>
            <div className="flex gap-4 mt-6">
              <Button asChild>
                <Link href="#contact">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#projects">View Projects</Link>
              </Button>
            </div>
            <div className="flex gap-4 mt-8">
              <Link
                href="https://github.com/edwindang"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/edwindang"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => {(sectionRefs.current.projects = el)}}
        className="py-16 md:py-24"
      >
        <div className="container px-4 md:px-6">
          <ScrollAnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              My Projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  imageUrl={project.image}
                  viewCode={project.source}
                  Demo={project.visit}
                />
              ))}
            </div>
            {/* <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="#">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div> */}
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Memos Section */}
      <section
        id="memos"
        ref={(el) => {(sectionRefs.current.memos = el)}}
        className="py-16 md:py-24 bg-muted/50"
      >
        <div className="container px-4 md:px-6">
          <ScrollAnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Investment Memos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {memos.map((memo) => (
                <MemoCard
                  key={memo.key}
                  title={memo.title}
                  excerpt={memo.description}
                  date={memo.date}
                  link={memo.source}
                />
              ))}
            </div>
            {/* <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="#">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div> */}
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => {(sectionRefs.current.contact = el)}}
        className="py-16 md:py-24"
      >
        <div className="container px-4 md:px-6">
          <ScrollAnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Get In Touch
            </h2>
            <div className="max-w-md mx-auto">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your email"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your message"
                  />
                </div>
                <Button>Send Message</Button>
              </div>
              {/* <div className="mt-8 flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>your.email@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>Your Location</span>
                </div>
              </div> */}
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Your Name. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Scroll Animation Component
function ScrollAnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [60, 0, 0, 60]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="w-full">
      {children}
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  viewCode,
  Demo,
}: {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  viewCode: string;
  Demo: string;
}) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative w-full h-78">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={viewCode} target="_blank">
              <Code className="mr-2 h-4 w-4" /> View Code
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={Demo} target="_blank">
              <ArrowRight className="mr-2 h-4 w-4" /> Demo
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Memo Card Component
function MemoCard({
  title,
  excerpt,
  date,
  link,
}: {
  title: string;
  excerpt: string;
  date: string;
  link: string;
}) {
  return (
    <Card className="group">
      <CardHeader>
        <div className="text-sm text-muted-foreground">{date}</div>
        <CardTitle className="group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="gap-1" asChild>
          <Link href={link} target="_blank">
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
