const LINKS = {
  Product: ["Browse Cars", "List Your Car", "How It Works", "Pricing"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Safety", "Contact Us", "Community"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"],
};

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SOCIALS = [
  { label: "LinkedIn", icon: <LinkedInIcon /> },
];

export default function Footer() {
  return (
    <footer className="bg-sky-500 text-white border-t border-sky-400">

      {/* Brand Row */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <div className="mb-3">
            <span className="font-extrabold text-2xl tracking-tight text-white">
              AutoShare
            </span>
          </div>
          <p className="text-white text-sm leading-relaxed font-light max-w-xs">
            Peer-to-peer car rentals connecting owners and renters through
            secure, seamless transactions.
          </p>
        </div>

        {/* Socials */}
        <div className="flex gap-3">
          {SOCIALS.map(({ label, icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="w-9 h-9 rounded-lg border border-sky-300 flex items-center justify-center text-white hover:bg-sky-400 transition-colors duration-200"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Link Columns Row */}
      <div className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {Object.entries(LINKS).map(([category, links]) => (
          <div key={category}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
              {category}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sky-100 hover:text-white text-sm font-light transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-sky-400" />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sky-100 text-xs font-light">
          © 2026 AutoShare. Built by{" "}
          <a
            href="https://www.michaelgubler.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-sky-200 transition-colors duration-200"
          >
            Michael Gubler
          </a>
          .
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-sky-100">
            <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block" />
            All systems operational
          </div>
          <span className="text-sky-300">|</span>
          <p className="text-sky-100 text-xs font-light">
            Made with ☕ in Pennsylvania
          </p>
        </div>
      </div>

    </footer>
  );
}