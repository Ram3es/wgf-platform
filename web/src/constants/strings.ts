import { createLink, createLinkList } from './links';

import { LINKS } from '@constants/links';

export const STRINGS = {
  altLogo: 'logo',
  banner: {
    title: 'CareerFlex',
    text: [
      'With rapid changes sweeping the world of work, do you have what it takes to stay relevant and benefit from the opportunities that are all around?',
      'Building on decades of research, this CareerFlex quiz helps you identify your career adaptability superpowers, and shows you how you could flex your career, bringing it to the next level.',
    ],
    titleResult: 'Quiz Overview',
  },
  form: {
    title: 'This is the assessment for',
    label: 'To begin, please enter',
  },
  popUp: {
    radioWrapperLabel: '*Are you a student or working professional?',
    title: 'Keeping You Informed',
    text: `By giving your consent, you agree to our ${createLink(
      LINKS.privacyPolicy.href,
      LINKS.privacyPolicy.label
    )} and ${createLink(LINKS.termsOfUse.href, LINKS.termsOfUse.label)}
    `,
    checkbox:
      'Yes! I want to receive exclusive events, tips and information regarding career design from Wit Grit Fit.',
  },
  questionListText:
    'Please rate how strongly you have developed each of the following abilities using the scale below.',
  nextSteps: {
    title: 'Your Next Steps',
    levelMessage: {
      low: 'Growth opportunity right here:',
      moderate: 'Keep going!',
      high: 'That’s great!',
    },
    score: 'You Scored',
    span: 'as an',
    categories: {
      concern: {
        title: 'Optimistic Planner',
        description: [
          `<b>Optimistic Planners</b> realize that their choices today shape their future.  To grow in this area, do consider what educational and career choices are ahead of you and work out how to make the most of these.  There are also often career guidance services that could be helpful.  If you are a Singapore resident, you can visit ${createLink(
            LINKS.careersConnect.href,
            LINKS.careersConnect.label
          )} by WSG to access helpful career services. `,
          `You may also want to consider taking part in a ${createLink(
            LINKS.careerDesignWorkshop.href,
            LINKS.careerDesignWorkshop.label
          )}.`,
        ],
      },
      control: {
        title: 'Responsible Shaper',
        description: [
          '<b>Responsible Shapers</b> take ownership of their careers and make wise decisions to control it.  To develop in this area, you need to first recognize that the decisions you make can positively or negatively influence your career - and take responsibility for them.  You can start by being clear about your personal values and improving your ability to make good decisions.',
          `The ${createLink(
            LINKS.careerDesignCanvas.href,
            LINKS.careerDesignCanvas.label
          )} by Avid Adventures can help you understand your preferences and interests better.`,
        ],
      },
      curiosity: {
        title: 'Inquisitive Explorer',
        description: [
          '<b>Inquisitive Explorers</b> are curious about new opportunities and always looking for ways to grow.  To expand your expertise in this area, you can start by observing how different people or industries do things differently. By probing more deeply into the questions you have about yourself and your current or prospective jobs, you could discover exciting new options.',
          `Apart from the ${createLink(
            LINKS.careerDesignCanvas.href,
            LINKS.careerDesignCanvas.label
          )}, the free ${createLink(
            LINKS.careerAdventure.href,
            LINKS.careerAdventure.label
          )} by Avid Adventures can give you a better idea on what skill sets are required for jobs you are interested in.`,
        ],
      },
      confidence: {
        title: 'Capable Overcomer',
        description: [
          `<b>Capable Overcomers</b> are confident about their career abilities. They invest in upskilling themselves and doing the best job they can everyday.  To grow in your problem solving skills at work, a ${createLink(
            LINKS.growthMindset.href,
            LINKS.growthMindset.label
          )} is essential.  From there, you will have to work on identifying the issues, understanding everybody’s interests and having the right technical and soft skills to find the solutions.`,
          `Our free ${createLink(
            LINKS.careerAdventure.href,
            LINKS.careerAdventure.label
          )} by Avid Adventures will direct you to relevant courses curated by SkillsFuture Singapore.`,
        ],
      },
      cooperation: {
        title: 'Social Collaborator',
        description: [
          `<b>Social Collaborators</b> are great team players who are able to advance their careers by cooperating well with others. You can continue to develop your skills in this area by adopting an ${createLink(
            LINKS.abundanceMindset.href,
            LINKS.abundanceMindset.label
          )} and by pro-actively looking for opportunities to contribute your expertise. Developing a strong personal brand also helps you attract good collaborators in interest areas.`,
          `Follow us on ${createLink(
            LINKS.linkedin.href,
            LINKS.linkedin.label
          )} or ${createLink(
            LINKS.facebook.href,
            LINKS.facebook.label
          )} to tap into Avid Adventure’s social networks.`,
        ],
      },
    },
  },

  resultPage: {
    userTitle: 'Hello',
    resourcesTextBlock: {
      title: 'Resources and References',
      textList: [
        `SkillsFuture Singapore has identified a set of skills for ${createLink(
          LINKS.stayingRelevant.href,
          LINKS.stayingRelevant.label
        )}. Click on the links below to read more:
        <ul class="resources-list">
          ${createLinkList(LINKS.resourcesPdf)}
        </ul>`,
        `You may also want to read more regarding ${createLink(
          LINKS.criticalCoreSkills.href,
          LINKS.criticalCoreSkills.label
        )} and why they are so important.`,
        'CareerFlex is adapted from the Career Adapt-Abilities Scale (CAAS) pioneered by Professors Mark Savickas and Erik Profeli.',
      ],
    },
    quickSummaryTextBlock: {
      title: 'Quick Summary',
      headingTitle: 'If you are a(n):',
    },
  },

  resultSummary: {
    title: 'Your Career Adaptability At a Glance',
    score: 'Score',
    superPower: 'Superpower: ',
  },

  signIn: {
    title: 'Welcome Back!',
    label: 'Please log in to your account.',
    notMember: 'Not a member?',
    socialSignIn: 'or sign in with',
    checkRemember: 'Remember me?',
  },

  signUp: {
    title: 'Let’s Get Started!',
    label: 'Let’s set up your account.',
  },

  resetPassword: {
    title: 'Reset Password',
    label:
      'Enter your email address below and we will send you further instruction on how to reset your password.',
  },

  updatePassword: {
    title: 'Update Password',
    label: 'Enter your new password.',
  },

  button: {
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    cancel: 'Cancel',
    print: 'Print',
    result: 'See Results',
    quizCaas: 'Go to CAAS Quiz',
    quizCooperation: 'Go to CAAS+Cooperation Quiz',
    logOut: 'Log Out',
    logIn: 'Log In',
    signIn: 'Sign In',
    signUp: 'Create Account',
    signUpNow: 'Sign up now',
    forgetPassword: 'Forget Password',
    returnSignIn: 'Go to Sign In',
    resetPassword: 'Reset Password',
    updatePassword: 'Update Password',
  },

  input: {
    email: '* Email',
    password: '* Password',
    currentPassword: '* Current Password',
    newPassword: '* New Password',
    confirmPassword: '* Confirm Password',
    firstName: '* First Name',
    lastName: '* Last Name',
  },

  mainPage: {
    title: 'WIT GRIT FIT is a new way of approaching careers.',
    bannerText: [
      'We curate an ever-expanding suite of career tools, workshops and resources to help students and working professionals discover their life purpose and build career resilience. In an approachable, gamified way.',
      'Working with governments, businesses and schools, we leverage the power of design and technology to bring the best in career development practice to all. At scale.',
    ],
  },
};
