import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Handshake, Users, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

interface JoinUsSectionProps {
  className?: string;
}

const JoinUsSection = ({ className = '' }: JoinUsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'donate' | 'partner' | 'volunteer'>('donate');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const options = [
    {
      id: 'donate',
      icon: Heart,
      title: 'Donate',
      description: 'Your contribution helps us reach more young people and expand our programs. Every donation makes a difference.',
      cta: 'Make a Donation',
      benefits: ['Support youth empowerment programs','Fund educational materials','Sponsor a participant','Enable community outreach'],
    },
    {
      id: 'partner',
      icon: Handshake,
      title: 'Partner With Us',
      description: 'Collaborate with us to create greater impact. We welcome partnerships with organizations, schools, and businesses.',
      cta: 'Become a Partner',
      benefits: ['Co-create impactful programs','Access to our network','Joint funding opportunities','Shared resources and expertise'],
    },
    {
      id: 'volunteer',
      icon: Users,
      title: 'Volunteer',
      description: 'Share your time and skills to help us achieve our mission. Join our community of dedicated volunteers.',
      cta: 'Join as Volunteer',
      benefits: ['Mentor young people','Facilitate workshops','Support events','Contribute your expertise'],
    },
  ];

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

  const handleOpenDialog = (type: 'donate' | 'partner' | 'volunteer') => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1️⃣ Send to NGO email
      await emailjs.send(
        'service_fo3tci3',          // replace with EmailJS Service ID
        'template_wp754jc',      // replace with your template ID for NGO
        { ...formData, type: dialogType, logo_url: 'https://inspire-ivory.vercel.app/images/logo.png' },
        'J5FfjgZEwAHGV5oYq'           // replace with EmailJS Public Key
      );

      // 2️⃣ Auto-reply to user
      await emailjs.send(
        'service_fo3tci3',
        'template_rcd693d',   // create a separate template in EmailJS
        { ...formData, type: dialogType, logo_url: 'https://inspire-ivory.vercel.app/images/logo.png' },
        'J5FfjgZEwAHGV5oYq'
      );

      toast.success(`Thank you for your interest in ${dialogType}! We'll be in touch soon.`);
      setDialogOpen(false);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const selectedOption = options.find(o => o.id === dialogType);

  return (
    <section ref={sectionRef} id="join" className={`relative w-full min-h-screen bg-[#F6F7FA] py-24 md:py-32 ${className}`}>
      <div className="px-[9vw]">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <img src="/images/logo.png" alt="Inspire Ivory Logo" width={150} style={{ marginBottom: 20 }} />
          <span className="microcopy text-[#F2B33D] reveal-item">GET INVOLVED</span>
          <h2 className="heading-display text-[#0B0D10] mt-4 reveal-item" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            JOIN THE MOVEMENT
          </h2>
          <p className="text-[#6D7278] text-lg mt-4 max-w-2xl mx-auto reveal-item">
            Support our work with a donation, partner with us, or volunteer your time and skills.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <div key={index} className="reveal-item bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#F2B33D]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#F2B33D] transition-colors">
                <option.icon className="w-8 h-8 text-[#F2B33D] group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-[#0B0D10] text-2xl font-bold mb-4">{option.title}</h3>
              <p className="text-[#6D7278] leading-relaxed mb-6">{option.description}</p>

              <ul className="space-y-3 mb-8">
                {option.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#0B0D10]">
                    <Check className="w-4 h-4 text-[#F2B33D] flex-shrink-0" /> {/* ✅ Check icon used */}
                    {benefit}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleOpenDialog(option.id as 'donate' | 'partner' | 'volunteer')}
                className="w-full bg-[#0B0D10] hover:bg-[#F2B33D] text-white hover:text-[#0B0D10] rounded-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
              >
                {option.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#0B0D10]">{selectedOption?.title}</DialogTitle>
              <DialogDescription>{selectedOption?.description}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                required
              />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                required
              />
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={`Tell us why you'd like to ${dialogType}...`}
                rows={4}
                required
              />
              <Button type="submit" className="w-full bg-[#F2B33D] hover:bg-[#e0a336] text-[#0B0D10] rounded-full py-3 font-semibold">
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default JoinUsSection;
