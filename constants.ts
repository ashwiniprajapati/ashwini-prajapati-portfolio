
import { ProfileData } from './types';

export const PROFILE: ProfileData = {
  name: "Ashwini Prajapati",
  title: "Technology Lead",
  email: "ash1011995@gmail.com",
  phone: "+91 9925913139",
  location: "Vadodara, Gujarat, India",
  linkedin: "www.linkedin.com/in/prajapati-ashwini",
  summary: "Results-driven software professional with 9+ years of experience in software development and project execution, including 5 years of hands-on expertise in Angular. Proven track record of delivering high-quality solutions using a variety of tools and technologies. Committed to leveraging my skills and strengths to contribute effectively to organizational goals while continuously striving for excellence and innovation in every phase of the project lifecycle.",
  experiences: [
    {
      role: "Technology Lead",
      company: "Infosys Ltd.",
      period: "09/2022 – Present",
      location: "Pune, India",
      highlights: [
        "Leading development across both Angular and React codebases to enhance complex enterprise applications",
        "Managing and handling a high-performance team to ensure high-quality and timely project deliverables",
        "Mentoring junior developers and driving code quality through rigorous best practices and peer reviews",
        "Collaborating with cross-functional teams for scalable, optimized frontend solutions and seamless integrations"
      ]
    },
    {
      role: "Sr. Software Developer",
      company: "Logical Wings Info web Pvt Ltd",
      period: "05/2018 – 08/2022",
      location: "Ahmedabad, India",
      highlights: [
        "Developed UI and REST APIs using Angular and PHP for web applications",
        "Led feature development, bug fixes, and production deployments on GCP",
        "Mentored junior team members and ensured timely delivery of project milestones"
      ]
    },
    {
      role: "Software Developer",
      company: "Sterling Softwares",
      period: "02/2016 – 04/2018",
      location: "Vadodara, India",
      highlights: [
        "Built responsive UIs and backend solutions using PHP (MVC) and MySQL",
        "Delivered static websites and managed deployments via cPanel",
        "Contributed to performance improvements through bug fixes and feature enhancements"
      ]
    }
  ],
  skills: [
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery", "AJAX", "Angular 5+", "TypeScript", "Clarity Design", "React", "NextJS"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "PHP (Core, MVC)", "CodeIgniter", "Slim", "REST APIs"]
    },
    {
      category: "Databases",
      skills: ["MySQL", "PostgreSQL", "MongoDB"]
    },
    {
      category: "Cloud & Tools",
      skills: ["AWS (Learning)", "Git", "GitHub", "GitLab", "SVN", "Selenium", "Cucumber", "Postman", "Swagger", "Jira", "MS TFS"]
    },
    {
      category: "Mobile & Others",
      skills: ["Apache Cordova", "Analytical Thinking", "Problem Solving", "Effective Communication", "Team Collaboration"]
    }
  ],
  projects: [
    {
      title: "Verizon - MyBiz",
      description: "An enterprise telecom portal for managing business accounts, services, and subscriptions. Leading the data tagging team across Angular and React repositories to enable accurate analytics and tracking.",
      techUsed: ["Angular", "React", "TypeScript", "JavaScript", "Git", "Jira"]
    },
    {
      title: "Dell – APEX Custom Experience Portal",
      description: "Platform for internal sales representatives to visualize all pricing options to generate booking packages and contracts. Responsible for UI and API integration.",
      techUsed: ["Angular 16", "TypeScript", "JavaScript", "Prometheus web components", "CSS", "Clarity Design system", "JIRA", "GitLab", "Java (Backend)"]
    },
    {
      title: "Last Letter First",
      description: "A social word game where players take the last letter of a word to start a new one. Cross-platform mobile application implementation.",
      techUsed: ["Angular 6", "Cordova", "PHP (Slim Framework)"]
    },
    {
      title: "NicoERP",
      description: "Custom ERP software covering Manufacturing, HR, Procurement, QC, Sales, and Inventory Reports.",
      techUsed: ["HTML", "CSS", "JavaScript", "PHP (MVC)", "MySQL"]
    }
  ],
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    score: "CGPA: 8.11",
    institution: "Babaria Institute of Technology, Varnama",
    period: "2011 – 2015"
  },
  languages: ["English", "Gujarati", "Hindi"],
  certifications: [
    { name: "Infosys Certified Angular Web Developer" },
    { name: "Infosys Certified PHP Associate" },
    { name: "Infosys Certified JavaScript Developer" },
    { name: "Infosys Certified Front End Web Developer" }
  ]
};
