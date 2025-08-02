"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | "loading" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "SENDING MESSAGE..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus({
        type: "success",
        message: "MESSAGE SENT SUCCESSFULLY!",
      });
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 3000);
    } catch (error) {
      setStatus({
        type: "error",
        message: "FAILED TO SEND MESSAGE. TRY AGAIN?",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Retro background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff2b2b_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <div className="text-center mb-16">
            <h2
              className="inline-block relative px-12 py-4 text-5xl font-black tracking-wider"
              style={{
                textShadow: `
                3px 3px 0px #ff2b2b,
                6px 6px 0px #1a1a1a
              `,
              }}
            >
              GET IN TOUCH
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-8">
              <div className="bg-[#2a2a2a] p-6 rounded-lg border-l-4 border-[#ff2b2b]">
                <h3 className="text-2xl font-bold mb-4 text-[#ff2b2b]">
                  Connect
                </h3>
                <div className="space-y-2">
                  <Link
                    href="https://discord.gg/KHjrBExm7H"
                    className="block text-gray-300 hover:text-[#ff2b2b] transition-colors"
                    target="_blank"
                  >
                    → Discord
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="YOUR NAME"
                  required
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border-2 border-[#333] focus:border-[#ff2b2b] focus:outline-none transition-colors"
                />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="YOUR EMAIL"
                  required
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border-2 border-[#333] focus:border-[#ff2b2b] focus:outline-none transition-colors"
                />
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="YOUR MESSAGE"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border-2 border-[#333] focus:border-[#ff2b2b] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Status message */}
              {status.type && (
                <div
                  className={`text-center p-4 rounded-lg ${
                    status.type === "success"
                      ? "bg-green-900/50 text-green-400"
                      : status.type === "error"
                        ? "bg-red-900/50 text-red-400"
                        : "bg-[#2a2a2a] text-[#ff2b2b]"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === "loading"}
                className={`w-full relative group overflow-hidden rounded-lg bg-[#ff2b2b] px-8 py-3 transition-all
                  ${status.type === "loading" ? "opacity-50 cursor-not-allowed" : "hover:bg-[#ff4444]"}`}
              >
                <span className="relative font-bold">
                  {status.type === "loading" ? "SENDING..." : "SEND MESSAGE"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#ff2b2b]" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#ff2b2b]" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#ff2b2b]" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#ff2b2b]" />
    </section>
  );
}
