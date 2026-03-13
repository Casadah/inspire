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
    { id: 'donate', icon: Heart, title: 'Donate', description: 'Support our programs.', cta: 'Make a Donation', benefits: ['Support youth','Fund materials','Sponsor participants','Enable outreach'] },
    { id: 'partner', icon: Handshake, title: 'Partner', description: 'Collaborate with us.', cta: 'Become a Partner', benefits: ['Co-create programs','Access network','Joint funding','Shared resources'] },
    { id: 'volunteer', icon: Users, title: 'Volunteer', description: 'Join our community.', cta: 'Join as Volunteer', benefits: ['Mentor youth','Facilitate workshops','Support events','Contribute expertise'] },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('.reveal-item'),
        { y:40, opacity:0 },
        { y:0, opacity:1, duration:0.8, stagger:0.1, ease:'power2.out', scrollTrigger:{ trigger:section, start:'top 70%', toggleActions:'play none none reverse' } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const handleOpenDialog = (type:'donate'|'partner'|'volunteer') => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Send to NGO email
      await emailjs.send(
        'service_fo3tci3',
        'template_wp754jc',
        { ...formData, type: dialogType, logo_url:'https://inspire-ivory.vercel.app/images/logo.png' },
        'J5FfjgZEwAHGV5oYq'
      );

      // 2. Auto-reply to user
      await emailjs.send(
        'service_fo3tci3',
        'template_rcd693d',
        { ...formData, type: dialogType, logo_url:'https://inspire-ivory.vercel.app/images/logo.png' },
        'J5FfjgZEwAHGV5oYq'
      );

      toast.success(`Thank you for your interest in ${dialogType}! We'll be in touch soon.`);
      setDialogOpen(false);
      setFormData({ name:'', email:'', message:'' });
    } catch(err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const selectedOption = options.find(o => o.id === dialogType);

  return (
    <section ref={sectionRef} id="join" className={`relative w-full min-h-screen bg-[#F6F7FA] py-24 md:py-32 ${className}`}>
      <div className="px-[9vw]">
        <div className="mb-16 text-center">
          <span className="microcopy text-[#F2B33D] reveal-item">GET INVOLVED</span>
          <h2 className="heading-display text-[#0B0D10] mt-4 reveal-item">JOIN THE MOVEMENT</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option, i) => (
            <div key={i} className="reveal-item bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#F2B33D]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#F2B33D]">
                <option.icon className="w-8 h-8 text-[#F2B33D] group-hover:text-white"/>
              </div>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <ul>{option.benefits.map((b,i)=><li key={i}>{b}</li>)}</ul>
              <Button onClick={()=>handleOpenDialog(option.id as 'donate'|'partner'|'volunteer')}>{option.cta} <ArrowRight/></Button>
            </div>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedOption?.title}</DialogTitle>
              <DialogDescription>{selectedOption?.description}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <Input value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} placeholder="Name" required/>
              <Input type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} placeholder="Email" required/>
              <Textarea value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} placeholder="Message" required/>
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default JoinUsSection;
