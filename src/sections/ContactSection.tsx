import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Instagram, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.reveal-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const templateParams = {
      from_name: contactForm.name,
      from_email: contactForm.email,
      message: contactForm.message,
      logo_url: "https://inspire-ivory.vercel.app/images/logo.png",
    };

    setContactForm({ name: '', email: '', message: '' });
    toast.success("Your message is being sent...");

    try {
      // Send message to organization
      await emailjs.send(
        "service_fo3tci3",
        "template_wp754jc",
        templateParams,
        "J5FfjgZEwAHGV5oYq"
      );

      // Optional auto-reply
      await emailjs.send(
        "service_fo3tci3",
        "template_rcd693d",
        templateParams,
        "J5FfjgZEwAHGV5oYq"
      );

      toast.success("Message sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Newsletter submission to Google Sheets
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !firstName.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwg5ycaddzzNorgWKJqujsPDlA6XF4TickUhxBT8ZU49qGv9-Z2wrreeR1mY6fCoid_-g/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            email: newsletterEmail.trim(),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Thank you for subscribing!");
        setNewsletterEmail('');
        setFirstName('');
      } else {
        toast.error(`Subscription failed: ${data.error || "Try again."}`);
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      toast.error("Subscription failed. Try again.");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className={`relative w-full bg-[#0B0D10] py-24 md:py-32 ${className}`}>
      <div className="px-[9vw]">
        {/* Section Header */}
        <div className="mb-16">
          <span className="microcopy text-[#F2B33D] reveal-item">CONTACT</span>
          <h2 className="heading-display text-white mt-4 reveal-item" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            LET'S BUILD TOGETHER
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl reveal-item">
            Have a question, idea, or partnership in mind? Reach out—we respond within two business days.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info & Newsletter */}
          <div>
            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              {/* Email */}
              <div className="reveal-item flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F2B33D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#F2B33D]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <a href="mailto:inspireinitiative1@gmail.com" className="text-white/60 hover:text-[#F2B33D] transition-colors">
                    inspireinitiative1@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="reveal-item flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F2B33D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#F2B33D]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-white/60">Gombe, Nigeria</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="reveal-item flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F2B33D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-[#F2B33D]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Social Media</h4>
                  <div className="flex gap-4 mt-2">
                    <a href="https://www.facebook.com/inspiredevelopmentinitiative/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F2B33D] transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-white/60 hover:text-[#F2B33D] transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-white/60 hover:text-[#F2B33D] transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="reveal-item bg-white/5 rounded-3xl p-8">
              <h4 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                Subscribe to Our Newsletter
              </h4>
              <p className="text-white/60 text-sm mb-6">
                Stay updated with our latest programs, success stories, and opportunities to get involved.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-3">
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full px-5 py-3"
                />
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full px-5 py-3"
                />
                <Button type="submit" className="bg-[#F2B33D] hover:bg-[#e0a336] text-[#0B0D10] rounded-full px-6 py-3 font-semibold flex items-center justify-center gap-2">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="reveal-item">
            <form onSubmit={handleContactSubmit} className="bg-white rounded-3xl p-8 md:p-10">
              <h4 className="text-[#0B0D10] font-bold text-xl mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
                Send us a Message
              </h4>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#0B0D10] mb-2 block">Name</label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="rounded-xl border-[#E5E7EB] focus:border-[#F2B33D] focus:ring-[#F2B33D]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0B0D10] mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="rounded-xl border-[#E5E7EB] focus:border-[#F2B33D] focus:ring-[#F2B33D]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0B0D10] mb-2 block">Message</label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    className="rounded-xl border-[#E5E7EB] focus:border-[#F2B33D] focus:ring-[#F2B33D] resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-[#F2B33D] hover:bg-[#e0a336] text-[#0B0D10] rounded-full py-4 font-semibold flex items-center justify-center gap-2">
                  Send Message
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ContactSection };
