import { profile } from '../../data/profile'
import { Section } from '../layout/Section'

export function About() {
  return (
    <Section id="about" title="Sobre mí">
      <div
        style={{
          maxWidth: 700,
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          lineHeight: 1.8,
        }}
      >
        <p>{profile.bio}</p>
      </div>
    </Section>
  )
}
