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

export interface Profile {
  name: string
  title: string
  tagline: string
  bio: string
  avatar?: string
  social: {
    github?: string
    linkedin?: string
    email?: string
  }
}
