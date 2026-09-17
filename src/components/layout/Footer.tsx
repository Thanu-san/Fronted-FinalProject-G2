"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import nextShopLogo from "@/assets/NextShop.png";
import istadLogo from "@/assets/ISTAD_Light.png";

// ── Social icon SVGs ────────────────────────────────────────────────────────
function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
    </svg>
  );
}

// ── Contact icons ────────────────────────────────────────────────────────────
function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.91 6.91l1.09-1.09a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
  ];

  const serviceLinks = [
    { label: "Cart", href: "/cart" },
    { label: "Help center", href: "#" },
    { label: "Contact us", href: "#" },
  ];

  const socialLinks = [
    { icon: <YouTubeIcon />, href: "#", label: "YouTube" },
    { icon: <FacebookIcon />, href: "#", label: "Facebook" },
    { icon: <InstagramIcon />, href: "#", label: "Instagram" },
    { icon: <TikTokIcon />, href: "#", label: "TikTok" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#07080e] via-[#0a0d1d] via-70% to-[#252063] text-white border-t border-indigo-950/60 mt-auto">
      {/* ── Ambient Indigo Glows ────────────────────────────────────────── */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1 — Brand & Newsletter (Span 5 of 12) */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-block">
              <Image
                src={nextShopLogo}
                alt="NextShop"
                width={260}
                height={130}
                className="h-auto w-52 sm:w-56 lg:w-60 object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400 max-w-md">
              Your ultimate destination for modern online shopping, offering a
              seamless and secure digital marketplace experience.
            </p>

            {/* Newsletter Subscription Card (Stay Updated) */}
            <div className="mt-2 max-w-md rounded-2xl border border-indigo-500/20 bg-indigo-950/30 p-4 backdrop-blur-xs shadow-lg shadow-black/20">
              <div className="mb-3.5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-md shadow-primary/25">
                  <MailIcon />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Stay Updated
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Get the latest deals, new arrivals, and exclusive offers.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="h-10 flex-1 rounded-xl border border-white/15 bg-black/40 px-3.5 text-xs text-white placeholder-zinc-500 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-white shadow-md shadow-primary/30 transition-all hover:bg-primary-hover active:scale-95 shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </form>

              {isSubscribed && (
                <p className="mt-2.5 text-xs font-medium text-emerald-400 animate-in fade-in duration-200">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Column 2 — Quick Link (Span 2 of 12) */}
          <div className="sm:col-span-1 lg:col-span-2 lg:pl-2">
            <h3 className="mb-5 text-base font-semibold text-white after:mt-2 after:block after:h-0.5 after:w-10 after:rounded-full after:bg-primary after:content-['']">
              Quick Link
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Service (Span 2 of 12) */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="mb-5 text-base font-semibold text-white after:mt-2 after:block after:h-0.5 after:w-8 after:rounded-full after:bg-primary after:content-['']">
              Service
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Get in Touch & ISTAD (Span 3 of 12) */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="mb-5 text-base font-semibold text-white after:mt-2 after:block after:h-0.5 after:w-12 after:rounded-full after:bg-primary after:content-['']">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-zinc-400">
                <span className="mt-0.5 shrink-0 text-primary">
                  <MailIcon />
                </span>
                <span>nextshop@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-zinc-400">
                <span className="mt-0.5 shrink-0 text-primary">
                  <PhoneIcon />
                </span>
                <span>+855 99 677 687 / 12 345 678</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-zinc-400">
                <span className="mt-0.5 shrink-0 text-primary">
                  <MapPinIcon />
                </span>
                <span>Toul Kork, Phnom Penh</span>
              </li>
            </ul>

            {/* Sponsored */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-primary">
                Sponsored and Organized
              </p>
              <a
                href="https://istad.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-opacity duration-200 hover:opacity-85"
                title="Institute of Science and Technology Advanced Development"
              >
                <Image
                  src={istadLogo}
                  alt="ISTAD - Institute of Science and Technology Advanced Development"
                  width={220}
                  height={100}
                  className="h-auto w-44 sm:w-48 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/10 bg-black/25">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row lg:px-8">
          <p className="text-xs text-zinc-400">
            © 2026 NextShop. All Rights Reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-primary"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
