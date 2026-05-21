import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-[#eeeeee] border-t border-gray-200 py-12 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="text-2xl font-bold text-[#041534]">Bookshelf</span>
          <p className="text-xs text-gray-500 mt-2 max-w-xs">
            Empowering the world through seamless access to shared knowledge.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Privacy Policy", "Terms of Service", "Library Hours", "Contact Us"].map((link) => (
              <a
                key={link}
                className="text-gray-500 hover:text-[#041534] transition-all underline decoration-[#835500] underline-offset-4 text-sm"
                href="#"
              >
                {link}
              </a>
          ))}
        </div>
        <div className="text-center md:text-right">
          <p className="text-xs text-gray-500">© 2024 Bookshelf Management System</p>
        </div>
      </footer>
      
  )
}

export default Footer
