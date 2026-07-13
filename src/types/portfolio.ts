export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  iframeUrl: string
  githubUrl?: string
  thumbnail?: string
}

export interface KnowledgeArea {
  id: string
  title: string
  description: string
  icon: string
  subtopics: string[]
}

export interface Course {
  id: string
  title: string
  institution: string
  description: string
  certificateUrl?: string
}

export interface FormationItem {
  id: string
  title: string
  institution: string
  duration: string
  description: string
  competencies: string[]
  knowledgeAreaIds: string[]
  type: 'technical' | 'independent'
}

export interface Profile {
  name: string
  title: string
  tagline: string
  formation: FormationItem[]
  bio: string
  avatar?: string
  social: {
    github?: string
    linkedin?: string
    email?: string
  }
}
