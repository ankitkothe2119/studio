
/**
 * @fileoverview This file centralizes all the static page content for the website.
 * By keeping the content in one place, we can avoid circular dependencies
 * between the pages and the translation context.
 */

export const homePageContent = {
  hero: {
    heading: 'Building Hope, Changing Lives',
    subheading: 'Join us in creating meaningful change for communities in need through education, healthcare, and other empowerment programs worldwide.',
    cta1: 'Donate Now',
    cta2: 'Read More',
  },
  impact: {
    title: 'Our Impact in Numbers',
    stats: [
      { number: '50,000+', label: 'Lives Touched' },
      { number: '120', label: 'Projects Completed' },
      { number: '25', label: 'Countries Served' },
      { number: '5,000+', label: 'Volunteers' },
    ],
  },
  mission: {
    title: 'Our Mission',
    text: "At Sarthi Shiksha, we are dedicated to improving lives in underserved communities through sustainable and impactful programs. Our mission is to provide access to quality education, healthcare, and economic opportunities, empowering individuals to build a better future for themselves and their families.",
    cta: 'Learn About Us',
  },
  focus: {
    title: 'Our Focus Areas',
    areas: [
      {
        icon: 'GraduationCap',
        title: 'Education',
        description: 'Building schools, providing learning materials, and supporting teachers to ensure every child has access to quality education.',
      },
      {
        icon: 'HeartPulse',
        title: 'Healthcare',
        description: 'Operating medical clinics, organizing health camps, and promoting preventive care to improve community well-being.',
      },
      {
        icon: 'Building',
        title: 'Community Development',
        description: 'Creating job opportunities, supporting small businesses, and improving local infrastructure to foster self-reliant communities.',
      },
    ],
  },
  projects: {
    title: 'Recent Projects',
    subtitle: 'See how we are making a difference in the lives of many.',
    items: [
      {
        image: { src: 'https://placehold.co/600x400.png', hint: 'school building' },
        title: 'School Construction in Kenya',
        description: 'Building a new primary school to provide a safe learning environment for over 300 children.',
        link: '#',
      },
      {
        image: { src: 'https://placehold.co/600x400.png', hint: 'clean water' },
        title: 'Clean Water Initiative',
        description: 'Installing water purification systems to provide access to clean and safe drinking water for a community of 5,000 people.',
        link: '#',
      },
      {
        image: { src: 'https://placehold.co/600x400.png', hint: 'medical clinic' },
        title: 'Mobile Health Clinic',
        description: 'Launching a mobile clinic to deliver essential healthcare services to remote and underserved populations.',
        link: '#',
      },
    ],
  },
  ctaSection: {
    title: 'Ready to Make a Difference?',
    text: "Your contribution, no matter the size, can help us create a stronger, more just world. Join our network of supporters who are creating positive change around the world.",
    button1: 'Start Donating Today',
    button2: 'Volunteer',
  },
};

