"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mail, User } from "lucide-react"
import { toast, Toaster } from "sonner"

interface FormData {
  name: string
  email: string
  message: string
}

// Track if the Toaster has been mounted to prevent duplicate instances
let toasterMounted = false

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [showToaster, setShowToaster] = useState(false)

  // Only mount the Toaster once, even if multiple ContactForm components exist
  useEffect(() => {
    if (!toasterMounted) {
      setShowToaster(true)
      toasterMounted = true
    }

    return () => {
      // If this component unmounts and it's showing the toaster, allow another to show it
      if (showToaster) {
        toasterMounted = false
      }
    }
  }, [])

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))

    // Clear error when user types
    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Create a loading toast that we can update later
    const loadingToastId = toast.loading("Sending your message...")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Reset form on success
      setFormData({ name: "", email: "", message: "" })

      // Update the loading toast with success message
      toast.success("Message sent!", {
        id: loadingToastId,
        description: "Thank you for your message. I will get back to you soon.",
      })
    } catch (error) {
      console.error("Error sending message:", error)

      // Update the loading toast with error message
      toast.error("Error", {
        id: loadingToastId,
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {showToaster && <Toaster richColors position="bottom-right" />}

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Name
          </label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`flex h-10 w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-input"
            } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`flex h-10 w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-input"
            } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder="Your email"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium leading-none">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            className={`flex min-h-[120px] w-full rounded-md border ${
              errors.message ? "border-red-500" : "border-input"
            } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder="Your message"
          />
          {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        <div className="mt-8 flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span>{process.env.NEXT_PUBLIC_CONTACT_EMAIL || "edwin.dang8@gmail.com"}</span>
          </div>
        </div>
      </form>
    </>
  )
}
