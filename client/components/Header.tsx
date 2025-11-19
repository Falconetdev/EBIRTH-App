import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const membershipItems = [
    { name: "Free Trading Membership", href: "#" },
    { name: "Institutional Membership", href: "#" },
    {
      name: "Elliott Wave Membership",
      href: "#",
      hasSubmenu: true,
      subItems: [
        { name: "Elliott Wave - Online", href: "#" },
        { name: "Elliott Wave - Kegalle", href: "#" },
      ]
    },
  ];

  const coursesItems = [
    { name: "Web Development Masterclass", href: "#" },
    {
      name: "Language Courses",
      href: "#",
      hasSubmenu: true,
      subItems: [
        { name: "Korean Language", href: "#" },
      ]
    },
  ];

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#who-we-are" },
    { name: "Membership", href: "#", hasDropdown: true, items: membershipItems },
    { name: "Courses", href: "#", hasDropdown: true, items: coursesItems },
    { name: "Community", href: "#community" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleDropdown = (linkName: string) => {
    setOpenDropdown(openDropdown === linkName ? null : linkName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.relative')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a0b2e]/95 backdrop-blur-sm border-b border-purple-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/ebirth-logo.png"
              alt="eBirth Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.hasDropdown ? (
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.name}
                    <ChevronDown size={16} className={`transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </a>
                )}

                {/* Dropdown Menu */}
                {link.hasDropdown && openDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#1a0b2e] border border-purple-800/30 rounded-lg shadow-lg backdrop-blur-sm z-50">
                    <div className="py-2">
                      {link.items.map((item) => (
                        <div key={item.name}>
                          {item.hasSubmenu ? (
                            <div className="relative group">
                              <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-purple-800/20 transition-colors">
                                {item.name}
                                <ChevronDown size={12} className="rotate-[-90deg]" />
                              </button>
                              {/* Submenu */}
                              <div className="absolute top-0 left-full ml-1 w-48 bg-[#1a0b2e] border border-purple-800/30 rounded-lg shadow-lg backdrop-blur-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-2">
                                  {item.subItems?.map((subItem) => (
                                    <a
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="block px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-purple-800/20 transition-colors"
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      {subItem.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <a
                              href={item.href}
                              className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-purple-800/20 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Get Started Button - Desktop */}
          <div className="hidden md:block">
            <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-6 py-2 rounded-lg">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-800/20">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-6 py-2 rounded-lg w-full mt-2">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
