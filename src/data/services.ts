import {
  Brain,
  Cloud,
  Globe,
  GraduationCap,
  Palette,
  SearchCheck,
  Settings,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceItem {
  slug: string;
  title: string;
  desc: string;
  longDesc: string;
  highlights: string[];
  tools: string[];
  icon: LucideIcon;
  color: string;
}

export const services: ServiceItem[] = [
  {
    slug: 'web-development',
    icon: Globe,
    title: 'Web Development',
    desc: 'Full-stack web applications with React, Next.js, and Node.js.',
    longDesc:
      'We build secure, fast and scalable web platforms with modern frontend and backend architecture for startups, SMEs and enterprise teams.',
    highlights: ['Custom dashboards', 'API integrations', 'SEO-ready architecture', 'Performance optimization'],
    tools: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    slug: 'mobile-apps',
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile apps with React Native and Flutter.',
    longDesc:
      'From MVP to production, we design and build mobile apps with clean UX and reliable backend connectivity for Android and iOS.',
    highlights: ['App store deployment', 'Realtime sync', 'Push notifications', 'Analytics integration'],
    tools: ['React Native', 'Flutter', 'Firebase', 'REST APIs'],
    color: 'from-teal-500 to-emerald-500',
  },
  {
    slug: 'cloud-solutions',
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'AWS, GCP and Azure infrastructure with CI/CD pipelines.',
    longDesc:
      'We architect cloud infrastructure with secure deployment pipelines, observability and cost-aware scaling models.',
    highlights: ['Cloud migration', 'Cost optimization', 'Serverless setup', 'Monitoring and alerts'],
    tools: ['AWS', 'GCP', 'Azure', 'Terraform'],
    color: 'from-cyan-500 to-teal-500',
  },
  {
    slug: 'ai-ml',
    icon: Brain,
    title: 'AI & ML',
    desc: 'Intelligent solutions powered by machine learning and NLP.',
    longDesc:
      'We deliver practical AI features such as recommendation engines, document intelligence and computer vision integrations.',
    highlights: ['NLP automation', 'Model serving', 'Prediction pipelines', 'AI feature integration'],
    tools: ['Python', 'FastAPI', 'TensorFlow', 'PyTorch'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    slug: 'devops',
    icon: Settings,
    title: 'DevOps',
    desc: 'Containerized deployments, automation and infrastructure as code.',
    longDesc:
      'We streamline engineering operations with CI/CD, IaC, monitoring and release governance for stable and frequent delivery.',
    highlights: ['CI/CD automation', 'Container orchestration', 'Infra as code', 'SRE support'],
    tools: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    slug: 'ui-ux-design',
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Research-led digital product design and design systems.',
    longDesc:
      'We design product experiences with clear user journeys, interface consistency and measurable conversion improvements.',
    highlights: ['Wireframing', 'Prototyping', 'Design systems', 'Usability testing'],
    tools: ['Figma', 'Design Tokens', 'User Research', 'A/B Testing'],
    color: 'from-orange-500 to-red-500',
  },
  {
    slug: 'digital-marketing-seo',
    icon: SearchCheck,
    title: 'Digital Marketing & SEO',
    desc: 'Growth-focused SEO, content strategy and digital campaign support.',
    longDesc:
      'We help businesses improve online visibility and lead generation through technical SEO, on-page optimization and data-driven campaigns.',
    highlights: ['Technical SEO audit', 'Keyword strategy', 'Content optimization', 'Monthly reporting'],
    tools: ['Google Search Console', 'GA4', 'Semrush', 'Meta Ads'],
    color: 'from-lime-500 to-emerald-500',
  },
  {
    slug: 'corporate-training',
    icon: GraduationCap,
    title: 'Corporate Training',
    desc: 'Industry-oriented training in C, C++, Java, Python, PHP, DBMS and more.',
    longDesc:
      'We conduct practical corporate training programs for engineering teams and students covering programming fundamentals, backend development and database systems.',
    highlights: ['C and C++', 'Java and Python', 'PHP and web basics', 'DBMS and SQL'],
    tools: ['C', 'C++', 'Java', 'Python', 'PHP', 'DBMS'],
    color: 'from-fuchsia-500 to-violet-500',
  },
];
