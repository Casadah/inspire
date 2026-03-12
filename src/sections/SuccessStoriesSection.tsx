import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, TrendingUp, Users, MapPin, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SuccessStoriesSectionProps {
  className?: string;
}

const SuccessStoriesSection = ({ className = '' }: SuccessStoriesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const metrics = [
    { value: '1,200+', label: 'Young people engaged', icon: Users },
    { value: '45', label: 'Workshops delivered', icon: TrendingUp },
    { value: '18', label: 'Communities reached', icon: MapPin },
    { value: '92%', label: 'Reported improved confidence', icon: Award },
  ];

  const testimonials = [
    {
      quote: "The coaching circle changed how I see leadership—it's not about titles, it's about service.",
      author: 'Amina',
      role: 'Program Participant',
      program: 'ILGM Cohort 1',
    },
    {
      quote: 'I learned to believe in myself and my abilities. The mentorship I received has been life-changing.',
      author: 'Fatima',
      role: 'AGENDA Project Participant',
      program: 'Baptist Academy',
    },
    {
      quote: 'The Transition Project helped me understand who I am and prepared me for adulthood with confidence.',
      author: 'John',
      role: 'Youth Participant',
      program: 'Transition Project',
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
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Counter animation for metrics
      const metricValues = section.querySelectorAll('.metric-value');
      metricValues.forEach((el) => {
        const target = el.getAttribute('data-value');
        if (target) {
          gsap.fromTo(
            el,
            { textContent: '0' },
            {
              textContent: target,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stories"
      className={`relative w-full min-h-screen bg-[#F6F7FA] py-24 md:py-32 ${className}`}
    >
      <div className="px-[9vw]">
        {/* Section Header */}
        <div className="mb-16">
          <span className="microcopy text-[#F2B33D] reveal-item">IMPACT</span>
          <h2 className="heading-display text-[#0B0D10] mt-4 reveal-item" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            IMPACT THAT SCALES
          </h2>
          <p className="text-[#6D7278] text-lg mt-4 max-w-2xl reveal-item">
            We measure success by the confidence, connection, and leadership our participants carry into their communities.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="reveal-item bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-[#F2B33D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-7 h-7 text-[#F2B33D]" />
              </div>
              <div
                className="metric-value text-4xl md:text-5xl font-bold text-[#0B0D10] mb-2"
                style={{ fontFamily: 'Sora, sans-serif' }}
                data-value={metric.value.replace(/[^0-9]/g, '')}
              >
                {metric.value}
              </div>
              <p className="text-[#6D7278] text-sm">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-[#0B0D10] text-2xl font-bold mb-8 reveal-item" style={{ fontFamily: 'Sora, sans-serif' }}>
            Success Stories
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="reveal-item bg-[#0B0D10] rounded-3xl p-8 relative"
              >
                <Quote className="w-10 h-10 text-[#F2B33D] mb-6" />
                <p className="text-white text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                  <span className="inline-block mt-2 text-xs text-[#F2B33D] bg-[#F2B33D]/10 px-3 py-1 rounded-full">
                    {testimonial.program}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
