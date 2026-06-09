export default function LinkedInBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A66C2] text-white py-2.5 px-4 flex items-center justify-center gap-3 shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 shrink-0"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      <span className="text-sm font-medium">
        Enjoyed the notes? The creator would love to hear from you 👋
      </span>
      <a
        href="https://www.linkedin.com/in/freakazoid"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-full bg-white text-[#0A66C2] text-xs font-bold px-4 py-1.5 hover:bg-blue-50 transition-colors"
      >
        Send a DM →
      </a>
    </div>
  );
}
