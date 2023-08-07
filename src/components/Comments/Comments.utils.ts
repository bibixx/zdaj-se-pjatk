import { Question } from 'validators/subjects';

const parseDate = (dateTime: string) => {
  const [date, time] = dateTime.split(' ');
  const [day, month, year] = date.split('-').map((s) => Number.parseInt(s, 10));
  const [hour, minute, second] = time.split(':').map((s) => Number.parseInt(s, 10));

  return new Date(year, month, day, hour, minute, second);
};

export const getSortedComments = (comments: Question['comments']) =>
  comments.sort((a, b) => parseDate(a.date).valueOf() - parseDate(b.date).valueOf());

export const getCommentsAmount = (n: number) => {
  switch (n) {
    case 1: {
      return `${n} komentarz`;
    }
    case 2:
    case 3:
    case 4: {
      return `${n} komentarze`;
    }
    default: {
      return `${n} komentarzy`;
    }
  }
};
