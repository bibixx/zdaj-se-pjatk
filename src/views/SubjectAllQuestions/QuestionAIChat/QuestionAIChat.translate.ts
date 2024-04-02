import { QuestionLanguageSchema } from 'validators/ai';

const POLISH_TOKENS = {
  and: 'i',
  joinWithAnd(list: string[]) {
    if (list.length === 1) {
      return list[0];
    }

    return list.slice(0, -1).join(', ') + ` ${POLISH_TOKENS.and} ` + list.slice(-1);
  },
  correctAnswers: `Poprawne odpowiedzi`,
  incorrectAnswers: `Niepoprawne odpowiedzi`,
  correctAnswers0: `Brak poprawnych odpowiedzi`,
  correctAnswers1: `Poprawna odpowiedź to`,
  correctAnswersMore: `Poprawne odpowiedzi to`,
  correctAnswersAre(answers: string[]) {
    if (answers.length === 0) {
      return POLISH_TOKENS.correctAnswers0;
    }

    if (answers.length === 1) {
      return `${POLISH_TOKENS.correctAnswers1} ${answers[0]}`;
    }

    return `${POLISH_TOKENS.correctAnswersMore} ${POLISH_TOKENS.joinWithAnd(answers)}`;
  },
};
type Tokens = typeof POLISH_TOKENS;

const ENGLISH_TOKENS: Tokens = {
  and: 'and',
  joinWithAnd(list: string[]) {
    if (list.length === 1) {
      return list[0];
    }

    return [...list.slice(0, -1), `${ENGLISH_TOKENS.and} ` + list.at(-1)].join(', ');
  },
  correctAnswers: `Correct answers`,
  incorrectAnswers: `Incorrect answers`,
  correctAnswers0: `No correct answers`,
  correctAnswers1: `Correct answer is`,
  correctAnswersMore: `Correct answers are`,
  correctAnswersAre(answers: string[]) {
    if (answers.length === 0) {
      return ENGLISH_TOKENS.correctAnswers0;
    }

    if (answers.length === 1) {
      return `${ENGLISH_TOKENS.correctAnswers1} ${answers[0]}`;
    }

    return `${ENGLISH_TOKENS.correctAnswersMore} ${ENGLISH_TOKENS.joinWithAnd(answers)}`;
  },
};

export type Lang = QuestionLanguageSchema;
export const translateAiTokens = <K extends keyof Tokens>(key: K, lang: Lang): Tokens[K] => {
  if (lang === 'en') {
    return ENGLISH_TOKENS[key];
  }

  return POLISH_TOKENS[key];
};
