'use client';

import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '../menu/components/CartSidebar';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';

export default function AboutPage() {
  const { isDark, toggleTheme } = useTheme();
  const { cartCount, cart, updateQty, removeItem } = useCart();
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [cartOpen, setCartOpen] = useState(false);

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
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

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
              <div className="flex gap-3 justify-center">
                <a
                  href="https://facebook.com/IceNSpice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-gray-600 hover:bg-black/10'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/icenspicekarachi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-gray-600 hover:bg-black/10'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/923216638470"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        isDark={isDark}
      />
      <Footer isDark={isDark} />
    </div>
  );
}
