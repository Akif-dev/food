'use client';

const stats = [
  { value: '50K+', label: 'Happy Customers', icon: '😍', color: '#F59E0B' },
  { value: '4.9★', label: 'Average Rating', icon: '⭐', color: '#EF4444' },
  { value: '25min', label: 'Avg Delivery', icon: '⚡', color: '#10B981' },
  { value: '200+', label: 'Menu Items', icon: '🍽️', color: '#8B5CF6' },
];

const features = [
  {
    icon: '🚀',
    title: 'Lightning Delivery',
    desc: 'GPS-tracked riders. Your food arrives hot, fresh, and exactly on time — guaranteed.',
    color: '#F59E0B',
  },
  {
    icon: '👨‍🍳',
    title: 'Master Chefs',
    desc: 'Our kitchen team brings 15+ years of Michelin-trained expertise to every plate.',
    color: '#EF4444',
  },
  {
    icon: '🌿',
    title: 'Farm-to-Table',
    desc: 'We source directly from certified organic farms. No shortcuts, no compromises.',
    color: '#10B981',
  },
  {
    icon: '💎',
    title: 'Premium Quality',
    desc: 'Wagyu beef, truffle oil, artisan cheeses — premium ingredients in every dish.',
    color: '#8B5CF6',
  },
];

interface WhyChooseUsProps {
  isDark: boolean;
}

export default function WhyChooseUs({ isDark }: WhyChooseUsProps) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: isDark ? '#0A0A0F' : '#FAF8F3' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #F59E0B, transparent)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #EF4444, transparent)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-1 rounded-full bg-amber-500" />
            <span
              className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-gray-400'}`}
            >
              Why Us
            </span>
            <div className="w-8 h-1 rounded-full bg-amber-500" />
          </div>
          <h2
            className={`text-3xl lg:text-5xl font-display font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            The <span className="gradient-text-amber italic">Ice n Spice</span> Difference
          </h2>
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-500'}`}
          >
            We don't just deliver food — we deliver experiences that keep you coming back.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-6 text-center group hover:scale-105 transition-all duration-300 ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-display font-black mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className={`text-sm font-medium ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                {stat.label}
              </div>
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${stat.color}08, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className={`rounded-3xl p-7 group hover:scale-105 transition-all duration-400 ${isDark ? 'glass-card-dark hover:border-white/15' : 'glass-card-light hover:shadow-xl'}`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${feat.color}15` }}
              >
                {feat.icon}
              </div>
              <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {feat.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}
              >
                {feat.desc}
              </p>
              <div
                className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${feat.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
