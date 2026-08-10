import {
  Globe,
  Users,
  Boxes,
  IdCard,
  MonitorSmartphone,
  Bot,
  Workflow,
  Send,
  Plug,
  CloudCog,
  ShieldCheck,
  Gauge,
  Sparkles,
  Clock,
  LineChart,
  Layers,
  Stethoscope,
  BrainCircuit,
} from "lucide-react";

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const trustedBy = [
  "Private Clinics",
  "Retail",
  "Manufacturing",
  "Logistics",
  "Professional Services",
  "Local Businesses",
  "Growing Teams",
  "Startups",
];

export const services = [
  {
    icon: Globe,
    title: "Corporate Websites",
    description:
      "Fast, conversion-focused websites designed to strengthen your digital presence and turn visitors into customers.",
  },
  {
    icon: Users,
    title: "CRM Systems",
    description:
      "Centralize leads, customers, deals and communication in one simple operating system.",
  },
  {
    icon: Boxes,
    title: "ERP Systems",
    description:
      "Connect inventory, finance, operations and reporting in a single business platform.",
  },
  {
    icon: IdCard,
    title: "HR Management",
    description:
      "Digitize recruitment, onboarding, employee records, attendance and performance workflows.",
  },
  {
    icon: MonitorSmartphone,
    title: "Employee Monitoring",
    description:
      "Transparent productivity tools that help teams understand workloads and improve operations.",
  },
  {
    icon: Bot,
    title: "AI Assistants",
    description:
      "AI assistants that answer questions, qualify leads and automate repetitive customer operations.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Turn repetitive manual processes into reliable automated workflows.",
  },
  {
    icon: Send,
    title: "Telegram Bots",
    description:
      "Booking, notifications, customer support and business workflows directly inside Telegram.",
  },
  {
    icon: Plug,
    title: "API Integrations",
    description:
      "Connect your website, CRM, payment systems, Telegram and other business services.",
  },
  {
    icon: CloudCog,
    title: "Cloud Solutions",
    description:
      "Deploy and manage business applications with scalable cloud infrastructure.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We learn how your business works, identify repetitive tasks and find the biggest opportunities for automation.",
  },
  {
    step: "02",
    title: "Solution Blueprint",
    description:
      "We design the system architecture, workflows, integrations and implementation roadmap.",
  },
  {
    step: "03",
    title: "Build & Integrate",
    description:
      "Our team develops the solution and connects it with the tools your business already uses.",
  },
  {
    step: "04",
    title: "AI & Automation",
    description:
      "Where it makes sense, we add AI assistants and automated workflows to reduce manual work.",
  },
  {
    step: "05",
    title: "Launch & Improve",
    description:
      "We launch the system, monitor its performance and continue improving it as your business grows.",
  },
];

export const products = [
  {
    name: "Rivora CRM",
    tagline: "Customer operations",
    description:
      "A modern CRM concept for managing leads, customers, deals, communication and sales workflows in one place.",
    icon: LineChart,
    metrics: [
      { label: "Lead management", value: "Unified" },
      { label: "Sales workflow", value: "Automated" },
    ],
  },
  {
    name: "Rivora ERP",
    tagline: "Business operations",
    description:
      "A modular ERP concept connecting inventory, procurement, finance and operational processes.",
    icon: Layers,
    metrics: [
      { label: "Inventory", value: "Connected" },
      { label: "Reporting", value: "Real-time" },
    ],
  },
  {
    name: "Rivora Clinic",
    tagline: "Clinic management",
    description:
      "A digital clinic solution for appointments, patient workflows, reminders and day-to-day operations.",
    icon: Stethoscope,
    metrics: [
      { label: "Appointments", value: "Digital" },
      { label: "Reminders", value: "Automated" },
    ],
  },
  {
    name: "Rivora HR",
    tagline: "People operations",
    description:
      "A centralized HR solution for recruitment, onboarding, employee records, attendance and performance.",
    icon: IdCard,
    metrics: [
      { label: "Recruitment", value: "Centralized" },
      { label: "Employee data", value: "Organized" },
    ],
  },
  {
    name: "Rivora AI",
    tagline: "AI business assistant",
    description:
      "Multilingual AI assistants designed to understand your business and automate customer and internal workflows.",
    icon: BrainCircuit,
    metrics: [
      { label: "Languages", value: "UZ / RU / EN" },
      { label: "Availability", value: "24/7" },
    ],
  },
];

