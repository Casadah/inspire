import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Heart, Lightbulb, Users, Zap, HandshakeIcon, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className = '' }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const coreValues = [
    { icon: HandshakeIcon, label: 'Partnership' },
    { icon: Target, label: 'Professionalism' },
    { icon: Lightbulb, label: 'Innovation' },
    { icon: Zap, label: 'Dynamism' },
    { icon: RefreshCw, label: 'Flexibility' },
    { icon: Heart, label: 'Volunteerism' },
  ];

  const thematicAreas = [
    { icon: Users, label: 'Leadership Coaching' },
    { icon: Lightbulb, label: 'Education' },
    { icon: Target, label: 'Entrepreneurship' },
    { icon: HandshakeIcon, label: 'Advocacy' },
    { icon: Heart, label: 'Healthy Living' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        content.querySelectorAll('.reveal-item'),
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

      // Values animation
      gsap.fromTo(
        content.querySelectorAll('.value-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content.querySelector('.values-grid'),
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative w-full min-h-screen bg-[#F6F7FA] py-24 md:py-32 ${className}`}
    >
      <div ref={contentRef} className="px-[9vw]">
        {/* Section Header */}
        <div className="mb-16">
          <span className="microcopy text-[#F2B33D] reveal-item">ABOUT US</span>
          <h2 className="heading-display text-[#0B0D10] mt-4 reveal-item" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            INSPIRE INITIATIVE
          </h2>
          <p className="text-[#6D7278] text-lg mt-4 max-w-2xl reveal-item">
            SPARK Initiative for Social Economic and Sustainable Change
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm reveal-item">
            <div className="w-12 h-12 bg-[#F2B33D]/10 rounded-full flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-[#F2B33D]" />
            </div>
            <h3 className="text-[#0B0D10] text-xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Our Vision
            </h3>
            <p className="text-[#6D7278] leading-relaxed">
              To spur out uniqueness in communities by lighting hope and communicating success 
              through visual exposition, coaching, and mentorship.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm reveal-item">
            <div className="w-12 h-12 bg-[#F2B33D]/10 rounded-full flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-[#F2B33D]" />
            </div>
            <h3 className="text-[#0B0D10] text-xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              Our Mission
            </h3>
            <p className="text-[#6D7278] leading-relaxed">
              To light hope in communities and communicate success through visual exposition, 
              coaching, and mentorship programs that empower individuals to reach their full potential.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-[#0B0D10] text-2xl font-bold mb-8 reveal-item" style={{ fontFamily: 'Sora, sans-serif' }}>
            Core Values
          </h3>
          <div className="values-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="value-item bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <value.icon className="w-8 h-8 text-[#F2B33D] mx-auto mb-3" />
                <span className="text-[#0B0D10] text-sm font-medium">{value.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Thematic Areas */}
        <div>
          <h3 className="text-[#0B0D10] text-2xl font-bold mb-8 reveal-item" style={{ fontFamily: 'Sora, sans-serif' }}>
            Thematic Areas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {thematicAreas.map((area, index) => (
              <div
                key={index}
                className="value-item bg-[#0B0D10] rounded-2xl p-6 text-center hover:bg-[#1a1d22] transition-colors"
              >
                <area.icon className="w-8 h-8 text-[#F2B33D] mx-auto mb-3" />
                <span className="text-white text-sm font-medium">{area.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
