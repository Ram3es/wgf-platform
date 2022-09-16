export const LINKS = {
  privacyPolicy: {
    label: 'Privacy Policy',
    href: 'https://witgritfit.com/privacy-policy/',
  },
  careersConnect: {
    label: 'Careers Connect',
    href: 'https://content.mycareersfuture.gov.sg/careercoaching/',
  },
  abundanceMindset: {
    label: 'abundance mindset',
    href: 'https://www.forbes.com/sites/carolinecastrillon/2020/07/12/5-ways-to-go-from-a-scarcity-to-abundance-mindset/',
  },
  growthMindset: {
    label: 'growth mindset',
    href: 'https://www.mindsethealth.com/matter/growth-vs-fixed-mindset',
  },
  criticalCoreSkills: {
    label: 'Critical Core Skills',
    href: 'https://www.myskillsfuture.gov.sg/content/portal/en/career-resources/career-resources/education-career-personal-development/Critical_Core_Skills_What_They_Are_And_Why_They_Matter.html',
  },
  termsOfUse: {
    label: 'Terms of Use',
    href: 'https://witgritfit.com/terms-of-use/',
  },
  careerDesignWorkshop: {
    label: 'Career Design Workshop',
    href: 'https://witgritfit.com/career-design-life-simulation-digital/',
  },
  careerDesignCanvas: {
    label: 'WIT GRIT FIT Career Design Canvas',
    href: 'https://platform.witgritfit.com/career-canvas/',
  },
  careerAdventure: {
    label: 'Career Adventure tools',
    href: 'https://witgritfit.com/my-career-adventure/',
  },
  linkedin: {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/company/witgritfit',
  },
  facebook: {
    label: 'Facebook',
    href: 'https://www.facebook.com/avidadventures',
  },
  stayingRelevant: {
    label: 'Staying Relevant',
    href: 'https://www.skillsfuture.gov.sg/skills-framework/criticalcoreskills',
  },
  resourcesPdf: [
    {
      label: 'Adaptability',
      href: 'https://www.skillsfuture.gov.sg/-/media/SkillsFuture/Files/Skills-Framework/Critical-Core-Skills/CCS-PDF-Ref-Docs/CCSAdaptabilityv70.pdf',
    },
    {
      label: 'Digital Fluency',
      href: 'https://www.skillsfuture.gov.sg/-/media/SkillsFuture/Files/Skills-Framework/Critical-Core-Skills/CCS-PDF-Ref-Docs/CCSDigital-Fluencyv70.pdf',
    },
    {
      label: 'Global Perspective',
      href: 'https://www.skillsfuture.gov.sg/-/media/SkillsFuture/Files/Skills-Framework/Critical-Core-Skills/CCS-PDF-Ref-Docs/CCSGlobal-Perspectivev70.pdf',
    },
    {
      label: 'Learning Agility',
      href: 'https://www.skillsfuture.gov.sg/-/media/SkillsFuture/Files/Skills-Framework/Critical-Core-Skills/CCS-PDF-Ref-Docs/CCSLearning-Agilityv70.pdf',
    },
    {
      label: 'Self Management',
      href: 'https://www.skillsfuture.gov.sg/-/media/SkillsFuture/Files/Skills-Framework/Critical-Core-Skills/CCS-PDF-Ref-Docs/CCSSelf-Managementv60.pdf',
    },
  ],
};

interface ILink {
  label: string;
  href: string;
}

export const createLink = (href: string, label: string): string => {
  return `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
};

export const createLinkList = (list: ILink[]) =>
  list.map(({ label, href }) => `<li>${createLink(href, label)}</li>`).join('');
