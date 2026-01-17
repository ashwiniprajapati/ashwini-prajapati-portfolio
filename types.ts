
export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  techUsed: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  experiences: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  education: {
    degree: string;
    score: string;
    institution: string;
    period: string;
  };
  languages: string[];
  certifications: Certification[];
}
