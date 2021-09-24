const TOKEN_STORAGE_KEY = 'token';
const USER_STORAGE_KEY = 'user';

export const SESSION_STORAGE = {
  caasQuestionList: 'caasQuestionList',
  caasCooperationQuestionList: 'caasCooperationQuestionList',
  quiz: 'quiz',
  quizItems: 'quizItems',
  currentPage: 'currentPage',
  results: 'results',
};

class StorageService {
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

  public setUser = (data: IUser) => {
    return localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
  };

  public getUser = (): IUser | null => {
    const data = localStorage.getItem(USER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  };

  public getQuizItems = (): IQuizItems => {
    const data = sessionStorage.getItem(SESSION_STORAGE.quizItems);
    return data ? JSON.parse(data) : null;
  };

  public setQuizItems = (): IQuizItems => {
    const data = localStorage.getItem(SESSION_STORAGE.quizItems);
    return data ? JSON.parse(data) : null;
  };

  public setQuestionList = (data: IQuestionListItem[], quizTitle: string) => {
    const quizItems = this.getQuizItems();

    switch (quizTitle) {
      case 'caas-quiz':
        const newDataCaas = {
          ...quizItems,
          caas: { ...quizItems?.caas, questionList: data },
        };

        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newDataCaas)
        );
      case 'caas-cooperation-quiz':
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
      default:
        return;
    }
  };

  public getQuestionList = (quizTitle: string): IQuestionListItem[] | [] => {
    const quizItems = this.getQuizItems();
    let data;

    switch (quizTitle) {
      case 'caas-quiz':
        data = quizItems?.caas?.questionList;
        break;
      case 'caas-cooperation-quiz':
        data = quizItems?.caasCooperation?.questionList;
        break;
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
      case 'caas-quiz':
        newData = {
          ...quizItems,
          caas: { ...quizItems?.caas, currentPage: data },
        };
        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      case 'caas-cooperation-quiz':
        newData = {
          ...quizItems,
          caasCooperation: { ...quizItems?.caasCooperation, currentPage: data },
        };
        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      default:
        return;
    }
  };

  public getCurrentPage = (quizTitle: string): number => {
    const quizItems = this.getQuizItems();
    let data;

    switch (quizTitle) {
      case 'caas-quiz':
        data = quizItems?.caas?.currentPage;
        break;
      case 'caas-cooperation-quiz':
        data = quizItems?.caasCooperation?.currentPage;
        break;
    }

    return data ? data : 1;
  };

  public setResults = (data: IResults, quizTitle: string) => {
    const quizItems = this.getQuizItems();
    let newData;

    switch (quizTitle) {
      case 'caas-quiz':
        newData = {
          ...quizItems,
          caas: { ...quizItems?.caas, result: data },
        };
        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      case 'caas-cooperation-quiz':
        newData = {
          ...quizItems,
          caasCooperation: { ...quizItems?.caasCooperation, result: data },
        };
        return sessionStorage.setItem(
          SESSION_STORAGE.quizItems,
          JSON.stringify(newData)
        );
      default:
        return;
    }
  };

  public getResults = (quizTitle: string): IResults | null => {
    const quizItems = this.getQuizItems();
    let data;

    switch (quizTitle) {
      case 'caas-quiz':
        data = quizItems?.caas?.result;
        break;
      case 'caas-cooperation-quiz':
        data = quizItems?.caasCooperation?.result;
        break;
    }

    return data ? data : null;
  };

  public clearStorage = () => {
    return localStorage.clear();
  };

  public clearSessionStorage = () => {
    return sessionStorage.clear();
  };
}

export const storageService = new StorageService();
