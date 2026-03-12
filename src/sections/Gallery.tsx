import { useMemo, useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  GraduationCap,
  Calendar,
} from 'lucide-react';

interface GallerySectionProps {
  className?: string;
}

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProject {
  title: string;
  description: string;
  category: 'ongoing' | 'past';
  images: GalleryImage[];
}

const GallerySection = ({ className = '' }: GallerySectionProps) => {
  const projects: GalleryProject[] = [
    {
      title: 'AGENDA PROJECT',
      description:
        'To empower 450 young women for a vibrant and productive society through school engagements and skills training.',
      category: 'ongoing',
      images: [
        { src: '/images/gallery/agenda-1.jpg', alt: 'AGENDA PROJECT image 1' },
        { src: '/images/gallery/agenda-2.jpg', alt: 'AGENDA PROJECT image 2' },
        { src: '/images/gallery/agenda-3.jpg', alt: 'AGENDA PROJECT image 3' },
      ],
    },
    {
      title: 'ILGM (Inspire Logical Girl Meet)',
      description:
        'A one-year training program for young women ages 18-29, including quarterly seminars, online engagement, coaching, and counseling.',
      category: 'ongoing',
      images: [
        { src: '/images/gallery/ilgm-1.jpg', alt: 'ILGM image 1' },
        { src: '/images/gallery/ilgm-2.jpg', alt: 'ILGM image 2' },
        { src: '/images/gallery/ilgm-3.jpg', alt: 'ILGM image 3' },
      ],
    },
    {
      title: 'MENS HUB',
      description:
        'Six-month training for 20 young males through mentoring, coaching, and role modeling to create a new mindset.',
      category: 'ongoing',
      images: [
        { src: '/images/gallery/menshub-1.jpg', alt: 'MENS HUB image 1' },
        { src: '/images/gallery/menshub-2.jpg', alt: 'MENS HUB image 2' },
        { src: '/images/gallery/menshub-3.jpg', alt: 'MENS HUB image 3' },
      ],
    },
    {
      title: 'Transition Project',
      description:
        'Targeted at young teenagers, equipping them with knowledge on self-discovery and social etiquette for successful transition into adulthood.',
      category: 'past',
      images: [
        { src: '/images/gallery/transition-1.jpg', alt: 'Transition Project image 1' },
        { src: '/images/gallery/transition-2.jpg', alt: 'Transition Project image 2' },
        { src: '/images/gallery/transition-3.jpg', alt: 'Transition Project image 3' },
      ],
    },
    {
      title: 'SPEAK PROJECT',
      description:
        'A therapeutic round table session giving individuals space to share past experiences and struggles, targeted toward healing from traumatic backgrounds.',
      category: 'past',
      images: [
        { src: '/images/gallery/speak-1.jpg', alt: 'SPEAK PROJECT image 1' },
        { src: '/images/gallery/speak-2.jpg', alt: 'SPEAK PROJECT image 2' },
        { src: '/images/gallery/speak-3.jpg', alt: 'SPEAK PROJECT image 3' },
      ],
    },
    {
      title: 'International Day for the Girl Child 2022',
      description:
        'Engagement celebrating and empowering young girls in the community.',
      category: 'past',
      images: [
        { src: '/images/gallery/girlchild-1.jpg', alt: 'International Day for the Girl Child image 1' },
        { src: '/images/gallery/girlchild-2.jpg', alt: 'International Day for the Girl Child image 2' },
        { src: '/images/gallery/girlchild-3.jpg', alt: 'International Day for the Girl Child image 3' },
      ],
    },
    {
      title: 'Peace Dialogue at Billiri',
      description:
        'Community dialogue fostering peaceful coexistence and understanding.',
      category: 'past',
      images: [
        { src: '/images/gallery/billiri-1.jpg', alt: 'Peace Dialogue at Billiri image 1' },
        { src: '/images/gallery/billiri-2.jpg', alt: 'Peace Dialogue at Billiri image 2' },
        { src: '/images/gallery/billiri-3.jpg', alt: 'Peace Dialogue at Billiri image 3' },
      ],
    },
    {
      title: 'Gelengu Youth Engagement',
      description:
        'Youth engagement on taking responsibility for community development.',
      category: 'past',
      images: [
        { src: '/images/gallery/gelengu-1.jpg', alt: 'Gelengu Youth Engagement image 1' },
        { src: '/images/gallery/gelengu-2.jpg', alt: 'Gelengu Youth Engagement image 2' },
        { src: '/images/gallery/gelengu-3.jpg', alt: 'Gelengu Youth Engagement image 3' },
      ],
    },
    {
      title: 'Gombe Peace Dialogue',
      description:
        'Partnership with USGS on peaceful co-existence of all religions in Gombe.',
      category: 'past',
      images: [
        { src: '/images/gallery/gombe-peace-1.jpg', alt: 'Gombe Peace Dialogue image 1' },
        { src: '/images/gallery/gombe-peace-2.jpg', alt: 'Gombe Peace Dialogue image 2' },
        { src: '/images/gallery/gombe-peace-3.jpg', alt: 'Gombe Peace Dialogue image 3' },
      ],
    },
  ];

  const categoryMeta = {
    ongoing: {
      label: 'Ongoing Projects',
      icon: GraduationCap,
    },
    past: {
      label: 'Past Projects',
      icon: Calendar,
    },
  };

  const [activeCategory, setActiveCategory] = useState<'ongoing' | 'past'>('ongoing');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  const activeProject = filteredProjects[activeProjectIndex] || filteredProjects[0];

  useEffect(() => {
    setActiveProjectIndex(0);
    setLightboxIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || !activeProject) return;

      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + activeProject.images.length) % activeProject.images.length
        );
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % activeProject.images.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeProject]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrevious = () => {
    if (lightboxIndex === null || !activeProject) return;
    setLightboxIndex(
      (lightboxIndex - 1 + activeProject.images.length) % activeProject.images.length
    );
  };

  const showNext = () => {
    if (lightboxIndex === null || !activeProject) return;
    setLightboxIndex((lightboxIndex + 1) % activeProject.images.length);
  };

  const ActiveCategoryIcon = categoryMeta[activeCategory].icon;

  return (
    <>
      <section
        id="gallery"
        className={`relative w-full bg-[#F6F7FA] py-24 md:py-32 ${className}`}
      >
        <div className="px-[9vw]">
          <div className="mb-12">
            <span className="microcopy text-[#F2B33D]">OUR GALLERY</span>
            <h2
              className="heading-display text-[#0B0D10] mt-4"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
            >
              PROJECT GALLERY
            </h2>
            <p className="text-[#6D7278] text-lg mt-4 max-w-2xl">
              Explore images from our programs, engagements, dialogues, and community impact activities.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {(['ongoing', 'past'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-[#F2B33D] text-[#0B0D10]'
                    : 'bg-white text-[#6D7278] hover:bg-[#0B0D10] hover:text-white'
                }`}
              >
                {categoryMeta[category].label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {filteredProjects.map((project, index) => (
              <button
                key={project.title}
                onClick={() => {
                  setActiveProjectIndex(index);
                  setLightboxIndex(null);
                }}
                className={`rounded-full px-5 py-3 text-sm font-medium transition-all ${
                  activeProjectIndex === index
                    ? 'bg-[#0B0D10] text-white'
                    : 'bg-white text-[#0B0D10] hover:bg-[#F2B33D] hover:text-[#0B0D10]'
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>

          {activeProject && (
            <>
              <div className="mb-8 rounded-3xl bg-white p-6 md:p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[#F2B33D]/15 p-3">
                    <ActiveCategoryIcon className="h-6 w-6 text-[#F2B33D]" />
                  </div>
                  <div>
                    <h3
                      className="text-[#0B0D10] text-2xl font-bold"
                      style={{ fontFamily: 'Sora, sans-serif' }}
                    >
                      {activeProject.title}
                    </h3>
                    <p className="text-[#6D7278] mt-2 max-w-3xl">
                      {activeProject.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeProject.images.map((image, index) => (
                  <button
                    key={image.src}
                    onClick={() => openLightbox(index)}
                    className="group overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all text-left"
                  >
                    <div className="relative h-[280px] w-full overflow-hidden bg-[#EDF0F3]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="p-4">
                      <p className="text-[#0B0D10] font-semibold text-sm">
                        {activeProject.title}
                      </p>
                      <p className="text-[#6D7278] text-sm mt-1">
                        Click to enlarge
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {!activeProject && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <Images className="w-10 h-10 text-[#F2B33D] mx-auto mb-4" />
              <p className="text-[#6D7278]">No gallery images added yet for this category.</p>
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && activeProject && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={showPrevious}
            className="absolute left-4 md:left-8 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <div className="w-full max-w-6xl">
            <div className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="bg-black flex items-center justify-center max-h-[80vh] min-h-[300px]">
                <img
                  src={activeProject.images[lightboxIndex].src}
                  alt={activeProject.images[lightboxIndex].alt}
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="px-6 py-4 text-white">
                <p className="font-semibold">{activeProject.title}</p>
                <p className="text-white/70 text-sm mt-1">
                  {activeProject.images[lightboxIndex].alt}
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Image {lightboxIndex + 1} of {activeProject.images.length}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={showNext}
            className="absolute right-4 md:right-8 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </>
  );
};

export default GallerySection;