export const advantages = [
  {
    icon: Sparkles,
    title: "AI-native thinking",
    description:
      "We look for practical opportunities to use AI where it can genuinely improve your business.",
  },
  {
    icon: Clock,
    title: "Built for fast launches",
    description:
      "We focus on clear scope and practical first releases instead of unnecessary complexity.",
  },
  {
    icon: ShieldCheck,
    title: "Security first",
    description:
      "Business systems are designed with access control, secure data handling and responsible architecture.",
  },
  {
    icon: Gauge,
    title: "Focused on outcomes",
    description:
      "We build around measurable business problems: fewer manual tasks, faster operations and better customer experiences.",
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Technology services" },
  { value: 5, suffix: "", label: "RIVORA solutions" },
  { value: 3, suffix: "", label: "Supported languages" },
  { value: 30, suffix: " days", label: "Target first release" },
];

export const testimonials = [
  {
    quote:
      "Appointments, reminders and customer communication can be connected into one automated workflow.",
    name: "Clinic automation",
    role: "Example use case",
    initials: "CA",
  },
  {
    quote:
      "Capture leads from your website and Telegram, qualify them and move them directly into your CRM.",
    name: "Lead management",
    role: "Example use case",
    initials: "LM",
  },
  {
    quote:
      "An AI assistant can answer common questions, collect customer information and route complex requests to your team.",
    name: "AI customer assistant",
    role: "Example use case",
    initials: "AI",
  },
  {
    quote:
      "Connect the tools your team already uses and automate repetitive internal processes.",
    name: "Workflow automation",
    role: "Example use case",
    initials: "WA",
  },
];

export const pricing = [
  {
    name: "Launch",
    price: "$490",
    cadence: "from",
    description:
      "For businesses that need a professional digital presence or a focused automation project.",
    features: [
      "Corporate website or landing page",
      "Responsive design",
      "Lead/contact form",
      "Basic business integration",
      "Deployment assistance",
      "30 days of support",
    ],
    cta: "Start with Launch",
    featured: false,
  },
  {
    name: "Growth",
    price: "$1,900",
    cadence: "from",
    description:
      "For businesses ready to connect their operations and automate repetitive work.",
    features: [
      "Everything in Launch",
      "CRM or business management system",
      "Telegram bot",
      "AI assistant",
      "Workflow automation",
      "API integrations",
      "90 days of support",
    ],
    cta: "Book a strategy call",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "project",
    description:
      "For companies that need a larger custom platform or complex business automation.",
    features: [
      "Custom system architecture",
      "CRM / ERP / HR development",
      "Advanced AI automation",
      "Multiple integrations",
      "Cloud or private deployment",
      "Dedicated development team",
      "Long-term support",
    ],
    cta: "Talk to RIVORA",
    featured: false,
  },
];

export const faqs = [
  {
    question: "How fast can we launch?",
    answer:
      "The timeline depends on the project. A simple website can be launched quickly, while CRM, ERP and automation systems require more planning and development. During discovery we provide a realistic implementation timeline.",
  },
  {
    question: "Can you work with our existing systems?",
    answer:
      "Yes. We can integrate websites and applications with existing CRM, accounting, payment, Telegram, communication and other business systems where suitable integration methods are available.",
  },
  {
    question: "Can you build a completely custom system?",
    answer:
      "Yes. RIVORA can develop custom CRM, ERP, HR, clinic and workflow systems around your specific business processes.",
  },
  {
    question: "What languages do your AI assistants support?",
    answer:
      "Our AI solutions can be designed for Uzbek, Russian and English, depending on the specific use case and available business data.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We can continue monitoring, fixing issues, improving workflows and adding new functionality after the initial release.",
  },
  {
    question: "Do you work with businesses outside Uzbekistan?",
    answer:
      "Yes. RIVORA is built in Uzbekistan, while our technology stack allows us to work with businesses internationally.",
  },
];

export const contactChannels = [
  { label: "Email", value: "hello@rivora.uz" },
  { label: "Telegram", value: "@rivora_uz" },
  { label: "Location", value: "Tashkent, Uzbekistan" },
];

export const footerColumns = [
  {
    title: "Products",
    links: [
      "Rivora CRM",
      "Rivora ERP",
      "Rivora Clinic",
      "Rivora HR",
      "Rivora AI",
    ],
  },
  {
    title: "Services",
    links: [
      "Corporate Websites",
      "Workflow Automation",
      "Telegram Bots",
      "API Integrations",
      "Cloud Solutions",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Security", "Status", "Privacy"],
  },
];