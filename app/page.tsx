"use client"

import type React from "react"
import { useState } from "react"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(true)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Create FormData for Netlify Forms
      const formData = new FormData()
      formData.append("form-name", "beta-waitlist")
      formData.append("email", email)
      formData.append("timestamp", new Date().toISOString())

      // Convert to URLSearchParams for proper encoding
      const urlEncodedData = new URLSearchParams(formData as any).toString()

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData,
      });

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setShowEmailForm(false)
          setIsSubmitted(false)
          setEmail("")
        }, 3000)
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {showEmailForm && (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Join the Waitlist"}
            </button>
            {submitError && <p>{submitError}</p>}
            {isSubmitted && <p>Thank you!</p>}
          </form>
        )}
      </div>
    </main>
  )
}
