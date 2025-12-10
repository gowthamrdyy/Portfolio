"use client";

import { Globe } from "@/components/ui/globe";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/gowthamrdyy",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/gowthamrdyy",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/gowthamrdyy",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:iamgowthamsree@gmail.com",
    },
  ];

  return (
    <footer className="relative w-full bg-black border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Globe */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center overflow-hidden rounded-lg border border-neutral-800 bg-gradient-to-b from-neutral-950 to-black">
              <span className="pointer-events-none absolute top-8 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-center text-5xl md:text-7xl font-bold whitespace-pre-wrap text-transparent z-10">
                Connect
              </span>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Globe className="w-full h-full" />
              </div>
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </div>
          </div>

          {/* Right Side - Info & Links */}
          <div className="flex flex-col gap-8">
            {/* About */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Work Together
              </h3>
              <p className="text-neutral-400 text-lg leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Feel free to reach out!
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Connect With Me
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                      <span className="text-neutral-400 group-hover:text-white transition-colors">
                        {link.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#about"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  About
                </a>
                <span className="text-neutral-700">•</span>
                <a
                  href="#skills"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Skills
                </a>
                <span className="text-neutral-700">•</span>
                <a
                  href="#projects"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Projects
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Gowtham. All rights reserved.
            </p>
            <p className="text-neutral-500 text-sm">
              Built with more ❤️...
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