export const aboutPageContent = {
  hero: {
    title: 'About Hope Foundation',
    subtitle: 'Creating lasting change through compassion, dedication, and community partnership',
  },
  ourStory: {
    title: 'Our Story',
    text: "Founded in 2012, Hope Foundation began as a small group of passionate individuals who witnessed the urgent need for sustainable development in their local communities. What started as a local initiative soon grew into a global movement, reaching across over 25 countries.\n\nThe founders, Dr. Sarah Mitchell and Marcus Thompson, were inspired by their experiences working in underserved communities, where they saw first-hand how targeted interventions could transform entire communities. Their shared belief is that the foundation of a thriving society is its people. For people to create a world where every person has access to basic human needs and opportunities for growth.\n\nToday, we continue to live that vision by working directly with communities to develop sustainable solutions that address the root causes of poverty and inequality. Our approach is built on respect, partnership, and the belief that lasting change comes from within communities themselves.",
  },
  missionVisionValues: {
    title: 'Our Mission, Vision, and Values',
    items: [
      {
        icon: 'Goal',
        title: 'Our Mission',
        description: 'To serve the most vulnerable populations by providing sustainable solutions for education, healthcare, and economic development, aiming to alleviate poverty and move toward self-sufficiency.',
      },
      {
        icon: 'Eye',
        title: 'Our Vision',
        description: 'To create a world where every person has access to basic human needs, quality education, healthcare, and economic opportunities, regardless of their circumstances or location.',
      },
      {
        icon: 'Heart',
        title: 'Our Values',
        description: 'Compassion, integrity, respect, sustainability, and accountability guide everything we do, from our work in the field to our internal and transparent operations.',
      },
    ],
  },
  team: {
    title: 'Meet Our Team',
    subtitle: 'Dedicated professionals working to create positive change',
    members: [
      { name: 'Dr. Sarah Mitchell', role: 'Co-Founder & CEO', avatar: 'SM', description: 'Leads our organization with a passion for sustainable development and community empowerment.', category: 'Founder' },
      { name: 'Marcus Thompson', role: 'Co-Founder & COO', avatar: 'MT', description: 'Ensuring our global projects are delivered on time and with the greatest possible impact on communities.', category: 'Founder' },
      { name: 'Emily Chen', role: 'Head of Partnerships', avatar: 'EC', description: 'Building strategic relationships that help us expand our reach and amplify our impact.', category: 'Team Member' },
      { name: 'David Rodriguez', role: 'Field Coordinator', avatar: 'DR', description: 'Coordinating our grassroots efforts, ensuring our projects meet the real needs of communities.', category: 'Team Member' },
      { name: 'Jessica Lee', role: 'Marketing Lead', avatar: 'JL', description: 'Sharing our stories of impact and engaging with our community of supporters.', category: 'Team Member' },
      { name: 'Brian Smith', role: 'Lead Developer', avatar: 'BS', description: 'Building the digital tools that power our mission and connect us with the world.', category: 'Team Member' },
    ],
  },
  journey: {
    title: 'Our Journey',
    subtitle: 'Key milestones in our mission to create positive change',
    milestones: [
        { year: '2010', title: 'Foundation Established', description: 'Hope Foundation is born with a mission to create sustainable change in underserved communities.'},
        { year: '2015', title: 'Global Expansion', description: 'Programs expanded to 10 new countries, reaching over 10,000 direct beneficiaries.'},
        { year: '2020', title: 'Major Milestone', description: 'Reached 25,000 beneficiaries through education, health, and economic development programs.'},
        { year: '2024', title: '50,000+ Lives Touched', description: 'Continuing to build on our success, with projects reaching over 50,000 lives annually.'},
    ]
  },
  cta: {
      title: 'Join Our Mission',
      text: 'Be part of our story and help us create even greater impact in communities around the world.',
      button1: 'Get Involved',
      button2: 'Contact Us',
  }
};

export const projectsPageContent = {
  hero: {
    title: 'Our Projects',
    subtitle: 'Transforming communities through sustainable development initiatives',
  },
  filters: [
    'All Projects',
    'Education',
    'Healthcare',
    'Clean Water',
    'Economic Empowerment',
  ],
  projects: [
    {
      title: 'Clean Water Access Initiative',
      category: 'Clean Water',
      location: 'Kama, East Africa',
      image: { src: 'https://placehold.co/600x400.png', hint: 'community clean water' },
      description: 'Installing water wells and sanitation systems to provide clean water access for rural communities.',
      impact: '2,000 families',
    },
    {
      title: 'Primary School Construction',
      category: 'Education',
      location: 'Guatemala, Central America',
      image: { src: 'https://placehold.co/600x400.png', hint: 'school construction' },
      description: 'Building new classrooms and providing educational materials for children in rural Guatemala.',
      impact: '500 children',
    },
    {
      title: 'Mobile Health Clinic Program',
      category: 'Healthcare',
      location: 'Rural India',
      image: { src: 'https://placehold.co/600x400.png', hint: 'mobile health clinic' },
      description: 'Providing essential healthcare services to remote villages through mobile medical units.',
      impact: '5,000 people',
    },
    {
      title: "Women's Microfinance Program",
      category: 'Economic Empowerment',
      location: 'Bangladesh',
      image: { src: 'https://placehold.co/600x400.png', hint: 'women working' },
      description: 'Empowering women through microloans and business training to start their own enterprises.',
      impact: '800 women',
    },
     {
      title: 'Solar Energy Installation',
      category: 'Clean Water', // Assuming this fits best, can be changed
      location: 'Nepal',
      image: { src: 'https://placehold.co/600x400.png', hint: 'solar panels mountain' },
      description: 'Installing solar panels to provide clean electricity to off-grid mountain communities.',
      impact: '1,200 households',
    },
     {
      title: 'Emergency Food Distribution',
      category: 'Healthcare', // Assuming this fits best
      location: 'Somalia, East Africa',
      image: { src: 'https://placehold.co/600x400.png', hint: 'food distribution' },
      description: 'Providing emergency food aid and nutrition support during drought conditions.',
      impact: '3,500 families',
    },
  ],
  projectImpact: {
    title: 'Project Impact',
    subtitle: 'Measuring our collective impact across all projects',
    stats: [
      { number: '120', label: 'Projects Completed' },
      { number: '25', label: 'Countries Served' },
      { number: '50,000+', label: 'Lives Impacted' },
      { number: '$2.5M', label: 'Total Investment' },
    ],
  },
  cta: {
    title: 'Support Our Next Project',
    subtitle: 'Your contribution helps us launch new initiatives and expand our impact to more communities in need.',
    button1: 'Donate Now',
    button2: 'Partner With Us',
  }
};

