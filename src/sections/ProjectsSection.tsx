import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, GraduationCap, MessageCircle, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  className?: string;
}

const ProjectsSection = ({ className = '' }: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'ongoing' | 'past' | 'future'>('ongoing');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showAllModal, setShowAllModal] = useState(false);

  const projects = {
    ongoing: [
      {
        title: 'MENS HUB',
        description: 'Six-month training for 20 young males through mentoring, coaching, and role modeling to create a new mindset.',
        impact: 'Building confident young men for tomorrow',
        icon: Users,
        image: '/images/menshub.jpg',
        fullDescription: 'MENS HUB addresses the unique challenges faced by young men in our communities. Through mentorship from positive role models, participants develop emotional intelligence, leadership skills, and a sense of responsibility.',
      },
      {
        title: 'SPEAK PROJECT',
        description: 'A therapeutic round table session giving individuals space to share past experiences and struggles, targeted toward healing from traumatic backgrounds.',
        impact: 'Started with 5 persons',
        icon: MessageCircle,
        image: '/images/speak.jpg',
        fullDescription: 'SPEAK PROJECT creates safe spaces for individuals to share their stories and begin their healing journey. Through guided discussions and professional support, participants find strength in community and vulnerability.',
      },
    ],
    past: [
      {
        title: 'AGENDA PROJECT',
        description: 'To empower 450 young women for a vibrant and productive society through school engagements and skills training.',
        schools: ['Baptist Academy', 'Ilimi International College', 'Yafi Academy'],
        location: 'Gombe',
        icon: GraduationCap,
        image: '/images/Agenda.jpg',
        fullDescription: 'The AGENDA PROJECT is our flagship initiative aimed at empowering young women across Gombe State. Through strategic partnerships with leading educational institutions, we provide comprehensive training in leadership, life skills, and vocational education.',
      },
      {
        title: 'ILGM (Inspire Logical Girl Meet)',
        description: 'A one-year training program for young women ages 18-29, including quarterly seminars, online engagement, coaching, and counseling.',
        impact: 'Cohort one admitted 30 young women',
        phases: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
        icon: Users,
        image: '/images/lgm.jpg',
        fullDescription: 'ILGM is a transformative one-year journey designed to guide young women toward discovering their purpose and achieving their dreams. The program combines in-person seminars, virtual learning sessions, one-on-one coaching, and peer support networks.',
      },
      {
        title: 'Transition Project',
        description: 'Targeted at young teenagers, equipping them with knowledge on self-discovery and social etiquette for successful transition into adulthood.',
        locations: ['ECWA Gospel Gombe', 'ECWA Goodnews Federal Low Cost'],
        icon: TrendingUp,
        image: '/images/transition.jpg',
        fullDescription: 'The Transition Project helped hundreds of teenagers navigate the challenging journey from adolescence to adulthood. Participants learned essential life skills including communication, decision-making, and personal responsibility.',
      },
      {
        title: 'International Day for the Girl Child 2022',
        description: 'Engagement celebrating and empowering young girls in the community.',
        location: 'Shongo Idirisa',
        icon: Calendar,
        image: '/images/school.jpg',
        fullDescription: 'Our International Day for the Girl Child celebration brought together girls from across the community for a day of inspiration, education, and empowerment.',
      },
      {
        title: 'Peace Dialogue at Billiri',
        description: 'Community dialogue fostering peaceful coexistence and understanding.',
        location: 'Billiri',
        icon: MessageCircle,
        image: '/images/peace1.jpg',
        fullDescription: 'The Peace Dialogue at Billiri brought together community leaders and residents to discuss challenges and build bridges toward peaceful coexistence.',
      },
      {
        title: 'Gelengu Youth Engagement',
        description: 'Youth engagement on taking responsibility for community development.',
        location: 'Gelengu',
        icon: Users,
        image: '/images/gelengu.jpg',
        fullDescription: 'This engagement empowered youth in Gelengu to take active roles in shaping their community\'s future through responsibility and leadership.',
      },
      {
        title: 'Gombe Peace Dialogue',
        description: 'Partnership with USGS on peaceful co-existence of all religions in Gombe.',
        location: 'Gombe',
        icon: MessageCircle,
        image: '/images/peace.jpg',
        fullDescription: 'In partnership with USGS, this dialogue brought together religious leaders and community members to promote understanding and peaceful coexistence across faiths.',
      },
    ],
    future: [
      {
        title: 'LADU Project',
        description: 'Upcoming initiative focused on leadership and development in underserved communities.',
        status: 'Coming Soon',
        icon: TrendingUp,
        image: '/images/ladu.jpg',
        fullDescription: 'The LADU Project will expand our reach to underserved communities, bringing leadership training and development opportunities to those who need them most.',
      },
      {
        title: 'Inhouse Trainings Expansion',
        description: 'Expanding capacity building programs for teams and partner organizations.',
        status: 'In Planning',
        icon: GraduationCap,
        image: '/images/hero_bg.jpg',
        fullDescription: 'We are developing comprehensive training programs to build the capacity of our team and partner organizations, ensuring sustainable impact across all our initiatives.',
      },
      {
        title: 'Pathfinders Project',
        description: 'A rebranded Transition Project focused on school students’ mental health, improved academic performance, and success in life.',
        status: 'In Planning',
        icon: GraduationCap,
        image: '/images/transition.jpg',
        fullDescription: 'The Pathfinders Project is a rebranded version of the Transition Project, specially designed for school students. It focuses on strengthening mental health, improving academic performance, building self-awareness, and equipping students for long-term success in life.',
      },
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

  const allProjects = [...projects.ongoing, ...projects.past, ...projects.future];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full min-h-screen bg-[#F6F7FA] py-24 md:py-32 ${className}`}
    >
      <div className="px-[9vw]">
        <div className="mb-12">
          <span className="microcopy text-[#F2B33D] reveal-item">OUR WORK</span>
          <h2 className="heading-display text-[#0B0D10] mt-4 reveal-item" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
            OUR PROGRAMS
          </h2>
          <p className="text-[#6D7278] text-lg mt-4 max-w-2xl reveal-item">
            We run year-round engagements—workshops, coaching circles, and community dialogues—designed for real impact.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 reveal-item">
          {(['ongoing', 'past', 'future'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#F2B33D] text-[#0B0D10]'
                  : 'bg-white text-[#6D7278] hover:bg-[#0B0D10] hover:text-white'
              }`}
            >
              {tab} Projects
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects[activeTab].map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(project)}
              className="project-card bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[#0B0D10] font-bold text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {project.title}
                  </h3>
                  {'status' in project && (
                    <Badge className="bg-[#F2B33D]/10 text-[#F2B33D] text-xs">
                      {project.status}
                    </Badge>
                  )}
                </div>

                <p className="text-[#6D7278] text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {'schools' in project && project.schools && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.schools.map((school, i) => (
                      <span key={i} className="text-xs text-[#6D7278] bg-[#F6F7FA] px-3 py-1 rounded-full">
                        {school}
                      </span>
                    ))}
                  </div>
                )}

                {'locations' in project && project.locations && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.locations.map((loc, i) => (
                      <span key={i} className="text-xs text-[#6D7278] bg-[#F6F7FA] px-3 py-1 rounded-full">
                        {loc}
                      </span>
                    ))}
                  </div>
                )}

                {'location' in project && project.location && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-[#6D7278]">📍 {project.location}</span>
                  </div>
                )}

                {'impact' in project && project.impact && (
                  <div className="flex items-center gap-2 text-[#F2B33D] text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {project.impact}
                  </div>
                )}

                {'phases' in project && project.phases && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.phases.map((phase, i) => (
                      <span key={i} className="text-xs text-[#F2B33D] border border-[#F2B33D]/30 px-3 py-1 rounded-full">
                        {phase}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center reveal-item">
          <Button
            onClick={() => setShowAllModal(true)}
            className="bg-[#0B0D10] hover:bg-[#1a1d22] text-white rounded-full px-8 py-4 text-sm font-semibold inline-flex items-center gap-2 group"
          >
            View All Programs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#0B0D10]" style={{ fontFamily: 'Sora, sans-serif' }}>
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="mt-4">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <DialogDescription className="text-[#6D7278] text-base leading-relaxed">
                {selectedProject.fullDescription || selectedProject.description}
              </DialogDescription>
              {'impact' in selectedProject && selectedProject.impact && (
                <div className="mt-4 flex items-center gap-2 text-[#F2B33D] text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {selectedProject.impact}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAllModal} onOpenChange={setShowAllModal}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#0B0D10] text-2xl" style={{ fontFamily: 'Sora, sans-serif' }}>
              All Programs
            </DialogTitle>
            <DialogDescription>
              Explore all our ongoing, past, and future initiatives
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            {allProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-[#F6F7FA] rounded-xl hover:bg-[#0B0D10] hover:text-white group transition-colors cursor-pointer"
                onClick={() => {
                  setShowAllModal(false);
                  setSelectedProject(project);
                }}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-[#0B0D10] group-hover:text-white mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {project.title}
                  </h4>
                  <p className="text-sm text-[#6D7278] group-hover:text-white/70 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#6D7278] group-hover:text-[#F2B33D] flex-shrink-0" />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
