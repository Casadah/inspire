import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        tl.fromTo(
          headlineLines,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          0.3
        );
      }

      tl.fromTo(
        subheadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.8
      );

      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
          },
        },
      }).fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        { y: '-15vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToPrograms = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToJoin = () => {
    const element = document.querySelector('#join');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_bg.jpg"
          alt="Community gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center">
        <div className="px-[9vw] w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <div ref={headlineRef} className="mb-6">
                <h1
                  className="heading-display text-white leading-tight"
                  style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}
                >
                  <span className="headline-line block text-[#F25A07]">
                    SPARK INITIATIVE
                  </span>
                  <span className="headline-line block text-[#22F304]">
                    FOR SOCIAL ECONOMIC
                  </span>
                  <span className="headline-line block text-[#22F304]">
                    AND SUSTAINABLE CHANGE
                  </span>
                  <span className="headline-line block text-white/85 text-[0.42em] mt-4 leading-snug">
                    (INSPIRE DEVELOPMENT INITIATIVE)
                  </span>
                </h1>
              </div>

              <div ref={subheadlineRef} className="max-w-2xl mb-10">
                <p className="text-white/85 text-lg md:text-xl leading-relaxed">
                  Advancing lives through mentorship, education, community development,
                  and sustainable social impact for people and communities.
                </p>
              </div>

              <div ref={ctaRef}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    onClick={scrollToPrograms}
                    className="bg-[#22F304] hover:bg-[#e0a336] text-[#0B0D10] rounded-full px-8 py-4 text-base font-semibold flex items-center gap-2 group"
                  >
                    Explore Projects
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <button
                    onClick={scrollToJoin}
                    className="text-white text-base font-medium flex items-center gap-1 hover:text-[#F2B33D] transition-colors px-4 py-4"
                  >
                    Partner with us
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Logo */}
            <div className="hidden lg:flex justify-center lg:justify-end">
              <div className="reveal-item bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/15 shadow-2xl">
                <img
                  src="/images/logo.jpg"
                  alt="INSPIRE Development Initiative Logo"
                  className="w-[280px] xl:w-[340px] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
