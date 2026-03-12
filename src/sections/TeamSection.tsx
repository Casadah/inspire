import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Users, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamSectionProps {
  className?: string;
}

const TeamSection = ({ className = '' }: TeamSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const team = {
    founder: {
      name: "Amin Amos Ma'ori",
      role: 'Coach/Founder',
      image: '/images/team/amin.jpg',
    },
    brainTrust: [
      { name: 'Dr. Ishaku Lemu', role: 'Advisor', image: '/images/team/aaron.jpg' },
      { name: 'Mrs. Martha Amin', role: 'Advisor', image: '/images/team/aaron.jpg' },
      { name: 'Mr. Abdon Sadah', role: 'Advisor', image: '/images/team/aaron.jpg' },
      { name: 'Mr. Samaila Bitrus', role: 'Advisor', image: '/images/team/aaron.jpg' },
      { name: 'Mr. Mabe Budidi', role: 'Advisor', image: '/images/team/aaron.jpg' },
      { name: 'Mr. Peter Ligari', role: 'Advisor', image: '/images/team/aaron.jpg' },
      { name: 'Mr. Gideon Mela', role: 'Advisor', image: '/images/team/aaron.jpg' },
    ],
    management: [
      { name: 'Cephas Aaron', role: 'Executive Director', image: '/images/team/aaron.jpg' },
      { name: 'Caleb Sadah', role: 'Admin/Project Director', image: '/images/team/caleb.jpg' },
      { name: 'Jacob George', role: 'Program Coordinator', image: '/images/team/jacob.jpg' },
      { name: 'Ayuni Titus', role: 'Program Coordinator', image: '/images/team/ayuni.jpg' },
      { name: 'Keturah Heman', role: 'Communications Officer', image: '/team/images/kate.jpg' },
      { name: 'Yusuf Karu', role: 'Project Dev. Officer', image: '/images/team/yusuf.jpg' },
      { name: 'Jude Joel', role: 'Executive Assistant', image: '/images/team/jude.jpg' },
      { name: 'Andrawus Philip', role: 'Volunteer Coordinator', image: '/images/team/andy.jpg' },
      { name: 'Hannatu Saleh', role: 'Finance Officer', image: '/images/team/hanny.jpg' },
    ],
    volunteers: [
      { name: 'Nyulama Panyi', role: 'Volunteer', image: '/images/team/barry.jpg' },
      { name: 'Mary Kibirita', role: 'Volunteer', image: '/images/team/mary.jpg' },
    ],
  };

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
          stagger: 0.08,
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

  const TeamCard = ({ 
    name, 
    role, 
    image, 
    highlight = false 
  }: { 
    name: string; 
    role: string; 
    image?: string;
    highlight?: boolean;
  }) => (
    <div
      className={`reveal-item rounded-2xl overflow-hidden transition-all hover:shadow-lg group ${
        highlight
          ? 'bg-[#F2B33D] text-[#0B0D10]'
          : 'bg-white text-[#0B0D10] hover:bg-[#0B0D10] hover:text-white'
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            highlight ? 'bg-[#F2B33D]' : 'bg-[#F6F7FA] group-hover:bg-[#1a1d22]'
          }`}>
            <User className={`w-16 h-16 ${highlight ? 'text-white' : 'text-[#F2B33D]'}`} />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${
          highlight 
            ? 'from-[#F2B33D]/80 to-transparent' 
            : 'from-black/60 to-transparent group-hover:from-black/80'
        }`} />
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="font-bold text-base mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
          {name}
        </h4>
        <p className={`text-sm ${highlight ? 'text-[#0B0D10]/80' : 'text-[#6D7278] group-hover:text-white/70'}`}>
          {role}
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="team"
      className={`relative w-full min-h-screen bg-[#F6F7FA] py-24 md:py-32 ${className}`}
    >
      <div className="px-[9vw]">
        {/* Section Header */}
        <div className="mb-16">
          <span className="microcopy text-[#F2B33D] reveal-item">OUR PEOPLE</span>
          <h2 className="heading-display text-[#0B0D10] mt-4 reveal-item" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            MEET THE TEAM
          </h2>
          <p className="text-[#6D7278] text-lg mt-4 max-w-2xl reveal-item">
            A dedicated group of professionals, volunteers, and advisors working together to create lasting impact.
          </p>
        </div>

        {/* Founder */}
        <div className="mb-16">
          <h3 className="text-[#0B0D10] text-xl font-bold mb-6 flex items-center gap-3 reveal-item" style={{ fontFamily: 'Sora, sans-serif' }}>
            <User className="w-6 h-6 text-[#F2B33D]" />
            Founder
          </h3>
          <div className="max-w-xs">
            <TeamCard 
              name={team.founder.name} 
              role={team.founder.role} 
              image={team.founder.image}
              highlight 
            />
          </div>
        </div>

        {/* Management Team */}
        <div className="mb-16">
          <h3 className="text-[#0B0D10] text-xl font-bold mb-6 flex items-center gap-3 reveal-item" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Users className="w-6 h-6 text-[#F2B33D]" />
            Management Team
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {team.management.map((member, index) => (
              <TeamCard 
                key={index} 
                name={member.name} 
                role={member.role} 
                image={member.image}
              />
            ))}
          </div>
        </div>

        {/* Brain Trust */}
        <div className="mb-16">
          <h3 className="text-[#0B0D10] text-xl font-bold mb-6 flex items-center gap-3 reveal-item" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Users className="w-6 h-6 text-[#F2B33D]" />
            Brain Trust
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {team.brainTrust.map((member, index) => (
              <TeamCard 
                key={index} 
                name={member.name} 
                role={member.role} 
                image={member.image}
              />
            ))}
          </div>
        </div>

        {/* Board */}
        <div className="mb-16">
          <h3 className="text-[#0B0D10] text-xl font-bold mb-6 flex items-center gap-3 reveal-item" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Users className="w-6 h-6 text-[#F2B33D]" />
            Board of Directors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {team.board.map((member, index) => (
              <TeamCard 
                key={index} 
                name={member.name} 
                role={member.role} 
                image={member.image}
              />
            ))}
          </div>
        </div>

        {/* Volunteers */}
        <div>
          <h3 className="text-[#0B0D10] text-xl font-bold mb-6 flex items-center gap-3 reveal-item" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Heart className="w-6 h-6 text-[#F2B33D]" />
            Volunteers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md">
            {team.volunteers.map((member, index) => (
              <TeamCard 
                key={index} 
                name={member.name} 
                role={member.role} 
                image={member.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
