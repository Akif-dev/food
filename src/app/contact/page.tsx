'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';

export default function ContactPage() {
  const { isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.warn('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const bg = isDark ? '#0A0A0F' : '#FAF8F3';
  const textPrimary = isDark ? '#F5F5F0' : '#1A1A24';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

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
                Contact Us
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1
                  className={`text-4xl lg:text-5xl font-display font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Get in <span className="gradient-text-amber italic">Touch</span>
                </h1>
                <p
                  className={`mt-3 text-base max-w-lg ${isDark ? 'text-white/50' : 'text-gray-500'}`}
                >
                  Have questions or feedback? We&apos;d love to hear from you. Reach out to us and
                  we&apos;ll respond as soon as we can.
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
                  ⚡ 25min Delivery
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info & Map */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2
                  className={`text-3xl lg:text-4xl font-display font-black mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Contact <span className="gradient-text-amber italic">Information</span>
                </h2>

                <div className="space-y-6">
                  <div
                    className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                    style={{ border: `1px solid ${borderColor}` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className={`font-display font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                          Address
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          # 2, North Plaza, Block-A North Nazimabad
                          <br />
                          opp Jinnah University, Karachi, Pakistan
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                    style={{ border: `1px solid ${borderColor}` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
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
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-2xl ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                    style={{ border: `1px solid ${borderColor}` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
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
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3
                    className={`font-display font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
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

              {/* Map */}
              <div
                className={`rounded-3xl overflow-hidden ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
                style={{ border: `1px solid ${borderColor}` }}
              >
                <div className="aspect-square md:aspect-video lg:aspect-square">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.123456789!2d67.03456789!3d24.91234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzI4LjQiTiA2N8KwMDInMDguNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s!4v1620000000000"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20" style={{ background: isDark ? '#111118' : '#F3F0E8' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl lg:text-4xl font-display font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Send Us a <span className="gradient-text-amber italic">Message</span>
              </h2>
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: inputBg,
                      border: `1px solid ${borderColor}`,
                      color: textPrimary,
                    }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                    style={{
                      background: inputBg,
                      border: `1px solid ${borderColor}`,
                      color: textPrimary,
                    }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300"
                  style={{
                    background: inputBg,
                    border: `1px solid ${borderColor}`,
                    color: textPrimary,
                  }}
                  placeholder="03XX-XXXXXXX"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 resize-none"
                  style={{
                    background: inputBg,
                    border: `1px solid ${borderColor}`,
                    color: textPrimary,
                  }}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                  boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
