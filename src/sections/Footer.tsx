
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Team', href: '#team' },
    { label: 'Join', href: '#join' },
    { label: 'Contact', href: '#contact' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Privacy', href: '#' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B0D10] border-t border-white/10">
      <div className="px-[9vw] py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <a
            href="#"
            className="text-white font-bold text-xl tracking-tight text-center md:text-left"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            INSPIRE DEVELOPMENT INITIATIVE
          </a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-white/60 text-sm hover:text-[#F2B33D] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-white/40 text-sm flex items-center gap-1 text-center md:text-right">
            © {currentYear} INSPIRE DEVELOPMENT INITIATIVE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
