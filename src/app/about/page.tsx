'use client';

import { useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';

export default function AboutPage() {
  const { isDark, toggleTheme } = useTheme();
  const reviewsRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: 'Wasiq Jawed',
      rating: 5,
      text: 'Have visited this place multiple times and the food never disappoints. Platter is always consistently good. The Turkish kebab is top notch.',
      date: '2 months ago',
    },
    {
      name: 'Khalid Munir',
      rating: 5,
      text: 'One of my favorite Zinger Burger!! Its been more then 15 years but their standard is same!!',
      date: '2 years ago',
    },
    {
      name: 'Kabeerovic',
      rating: 4,
      text: 'Their broast is very good, crispy and well cooked, little bit spicy as it should be. Zinger burger is also good.',
      date: '2 years ago',
    },
    {
      name: 'Talhakaar',
      rating: 5,
      text: 'ordered Zinger and an Arabic Wrap from them, have ordered multiple times before. Food is fresh, delivery is quick.',
      date: '7 months ago',
    },
    {
      name: 'Ali Baloch',
      rating: 5,
      text: 'Make sure to dine at their in-house restaurant. The chef is talented, and the flavors were absolutely authentic.',
      date: '1 month ago',
    },
    {
      name: 'Aqsaa Anjum',
      rating: 5,
      text: 'I had a Royal Platter...The food was amazing..There was a combination of different kebabs and all the kebabs were tender and juicy.',
      date: '10 months ago',
    },
    {
      name: 'Usman Siddiqui',
      rating: 5,
      text: 'Ive been eating here since they first opened (around 15 years ago or so). Their taste just keeps better and better everytime.',
      date: '1 year ago',
    },
    {
      name: 'Shahbaz Nemat',
      rating: 4,
      text: 'Awesome food especially their wrap is out of the world. Platters are excellent too.',
      date: '1 year ago',
    },
  ];

  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{ background: bg, minHeight: '100vh' }} className="theme-transition">
      <Header cartCount={0} onCartClick={() => {}} isDark={isDark} onThemeToggle={toggleTheme} />

      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section
          className="relative py-16 overflow-hidden"
          style={{ background: isDark ? '#111118' : '#F3F0E8' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.07) 0%, transparent 60%)',
            }}
          />
          <div className="lightning-container opacity-30">
            <div className="lightning-bolt" />
            <div className="lightning-bolt" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-1 rounded-full bg-amber-500" />
              <span
                className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-gray-400'}`}
              >
                About Us
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1
                  className={`text-4xl lg:text-5xl font-display font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  The <span className="gradient-text-amber italic">Ice n Spice</span> Story
                </h1>
                <p
                  className={`mt-3 text-base max-w-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}
                >
                  Ice N Spice is a main-stream creative cuisine restaurant with the aim of providing
                  you with the best quality food and services. We are located at North Nazimabad. We
                  specialize in Chinese, fast food and middle eastern platters and wraps.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold ${isDark ? 'bg-white/6 text-white/70' : 'bg-black/5 text-gray-600'}`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Kitchen Open
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold ${isDark ? 'bg-white/6 text-white/70' : 'bg-black/5 text-gray-600'}`}
                >
                  25min Delivery
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className={`text-3xl lg:text-4xl font-display font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Our <span className="gradient-text-amber italic">Journey</span>
                </h2>
                <p
                  className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                >
                  Ice n Spice started with a simple vision: to serve authentic, delicious food at
                  prices everyone can afford. Located in the heart of North Nazimabad, Karachi,
                  we&apos;ve been serving our community since 2006.
                </p>
                <p
                  className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                >
                  What started as a small fast food joint has grown into a beloved destination for
                  food lovers across Karachi. Our secret? Consistent quality, generous portions, and
                  recipes perfected over 15+ years.
                </p>
                <p
                  className={`text-lg leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}
                >
                  Whether you&apos;re craving our world-famous Zinger burgers, authentic Turkish
                  kebabs, or flavorful Chinese dishes, every bite at Ice n Spice is a testament to
                  our commitment to excellence.
                </p>
              </div>
              <div
                className={`rounded-3xl overflow-hidden group ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                style={{ border: `1px solid ${borderColor}` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  {/* Placeholder Image */}
                  <img
                    src="https://ik.imagekit.io/akif/akif-icenspice-img-big4.jpg"
                    alt="Ice n Spice Restaurant"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay for aesthetic look */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0A0A0F]/0' : 'from-white/0'} to-transparent`}
                  />

                  {/* Tag on image */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      Nazimabad Branch
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Features */}
        <section className="py-20" style={{ background: isDark ? '#111118' : '#F3F0E8' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl lg:text-4xl font-display font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                What We <span className="gradient-text-amber italic">Offer</span>
              </h2>
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                A wide variety of cuisines to satisfy every craving
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🌯',
                  title: 'Arabic Wraps',
                  desc: 'Original Turkish, Persian Twist, Shawarma Wraps',
                },
                {
                  icon: '🔥',
                  title: 'BBQ',
                  desc: 'Adana Kebab, Chicken Khubidah, Thai Namkeen Boti',
                },
                {
                  icon: '🥘',
                  title: 'Platters',
                  desc: 'Classic for One, Royal Platter, Mix Grill',
                },
                { icon: '🍟', title: 'Starters', desc: 'Chicken Nuggets, French Fries, Soups' },
                {
                  icon: '🥪',
                  title: 'Sandwiches',
                  desc: 'BBQ Sandwich, Italian Sandwich, Club Sandwich',
                },
                { icon: '🍜', title: 'Chinese', desc: 'Chicken Chow Mein, Fried Rice, Manchurian' },
                {
                  icon: '🍔',
                  title: 'Zinger & Gourmet',
                  desc: 'Zinger Max, Zinger Fiery, Mighty King',
                },
                { icon: '🌯', title: 'Hot N Roll', desc: 'Adana Twist, Mayo Twist' },
                {
                  icon: '🍗',
                  title: 'Burgers & Broast',
                  desc: 'Qtr Broast, Chicken Burger, Beef Burger',
                },
                { icon: '🥤', title: 'Combos', desc: 'Combo meals with drinks and sides' },
                { icon: '🥤', title: 'Sidelines', desc: 'Cold drinks, coleslaw, extra cheese' },
              ].map((service, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                  style={{ border: `1px solid ${borderColor}` }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3
                    className={`font-display font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {service.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl lg:text-4xl font-display font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                See Us in <span className="gradient-text-amber italic">Action</span>
              </h2>
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Take a virtual tour of our kitchen and dining experience
              </p>
            </div>

            <div
              className={`rounded-3xl overflow-hidden ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
              style={{ border: `1px solid ${borderColor}` }}
            >
              <div className="aspect-video relative">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=4482104748688657&show_text=false&width=1280&height=720"
                  width="1280"
                  height="720"
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Slider */}
        <section className="py-20" style={{ background: isDark ? '#111118' : '#F3F0E8' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl lg:text-4xl font-display font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                What Our <span className="gradient-text-amber italic">Guests Say</span>
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-amber-500 star-filled"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  4.2
                </span>
                <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  1,965 Google Reviews
                </span>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => scrollReviews('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/5 text-gray-600 hover:bg-black/10'
                }`}
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div
                ref={reviewsRef}
                className="flex gap-6 overflow-x-auto scroll-hide pb-4"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-96 p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                    style={{
                      border: `1px solid ${borderColor}`,
                      scrollSnapAlign: 'start',
                    }}
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-amber-500 star-filled"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p
                      className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}
                    >
                      &quot;{review.text}&quot;
                    </p>
                    <div>
                      <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {review.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                        {review.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollReviews('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/5 text-gray-600 hover:bg-black/10'
                }`}
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl lg:text-4xl font-display font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Get in <span className="gradient-text-amber italic">Touch</span>
              </h2>
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Visit us or reach out for reservations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div
                className={`p-8 rounded-2xl text-center ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                style={{ border: `1px solid ${borderColor}` }}
              >
                <div className="text-4xl mb-4">📍</div>
                <h3
                  className={`font-display font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Location
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  # 2, North Plaza, Block-A North Nazimabad
                  <br />
                  opp Jinnah University, Karachi, Pakistan
                </p>
              </div>

              <div
                className={`p-8 rounded-2xl text-center ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                style={{ border: `1px solid ${borderColor}` }}
              >
                <div className="text-4xl mb-4">📞</div>
                <h3
                  className={`font-display font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Phone
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  0321 6638470
                  <br />
                  +92 321 6638470
                </p>
              </div>

              <div
                className={`p-8 rounded-2xl text-center ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                style={{ border: `1px solid ${borderColor}` }}
              >
                <div className="text-4xl mb-4">🕐</div>
                <h3
                  className={`font-display font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Hours
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Opens at 11:30 AM
                  <br />
                  Open daily
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className={`text-sm mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                Service Options: Outdoor Seating • Vegetarian Options • Wi-Fi Available
              </p>
              <p className={`text-sm mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                Price per person: Rs 1,000
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://facebook.com/IceNSpice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isDark
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-black/5 text-gray-600 hover:bg-black/10'
                  }`}
                >
                  Facebook
                </a>
                <a
                  href="https://wa.me/923216638470"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn px-6 py-3 rounded-xl font-semibold text-white text-sm flex items-center gap-2"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
