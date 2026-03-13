"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  message: string
}

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data)
  }

  return (
    <section id="contact" className="px-8 py-24 md:px-16 lg:px-24">
      <div className="max-w-2xl">
        <p className="mb-2 text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground">
          Get In Touch
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Contact
        </h2>
        <p className="mb-12 text-muted-foreground">
          Have a project in mind or just want to say hello? Drop me a message.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="contact-input"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="contact-input"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell me about your project..."
              className="contact-input resize-none"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button type="submit" size="lg" className="gap-2">
            Send Message
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </section>
  )
}
