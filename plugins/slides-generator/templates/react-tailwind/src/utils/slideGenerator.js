/**
 * Generate slides based on configuration
 */
export const generateSlides = ({ title, author, count, theme }) => {
  const slides = [];

  // Slide 1: Title slide
  slides.push({
    id: 1,
    number: '1',
    title: title,
    content: '',
    bullets: [],
    isTitle: true,
    author: author
  });

  // Slide 2: Introduction
  slides.push({
    id: 2,
    number: '2',
    title: 'Introduction',
    content: `Welcome to this presentation about ${title}. Let's explore the key topics together.`,
    bullets: [
      'Overview of the subject',
      'Key concepts and insights',
      'Practical applications',
      'Future considerations'
    ]
  });

  // Middle slides: Content slides
  const contentTopics = [
    { title: 'Overview', bullets: ['Background context', 'Current state', 'Key challenges'] },
    { title: 'Key Concepts', bullets: ['Core principles', 'Important definitions', 'Framework overview'] },
    { title: 'Analysis', bullets: ['Data insights', 'Trends and patterns', 'Key findings'] },
    { title: 'Implementation', bullets: ['Step-by-step process', 'Best practices', 'Common pitfalls'] },
    { title: 'Results', bullets: ['Measurable outcomes', 'Success metrics', 'Achievements'] },
    { title: 'Challenges', bullets: ['Obstacles faced', 'Solutions applied', 'Lessons learned'] },
    { title: 'Best Practices', bullets: ['Recommendations', 'Tips and tricks', 'Proven strategies'] },
    { title: 'Future Outlook', bullets: ['Upcoming trends', 'Opportunities', 'Next steps'] }
  ];

  for (let i = 3; i < count; i++) {
    const topicIndex = (i - 3) % contentTopics.length;
    const topic = contentTopics[topicIndex];

    slides.push({
      id: i,
      number: `${i}`,
      title: topic.title,
      content: `Exploring ${topic.title.toLowerCase()} in the context of ${title}.`,
      bullets: topic.bullets
    });
  }

  // Second-to-last slide: Summary
  if (count > 2) {
    slides.push({
      id: count - 1,
      number: `${count - 1}`,
      title: 'Key Takeaways',
      content: 'Let\'s review the main points from this presentation.',
      bullets: [
        'Summary of main concepts',
        'Important insights gained',
        'Actionable next steps',
        'Final thoughts'
      ]
    });
  }

  // Last slide: Thank you
  slides.push({
    id: count,
    number: `${count}`,
    title: 'Thank You!',
    content: 'Questions & Discussion',
    bullets: [],
    isEnd: true
  });

  return slides;
};

/**
 * Slugify a string for use in filenames
 */
export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
