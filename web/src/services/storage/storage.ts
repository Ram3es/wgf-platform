const TOKEN_STORAGE_KEY = 'token';

export const SESSION_STORAGE = {
  caasQuestionList: 'caasQuestionList',
  caasCooperationQuestionList: 'caasCooperationQuestionList',
  quiz: 'quiz',
  quizItems: 'quizItems',
  currentPage: 'currentPage',
  results: 'results',
  isLatestAnswers: 'isLatestAnswers',
};

class StorageService {
  getUser() {
    throw new Error('Method not implemented.');
  }
  public getToken = () => {
    return (
      localStorage.getItem(TOKEN_STORAGE_KEY) ||
      sessionStorage.getItem(TOKEN_STORAGE_KEY)
    );
  };
  public setToken = (token: string, isRemember: boolean) => {
    return isRemember
      ? localStorage.setItem(TOKEN_STORAGE_KEY, token)
      : sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  };
  public removeToken = () => {
    return localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  public getQuizItems = (): IQuizItems => {
    const data = sessionStorage.getItem(SESSION_STORAGE.quizItems);
    return data ? JSON.parse(data) : null;
  };

  public getIsQuizLatestAnswers = (quizTitle: string): boolean | null => {
    const quizItems = this.getQuizItems();
    let data;

    switch (quizTitle) {
      case 'caas-quiz': {
        data = quizItems?.caas?.isLatestAnswers;
        break;
      }
      case 'caas-cooperation-quiz': {
        data = quizItems?.caasCooperation?.isLatestAnswers;
        break;
      }
    }

    return data || null;
  };

  public setIsQuizLatestAnswers = (data: boolean, quizTitle: string) => {
    const quizItems = this.getQuizItems();

    switch (quizTitle) {
      case 'caas-quiz': {
        const newDataCaas = {
          ...quizItems,
          caas: { ...quizItems?.caas, isLatestAnswers: data },
        };

        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newDataCaas)
        );
      }
      case 'caas-cooperation-quiz': {
        const newData = {
          ...quizItems,
          caasCooperation: {
            ...quizItems?.caasCooperation,
            isLatestAnswers: data,
          },
        };

        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      }
      default:
        return;
    }
  };

  public setQuestionList = (
    data: IQuestionListItem[] | [],
    quizTitle: string
  ) => {
    const quizItems = this.getQuizItems();

    switch (quizTitle) {
      case 'caas-quiz': {
        const newDataCaas = {
          ...quizItems,
          caas: { ...quizItems?.caas, questionList: data },
        };

        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newDataCaas)
        );
      }
      case 'caas-cooperation-quiz': {
        const newData = {
          ...quizItems,
          caasCooperation: {
            ...quizItems?.caasCooperation,
            questionList: data,
          },
        };

        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      }
      case 'career-canvas': {
        const newData = {
          ...quizItems,
          careerCanvas: {
            ...quizItems?.careerCanvas,
            questionList: data,
          },
        };

        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      }
      default:
        return;
    }
  };

  public getQuestionList = (quizTitle: string): IQuestionListItem[] | [] => {
    const quizItems = this.getQuizItems();
    let data;

    switch (quizTitle) {
      case 'caas-quiz': {
        data = quizItems?.caas?.questionList;
        break;
      }
      case 'caas-cooperation-quiz': {
        data = quizItems?.caasCooperation?.questionList;
        break;
      }
      case 'career-canvas': {
        data = quizItems?.careerCanvas?.questionList;
        break;
      }
    }

    return data && data.length >= 1 ? data : [];
  };

  public setQuiz = (data: IQuiz) => {
    return sessionStorage.setItem(SESSION_STORAGE.quiz, JSON.stringify(data));
  };

  public getQuiz = (): IQuiz | null => {
    const data = sessionStorage.getItem(SESSION_STORAGE.quiz);
    return data ? JSON.parse(data) : null;
  };

  public setCurrentPage = (data: number, quizTitle: string) => {
    const quizItems = this.getQuizItems();
    let newData;

    switch (quizTitle) {
      case 'caas-quiz': {
        newData = {
          ...quizItems,
          caas: { ...quizItems?.caas, currentPage: data },
        };
        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      }
      case 'caas-cooperation-quiz': {
        newData = {
          ...quizItems,
          caasCooperation: { ...quizItems?.caasCooperation, currentPage: data },
        };
        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      }
      default:
        return;
    }
  };

  public getCurrentPage = (quizTitle: string): number => {
    const quizItems = this.getQuizItems();
    let data;

    switch (quizTitle) {
      case 'caas-quiz': {
        data = quizItems?.caas?.currentPage;
        break;
      }
      case 'caas-cooperation-quiz': {
        data = quizItems?.caasCooperation?.currentPage;
        break;
      }
    }

    return data ? data : 1;
  };

  public clearStorage = () => {
    return localStorage.clear();
  };

  public clearSessionStorage = () => {
    return sessionStorage.clear();
  };
}

export const storageService = new StorageService();
