/**
 * Generate animated architecture diagram data
 */

export const generateArchitecture = (type = 'fullstack') => {
  const architectures = {
    fullstack: {
      nodes: [
        // Client Layer
        {
          id: '1',
          position: { x: 100, y: 100 },
          data: {
            label: 'React App',
            subtitle: 'Client',
            icon: '⚛️',
            description: 'Next.js 16 with App Router',
            tech: ['React', 'TypeScript', 'Tailwind']
          },
          style: { background: '#3b82f6', color: 'white' }
        },
        {
          id: '2',
          position: { x: 100, y: 250 },
          data: {
            label: 'Mobile App',
            subtitle: 'Client',
            icon: '📱',
            description: 'React Native',
            tech: ['React Native', 'Expo']
          },
          style: { background: '#3b82f6', color: 'white' }
        },

        // API Layer
        {
          id: '3',
          position: { x: 400, y: 100 },
          data: {
            label: 'API Gateway',
            subtitle: 'Backend',
            icon: '🚪',
            description: 'REST & GraphQL',
            tech: ['Express', 'Apollo']
          },
          style: { background: '#22c55e', color: 'white' }
        },
        {
          id: '4',
          position: { x: 400, y: 250 },
          data: {
            label: 'Auth Service',
            subtitle: 'Backend',
            icon: '🔐',
            description: 'JWT & OAuth',
            tech: ['NextAuth', 'Clerk']
          },
          style: { background: '#22c55e', color: 'white' }
        },

        // Services Layer
        {
          id: '5',
          position: { x: 700, y: 50 },
          data: {
            label: 'User Service',
            subtitle: 'Microservice',
            icon: '👤',
            description: 'User management',
            tech: ['Node.js', 'Prisma']
          },
          style: { background: '#a855f7', color: 'white' }
        },
        {
          id: '6',
          position: { x: 700, y: 175 },
          data: {
            label: 'Payment Service',
            subtitle: 'Microservice',
            icon: '💳',
            description: 'Stripe integration',
            tech: ['Node.js', 'Stripe']
          },
          style: { background: '#a855f7', color: 'white' }
        },
        {
          id: '7',
          position: { x: 700, y: 300 },
          data: {
            label: 'Notification Service',
            subtitle: 'Microservice',
            icon: '🔔',
            description: 'Email & Push',
            tech: ['Node.js', 'Resend']
          },
          style: { background: '#a855f7', color: 'white' }
        },

        // Data Layer
        {
          id: '8',
          position: { x: 1000, y: 100 },
          data: {
            label: 'PostgreSQL',
            subtitle: 'Database',
            icon: '🐘',
            description: 'Primary database',
            tech: ['PostgreSQL', 'Neon']
          },
          style: { background: '#f97316', color: 'white' }
        },
        {
          id: '9',
          position: { x: 1000, y: 250 },
          data: {
            label: 'Redis',
            subtitle: 'Cache',
            icon: '⚡',
            description: 'Caching layer',
            tech: ['Redis', 'Upstash']
          },
          style: { background: '#f97316', color: 'white' }
        },

        // External Services
        {
          id: '10',
          position: { x: 1300, y: 100 },
          data: {
            label: 'Stripe',
            subtitle: 'External',
            icon: '💰',
            description: 'Payment processing',
            tech: ['Stripe API']
          },
          style: { background: '#64748b', color: 'white' }
        },
        {
          id: '11',
          position: { x: 1300, y: 250 },
          data: {
            label: 'SendGrid',
            subtitle: 'External',
            icon: '📧',
            description: 'Email service',
            tech: ['SendGrid API']
          },
          style: { background: '#64748b', color: 'white' }
        }
      ],
      edges: [
        // Client to API
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },

        // API Gateway to Services
        { id: 'e3-4', source: '3', target: '4', animated: true },
        { id: 'e3-5', source: '3', target: '5', animated: true },
        { id: 'e3-6', source: '3', target: '6', animated: true },
        { id: 'e3-7', source: '3', target: '7', animated: true },

        // Services to Data
        { id: 'e5-8', source: '5', target: '8', animated: true },
        { id: 'e5-9', source: '5', target: '9', animated: true },
        { id: 'e6-8', source: '6', target: '8', animated: true },
        { id: 'e7-9', source: '7', target: '9', animated: true },

        // External Services
        { id: 'e6-10', source: '6', target: '10', animated: true },
        { id: 'e7-11', source: '7', target: '11', animated: true }
      ]
    },

    microservices: {
      nodes: [
        {
          id: '1',
          position: { x: 100, y: 150 },
          data: {
            label: 'API Gateway',
            subtitle: 'Entry Point',
            icon: '🚪',
            description: 'Kong / NGINX',
            tech: ['Kong', 'NGINX']
          }
        },
        {
          id: '2',
          position: { x: 400, y: 50 },
          data: {
            label: 'Service A',
            subtitle: 'Business Logic',
            icon: '⚙️',
            description: 'Core service',
            tech: ['Go', 'gRPC']
          }
        },
        {
          id: '3',
          position: { x: 400, y: 150 },
          data: {
            label: 'Service B',
            subtitle: 'Business Logic',
            icon: '⚙️',
            description: 'User service',
            tech: ['Node.js', 'REST']
          }
        },
        {
          id: '4',
          position: { x: 400, y: 250 },
          data: {
            label: 'Service C',
            subtitle: 'Business Logic',
            icon: '⚙️',
            description: 'Payment service',
            tech: ['Python', 'GraphQL']
          }
        },
        {
          id: '5',
          position: { x: 700, y: 100 },
          data: {
            label: 'Message Queue',
            subtitle: 'Event Bus',
            icon: '📨',
            description: 'RabbitMQ / Kafka',
            tech: ['RabbitMQ', 'Kafka']
          }
        },
        {
          id: '6',
          position: { x: 1000, y: 100 },
          data: {
            label: 'Database Cluster',
            subtitle: 'Data Layer',
            icon: '🗄️',
            description: 'PostgreSQL',
            tech: ['PostgreSQL', 'Patroni']
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e1-3', source: '1', target: '3' },
        { id: 'e1-4', source: '1', target: '4' },
        { id: 'e2-5', source: '2', target: '5' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' }
      ]
    },

    serverless: {
      nodes: [
        {
          id: '1',
          position: { x: 100, y: 150 },
          data: {
            label: 'Client App',
            subtitle: 'Frontend',
            icon: '⚛️',
            description: 'Next.js / SPA',
            tech: ['Next.js', 'React']
          }
        },
        {
          id: '2',
          position: { x: 400, y: 150 },
          data: {
            label: 'CDN Edge',
            subtitle: 'Vercel / Cloudflare',
            icon: '🌐',
            description: 'Edge Functions',
            tech: ['Vercel', 'Edge Functions']
          }
        },
        {
          id: '3',
          position: { x: 700, y: 100 },
          data: {
            label: 'API Function',
            subtitle: 'Serverless',
            icon: '⚡',
            description: 'API Routes',
            tech: ['Node.js', 'Vercel Functions']
          }
        },
        {
          id: '4',
          position: { x: 700, y: 200 },
          data: {
            label: 'Auth Function',
            subtitle: 'Serverless',
            icon: '🔐',
            description: 'Authentication',
            tech: ['NextAuth', 'Clerk']
          }
        },
        {
          id: '5',
          position: { x: 1000, y: 150 },
          data: {
            label: 'Managed DB',
            subtitle: 'Serverless',
            icon: '🗄️',
            description: 'Neon / Supabase',
            tech: ['Neon', 'Supabase']
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e4-5', source: '4', target: '5' }
      ]
    }
  };

  return architectures[type] || architectures.fullstack;
};

export const generateChartData = (type = 'performance') => {
  const charts = {
    performance: [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 600 },
      { name: 'Apr', value: 800 },
      { name: 'May', value: 1200 },
      { name: 'Jun', value: 1500 }
    ],
    userGrowth: [
      { name: 'Week 1', value: 100 },
      { name: 'Week 2', value: 300 },
      { name: 'Week 3', value: 500 },
      { name: 'Week 4', value: 800 },
      { name: 'Week 5', value: 1200 },
      { name: 'Week 6', value: 1800 }
    ],
    distribution: [
      { name: 'Desktop', value: 400 },
      { name: 'Mobile', value: 300 },
      { name: 'Tablet', value: 200 },
      { name: 'Other', value: 100 }
    ]
  };

  return charts[type] || charts.performance;
};

export const generateProcessSteps = (type = 'deployment') => {
  const processes = {
    deployment: [
      {
        title: 'Build',
        description: 'Compile & bundle code',
        icon: '🔨',
        completed: true
      },
      {
        title: 'Test',
        description: 'Run automated tests',
        icon: '🧪',
        completed: true
      },
      {
        title: 'Deploy',
        description: 'Deploy to production',
        icon: '🚀',
        completed: false
      },
      {
        title: 'Monitor',
        description: 'Monitor performance',
        icon: '📊',
        completed: false
      }
    ],
    development: [
      {
        title: 'Plan',
        description: 'Define requirements',
        icon: '📋',
        completed: true
      },
      {
        title: 'Design',
        description: 'Create mockups',
        icon: '🎨',
        completed: true
      },
      {
        title: 'Develop',
        description: 'Build features',
        icon: '💻',
        completed: false
      },
      {
        title: 'Review',
        description: 'Code review & test',
        icon: '👀',
        completed: false
      }
    ]
  };

  return processes[type] || processes.deployment;
};
