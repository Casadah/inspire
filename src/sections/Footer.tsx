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
      <div className="px-[9vw] py-12">

        {/* Newsletter Section */}
        <div className="mb-10 text-center">
          <h3 className="text-white text-xl font-semibold mb-3">
            Subscribe to our Newsletter
          </h3>

          <p className="text-white/60 text-sm mb-6">
            Get updates about our projects and community impact.
          </p>

          <form
            action="https://app.us8.list-manage.com/subscribe/post?u=be65edac011b6802fd09d8b5d&id=e6f9b618be&f_id=00b11de0f0"
            method="post"
            target="_blank"
            className="flex flex-col md:flex-row gap-3 justify-center items-center max-w-xl mx-auto"
          >
            <input
              type="text"
              name="FNAME"
              placeholder="First Name"
              className="px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none"
            />

            <input
              type="email"
              name="EMAIL"
              placeholder="Enter your email"
              required
              className="px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none"
            />

            {/* Hidden anti-bot field */}
            <div style={{ position: 'absolute', left: '-5000px' }}>
              <input
                type="text"
                name="b_be65edac011b6802fd09d8b5d_e6f9b618be"
                tabIndex={-1}
              />
            </div>

            <button
              type="submit"
              className="bg-[#F2B33D] text-black px-5 py-2 rounded-md font-medium hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6">

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
