export default function StructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Ice n Spice',
    image: 'https://icenspice.pk/logo-ins-akif.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '# 2, North Plaza, Block-A North Nazimabad',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      postalCode: '74700',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.9265199,
      longitude: 67.0282502,
    },
    url: 'https://icenspice.pk',
    telephone: '+92 321 6638470',
    priceRange: '₨₨',
    servesCuisine: ['Arabic', 'Turkish', 'Chinese', 'Fast Food', 'BBQ'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:30',
        closes: '23:00',
      },
    ],
    menu: 'https://icenspice.pk/menu',
    acceptsReservations: false,
    deliveryMethod: 'Delivery',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.2',
      reviewCount: '1965',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ice n Spice',
    url: 'https://icenspice.pk',
    description: 'Ice n Spice is a premium restaurant in North Nazimabad, Karachi serving authentic Arabic wraps, Turkish platters, Zinger burgers, Chinese cuisine, and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://icenspice.pk/menu?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ice n Spice',
    image: 'https://icenspice.pk/logo-ins-akif.png',
    telephone: '+92 321 6638470',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '# 2, North Plaza, Block-A North Nazimabad',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.9265199,
      longitude: 67.0282502,
    },
    openingHours: 'Mo-Su 11:30-23:00',
    priceRange: '₨₨',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
    </>
  );
}
