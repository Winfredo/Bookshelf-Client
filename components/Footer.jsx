import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-[#eeeeee] border-t border-gray-200 py-8 sm:py-12 px-4 sm:px-6 md:px-16">
  {/* Mobile: column, Tablet/Desktop: row */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
    
    {/* Logo Section - Centered on mobile, left on desktop */}
    <div className="text-center md:text-left">
      <span className="text-xl sm:text-2xl font-bold text-[#041534]">Bookshelf</span>
      <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto md:mx-0">
        Empowering the world through seamless access to shared knowledge.
      </p>
    </div>

    {/* Links Section - Wraps nicely on all screens */}
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 px-2">
      {["Privacy Policy", "Terms of Service", "Library Hours", "Contact Us"].map((link) => (
        <a
          key={link}
          className="text-gray-500 hover:text-[#041534] transition-all underline decoration-[#835500] underline-offset-4 text-xs sm:text-sm whitespace-nowrap"
          href="#"
        >
          {link}
        </a>
      ))}
    </div>

    {/* Copyright Section - Centered on mobile, right on desktop */}
    <div className="text-center md:text-right">
      <p className="text-xs text-gray-500">
        © 2024 Bookshelf Management System
      </p>
    </div>
    
  </div>
</footer>
      
  )
}

export default Footer
