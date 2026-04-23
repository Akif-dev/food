'use client';

import { useState, useEffect, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

interface HeroSliderProps {
  isDark: boolean;
}

const slides = [
  {
    id: 1,
    title: 'Kebabi Platter',
    titleHighlight: 'Juicy & Spicy',
    subtitle:
      'Juicy seekh kebabs, perfectly spiced and grilled to perfection, served on a bed of aromatic rice.',
    cta: 'Order Now',
    ctaSecondary: 'Explore Menu',
    image: 'https://ik.imagekit.io/akif/akif-icenspice-img-big.jpg',
    alt: 'Beautifully plated gourmet meal with grilled steak and roasted vegetables',
    badge: "🔥 Today's Special",
    stat1: { value: '4.9★', label: 'Rating' },
    stat2: { value: '25min', label: 'Delivery' },
    stat3: { value: '2.4k+', label: 'Orders' },
    accentColor: '#F59E0B',
    gradientFrom: 'rgba(245,158,11,0.15)',
  },
  {
    id: 2,
    title: 'Arabic Wraps,',
    titleHighlight: 'Infinite Flavor',
    subtitle:
      'Our delicious wraps are filled with fresh chicken, juicy beef, crisp veggies, and flavorful sauces with a perfect touch of spice.',
    cta: 'Taste the Difference',
    ctaSecondary: 'View Specials',
    image: 'https://ik.imagekit.io/akif/akif-icenspice-img-big2.jpg',
    alt: 'Fresh colorful pizza with vibrant toppings on wooden board',
    badge: '🌿 Hot & Fresh',
    stat1: { value: '50+', label: 'Dishes' },
    stat2: { value: '100%', label: 'Fresh' },
    stat3: { value: '10yr', label: 'Legacy' },
    accentColor: '#10B981',
    gradientFrom: 'rgba(16,185,129,0.15)',
  },
  {
    id: 3,
    title: 'Accident Burger',
    titleHighlight: 'Fully loaded',
    subtitle:
      'A flavor-packed burger with crispy chicken and juicy beef, loaded with fresh ingredients and rich taste in every bite.',
    cta: 'See Burgers',
    ctaSecondary: 'Full Menu',
    image: 'https://ik.imagekit.io/akif/akif-icenspice-img-big1.jpg',
    alt: 'Decadent chocolate dessert with gold leaf decoration and berry garnish',
    badge: "✨ Chef's Pick",
    stat1: { value: '30+', label: 'Desserts' },
    stat2: { value: 'Daily', label: 'Baked' },
    stat3: { value: '5★', label: 'Reviews' },
    accentColor: '#EC4899',
    gradientFrom: 'rgba(236,72,153,0.15)',
  },
];

interface HeroSliderProps {
  isDark: boolean;
}

export default function HeroSlider({ isDark }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 1200);
    },
    [isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Slides */}
      {slides.map((s, i) => (
        <div key={s.id} className={`hero-slide ${i === current ? 'active' : ''}`}>
          <AppImage src={s.image} alt={s.alt} fill className="object-cover" priority={i === 0} />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)`,
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${s.gradientFrom} 0%, transparent 60%)`,
            }}
          />
        </div>
      ))}

      {/* Lightning Effects */}
      <div className="lightning-container">
        <div className="lightning-bolt" />
        <div className="lightning-bolt" />
        <div className="lightning-bolt" />
        <div className="lightning-glow" />
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${15 + i * 14}%`,
            bottom: '20%',
            animationDelay: `${i * 0.5}s`,
            background: slide.accentColor,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              key={`badge-${current}`}
              className="animate-slide-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-sm font-semibold text-white border"
              style={{ borderColor: `${slide.accentColor}40` }}
            >
              <span>{slide.badge}</span>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: slide.accentColor }}
              />
            </div>

            {/* Headline */}
            <div key={`title-${current}`} className="animate-slide-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-[0.9] tracking-tight text-white">
                {slide.title}
                <br />
                <span
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${slide.accentColor}, white)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {slide.titleHighlight}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              key={`sub-${current}`}
              className="animate-slide-up text-lg text-white/70 max-w-lg leading-relaxed font-medium"
              style={{ animationDelay: '0.2s' }}
            >
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div
              key={`cta-${current}`}
              className="animate-slide-up flex flex-wrap gap-4"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                href="#menu-section"
                className="group relative overflow-hidden px-8 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${slide.accentColor}, #F97316)`,
                  boxShadow: `0 8px 30px ${slide.accentColor}40`,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {slide.cta}
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="#menu-section"
                className="px-8 py-4 rounded-2xl text-base font-bold text-white glass-dark hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {slide.ctaSecondary}
              </Link>
            </div>

            {/* Stats Row */}
            <div
              key={`stats-${current}`}
              className="animate-slide-up flex gap-6"
              style={{ animationDelay: '0.4s' }}
            >
              {[slide.stat1, slide.stat2, slide.stat3].map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-2xl font-display font-black"
                    style={{ color: slide.accentColor }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating Glass Cards */}
          <div className="hidden lg:block relative h-[520px]">
            {/* Main Image Card */}
            <div
              key={`img-${current}`}
              className="animate-scale-in absolute right-0 top-8 w-80 h-80 rounded-3xl overflow-hidden glass-card-dark float-slow"
              style={{ boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)` }}
            >
              <AppImage
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover food-card-img"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-dark rounded-2xl px-4 py-3">
                  <div className="text-white font-bold text-sm">{slide.titleHighlight}</div>
                  <div className="text-white/60 text-xs mt-1">Chef&apos;s Recommendation</div>
                </div>
              </div>
            </div>

            {/* Floating Stat Card 1 */}
            <div
              className="absolute top-4 left-0 glass-card-dark rounded-2xl px-5 py-4 float-medium"
              style={{ animationDelay: '1s' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${slide.accentColor}20` }}
                >
                  ⚡
                </div>
                <div>
                  <div className="text-white font-black font-display text-lg">
                    {slide.stat2.value}
                  </div>
                  <div className="text-white/50 text-xs">Avg {slide.stat2.label}</div>
                </div>
              </div>
            </div>

            {/* Floating Order Card */}
            <div
              className="absolute bottom-12 left-4 glass-card-dark rounded-2xl px-5 py-4 float-fast"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/70 text-xs font-semibold">Live Orders</span>
              </div>
              <div
                className="text-2xl font-display font-black"
                style={{ color: slide.accentColor }}
              >
                {slide.stat3.value}
              </div>
              <div className="text-white/50 text-xs">{slide.stat3.label} This Month</div>
            </div>

            {/* Rating Card */}
            <div
              className="absolute bottom-32 right-4 glass-card-dark rounded-2xl px-5 py-4 float-slow"
              style={{ animationDelay: '2s' }}
            >
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 star-filled"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-white font-bold text-sm">{slide.stat1.value}</div>
              <div className="text-white/50 text-xs">Customer {slide.stat1.label}</div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-4 mt-12">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`hero-dot ${i === current ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => goTo((current - 1 + slides.length) % slides.length)}
              className="w-10 h-10 rounded-xl glass-dark text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => goTo((current + 1) % slides.length)}
              className="w-10 h-10 rounded-xl bg-amber-500 text-white hover:bg-amber-400 transition-all flex items-center justify-center shadow-lg"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="ml-auto text-white/30 text-sm font-mono">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
        <svg viewBox="0 0 1440 96" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0 96L60 85.3C120 74.7 240 53.3 360 48C480 42.7 600 53.3 720 58.7C840 64 960 64 1080 58.7C1200 53.3 1320 42.7 1380 37.3L1440 32V96H1380C1320 96 1200 96 1080 96C960 96 840 96 720 96C600 96 480 96 360 96C240 96 120 96 60 96H0Z"
            fill={isDark ? '#0A0A0F' : '#FAF8F3'}
          />
        </svg>
      </div>
    </section>
  );
}
