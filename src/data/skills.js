import {
  SiCloudflare,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

// Disusun dari profil GitHub dan repositori publik yang dipilih, bukan klaim level/lamanya pengalaman.
export const skills = [
  { name: 'TypeScript', icon: SiTypescript, group: 'Web' },
  { name: 'JavaScript', icon: SiJavascript, group: 'Web' },
  { name: 'React', icon: SiReact, group: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, group: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, group: 'Frontend' },
  { name: 'Node.js', icon: SiNodedotjs, group: 'Backend' },
  { name: 'Python', icon: SiPython, group: 'Data & ML' },
  { name: 'PostgreSQL', icon: SiPostgresql, group: 'Data' },
  { name: 'Cloudflare', icon: SiCloudflare, group: 'Deployment' },
]