export const howToHelpPageContent = {
  title: 'How You Can Help',
  subtitle: 'Your support, in any form, makes a world of difference.',
  sections: [
    {
      icon: 'DollarSign',
      title: 'Donate',
      description: 'Your financial contribution helps us fund our projects, from providing educational materials to organizing healthcare camps. Every donation, big or small, creates a significant impact.',
      cta: 'Donate Now',
      link: '/contact' // Assuming donate button leads to contact for now
    },
    {
      icon: 'Users',
      title: 'Volunteer',
      description: "Join our passionate team of volunteers. Whether you can help with teaching, event management, or administrative tasks, your time and skills are invaluable to us.",
      cta: 'Become a Volunteer',
      link: '/contact'
    },
    {
      icon: 'Heart',
      title: 'Spread the Word',
      description: 'Follow us on social media and share our stories. Raising awareness is a powerful way to support our mission and help us reach a wider audience.',
      cta: 'Follow Us',
      link: '#'
    },
    {
      icon: 'Mail',
      title: 'Corporate Partnership',
      description: 'We welcome partnerships with corporations that share our vision. Collaborate with us on CSR initiatives to create a lasting social impact.',
      cta: 'Partner With Us',
      link: '/contact'
    }
  ]
};

export const newsPageContent = {
  title: 'News & Updates',
  subtitle: 'Stay informed about our latest activities, events, and stories.',
  articles: [
    {
      title: 'Successful Completion of Annual Summer Camp',
      date: 'August 15, 2024',
      image: { src: 'https://placehold.co/600x400.png', hint: 'children playing' },
      excerpt: 'Our annual summer camp for underprivileged children concluded successfully, providing a fun and educational experience for over 100 kids. The camp included activities like art, sports, and basic computer literacy.',
      link: '#',
    },
    {
      title: 'New Community Library Inaugurated',
      date: 'July 28, 2024',
      image: { src: 'https://placehold.co/600x400.png', hint: 'library books' },
      excerpt: 'We are thrilled to announce the opening of a new community library in the village of Rampur. The library aims to foster a love for reading among children and adults alike.',
      link: '#',
    },
    {
      title: 'Healthcare Awareness Drive Reaches 5000+ People',
      date: 'July 05, 2024',
      image: { src: 'https://placehold.co/600x400.png', hint: 'doctor patient' },
      excerpt: 'Our recent healthcare awareness drive, part of the Swasthya Abhiyan project, successfully reached over 5000 individuals, providing them with essential health information and check-ups.',
      link: '#',
    },
    {
      title: 'Volunteer Appreciation Day',
      date: 'June 20, 2024',
      image: { src: 'https://placehold.co/600x400.png', hint: 'group people' },
      excerpt: 'We celebrated our incredible team of volunteers whose dedication and hard work are the backbone of our organization. Thank you for your selfless service!',
      link: '#',
    },
  ],
};

export const contactPageContent = {
  title: 'Contact Us',
  subtitle: 'We would love to hear from you. Get in touch with us for any queries or support.',
  contactInfo: {
    address: '123 Seva Marg, Community Nagar, New Delhi, India 110001',
    phone: '+91 12345 67890',
    email: 'info@sarthishiksha.org',
  },
  form: {
    nameLabel: 'Your Name',
    namePlaceholder: 'Enter your full name',
    emailLabel: 'Your Email',
    emailPlaceholder: 'Enter your email address',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Type your message here...',
    submitButton: 'Send Message',
    successTitle: 'Message Sent!',
    successDescription: 'Thank you for reaching out. We will get back to you soon.',
    errorTitle: 'Error',
    errorDescription: 'Something went wrong. Please try again.'
  },
  map: {
    title: 'Our Location',
  }
};

