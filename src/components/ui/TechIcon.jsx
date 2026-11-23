import {
  SiCplusplus, SiPython, SiJavascript, SiHtml5, SiReact, SiTailwindcss, SiNodedotjs, SiExpress,
  SiMongodb, SiPostgresql, SiTensorflow, SiGit, SiGithub, SiDocker, SiPostman,
} from 'react-icons/si';
import { TbBrandCss3, TbBrandVscode, TbApi } from 'react-icons/tb';
import {
  Brain, Sparkles, MessagesSquare, DatabaseZap, CodeXml, LayoutTemplate, Server, Wrench,
  Bot, Network, Layers, Workflow, Cloud, GitBranch,
} from 'lucide-react';

/** key → [Icon, brand colour (null = inherit)] */
const MAP = {
  cpp: [SiCplusplus, '#00599C'],
  python: [SiPython, '#3776AB'],
  javascript: [SiJavascript, '#F7DF1E'],
  html: [SiHtml5, '#E34F26'],
  css: [TbBrandCss3, '#1572B6'],
  react: [SiReact, '#61DAFB'],
  tailwind: [SiTailwindcss, '#06B6D4'],
  node: [SiNodedotjs, '#5FA04E'],
  express: [SiExpress, null],
  api: [TbApi, null],
  mongodb: [SiMongodb, '#47A248'],
  postgres: [SiPostgresql, '#4169E1'],
  ml: [Brain, null],
  genai: [Sparkles, null],
  llm: [MessagesSquare, null],
  rag: [DatabaseZap, null],
  tensorflow: [SiTensorflow, '#FF6F00'],
  git: [SiGit, '#F05032'],
  github: [SiGithub, null],
  docker: [SiDocker, '#2496ED'],
  postman: [SiPostman, '#FF6C37'],
  vscode: [TbBrandVscode, '#2F80ED'],
  // category / misc
  code: [CodeXml, null],
  layout: [LayoutTemplate, null],
  server: [Server, null],
  brain: [Brain, null],
  wrench: [Wrench, null],
  sparkles: [Sparkles, null],
  bot: [Bot, null],
  network: [Network, null],
  layers: [Layers, null],
  workflow: [Workflow, null],
  cloud: [Cloud, null],
  gitbranch: [GitBranch, null],
};

export default function TechIcon({ name, size = 18, colored = false, className = '' }) {
  const [Icon, color] = MAP[name] ?? MAP.code;
  return (
    <Icon
      aria-hidden="true"
      size={size}
      className={className}
      style={colored && color ? { color } : undefined}
    />
  );
}
