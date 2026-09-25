export interface SocialLinks {
  github?: string;
  telegram?: string;
}

export type MemberBadge = "MENTOR" | "LEADER" | "SUB-LEADER" | "MEMBER";
export type MemberCategory = "mentor" | "leader" | "sub-leader" | "member";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: MemberBadge;
  category: MemberCategory;
  image: string;
  links: SocialLinks;
}

export const MENTORS: TeamMember[] = [
  {
    id: "srorng-sokcheat",
    name: "SRORNG SOKCHEAT",
    role: "IT INSTRUCTOR",
    badge: "MENTOR",
    category: "mentor",
    image: "/images/team/sokcheat.jpg",
    links: {
      github: "https://github.com/Sokcheatsrorng",
      telegram: "https://t.me/Sokcheat_srorng",
    },
  },
];

export const TEAM_LEADERS: TeamMember[] = [
  {
    id: "men-senghak",
    name: "MEN SENGHAK",
    role: "JUNIOR DEVELOPER",
    badge: "LEADER",
    category: "leader",
    image: "/images/team/Men-Senghak.jpg",
    links: {
      github: "https://github.com/hak22-legit",
      telegram: "https://t.me/senghak00",
    },
  },
  {
    id: "san-sengthanu",
    name: "SAN SENGTHANU",
    role: "JUNIOR DEVELOPER",
    badge: "SUB-LEADER",
    category: "sub-leader",
    image: "/images/team/San-SengThanu.jpg",
    links: {
      github: "https://github.com/Thanu-san",
      telegram: "https://t.me/thanut4",
    },
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "cheakching-lyheng",
    name: "CHEAKCHING LYHENG",
    role: "JUNIOR DEVELOPER",
    badge: "MEMBER",
    category: "member",
    image: "/images/team/CheakChing-LyHeng.jpg",
    links: {
      github: "https://github.com/lyheng142",
      telegram: "https://t.me/cclh142",
    },
  },
  {
    id: "khoeurt-sokleap",
    name: "KHOEURT SOKLEAP",
    role: "JUNIOR DEVELOPER",
    badge: "MEMBER",
    category: "member",
    image: "/images/team/Khoeurt-Sokleap.jpg",
    links: {
      github: "https://github.com/Sokleap123",
      telegram: "https://t.me/Sokleap_khoeurt",
    },
  },
  {
    id: "seoung-reaksa",
    name: "SEOUNG REAKSA",
    role: "JUNIOR DEVELOPER",
    badge: "MEMBER",
    category: "member",
    image: "/images/team/Seoung-Reaksa.jpg",
    links: {
      github: "https://github.com/seungreaksa",
      telegram: "https://t.me/loenhert",
    },
  },
  {
    id: "lim-kunpheaktra",
    name: "LIM KUNPHEAKTRA",
    role: "JUNIOR DEVELOPER",
    badge: "MEMBER",
    category: "member",
    image: "/images/team/Lim-Kunpheaktra.jpg",
    links: {
      github: "https://github.com/kunpheaktralim-cloud",
      telegram: "https://t.me/Mattw0lf",
    },
  },
];

export const ALL_STUDENTS: TeamMember[] = [...TEAM_LEADERS, ...TEAM_MEMBERS];
export const ALL_PERSONNEL: TeamMember[] = [...MENTORS, ...ALL_STUDENTS];
