export interface IQuestion {
  questionNumber: number;
  title: string;
  answerValue?: number;
  isError?: boolean;
}

export const QUESTION_INITIAL_STATE: IQuestion[] = [
  {
    questionNumber: 1,
    title: '1. Thinking about what my future will be like',
  },
  {
    questionNumber: 2,
    title: '2. Realizing that today’s choices shape my future',
  },
  {
    questionNumber: 3,
    title: '3. Preparing for the future',
  },
  {
    questionNumber: 4,
    title:
      '4. Becoming aware of the educational and vocational choices that I must make',
  },
  {
    questionNumber: 5,
    title: '5. Planning how to achieve my goals',
  },
  {
    questionNumber: 6,
    title: '6. Concerned about my career',
  },
  {
    questionNumber: 7,
    title: '7. Keeping upbeat',
  },
  {
    questionNumber: 8,
    title: '8. Making decisions by myself',
  },
  {
    questionNumber: 9,
    title: '9. Taking responsibility for my actions',
  },

  {
    questionNumber: 10,
    title: '10. Sticking up for my beliefs',
  },
  {
    questionNumber: 11,
    title: '11. Counting on myself',
  },
  {
    questionNumber: 12,
    title: '12. Doing what’s right for me',
  },
  {
    questionNumber: 13,
    title: '13. Exploring my surroundings',
  },
  {
    questionNumber: 14,
    title: '14. Looking for opportunities to grow as a person',
  },
  {
    questionNumber: 15,
    title: '15. Investigating options before making a choice',
  },
  {
    questionNumber: 16,
    title: '16. Observing different ways of doing things',
  },
  {
    questionNumber: 17,
    title: '17. Probing deeply into questions that I have',
  },
  {
    questionNumber: 18,
    title: '18. Becoming curious about new opportunities',
  },
  {
    questionNumber: 19,
    title: '19. Performing tasks efficiently',
  },
  {
    questionNumber: 20,
    title: '20. Taking care to do things well',
  },
  {
    questionNumber: 21,
    title: '21. Learning new skills',
  },
  {
    questionNumber: 22,
    title: '22. Working up to my ability',
  },

  {
    questionNumber: 23,
    title: '23. Overcoming obstacles',
  },
  {
    questionNumber: 24,
    title: '24. Solving problems',
  },
  {
    questionNumber: 25,
    title: '25. Becoming less self-centered',
  },
  {
    questionNumber: 26,
    title: '26. Acting friendly',
  },
  {
    questionNumber: 27,
    title: '27. Getting along with all kinds of people',
  },
  {
    questionNumber: 28,
    title: '28. Cooperating with others on group projects ',
  },
  {
    questionNumber: 29,
    title: '29. Playing my part on a team',
  },
  {
    questionNumber: 30,
    title: '30. Compromising with other people',
  },

  {
    questionNumber: 31,
    title: '31. Learning to be a good listener',
  },
  {
    questionNumber: 32,
    title: '32. Contributing to my community',
  },
  {
    questionNumber: 33,
    title: '33. Going along with the group',
  },
  {
    questionNumber: 34,
    title: '34. Sharing with others ',
  },
  {
    questionNumber: 35,
    title: '35. Hiding my true feelings for the good of the group ',
  },
];
