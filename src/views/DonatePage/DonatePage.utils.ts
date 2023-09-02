export const formatGoal = (goal: number) =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(goal);

export interface DonationPage {
  id: string;
  image: string;
  url: string;
  stats?: string;
  text: string;
  explicit?: boolean;
  description?: string;
}
export const DONATION_PAGES: DonationPage[] = [
  {
    id: 'amnesty',
    image: 'amnesty.jpg',
    url: 'https://www.amnesty.org/en/donate',
    text: 'Na rzecz wolności słowa',
    description:
      'Bez wolności słowa wszyscy jesteśmy zagrożeni. Pomóż nam rzucić wyzwanie potężnym i stanąć po stronie tych, którzy są uciskani.',
    explicit: false,
  },
  {
    id: 'cv7kpe',
    image: 'cv7kpe.jpg',
    url: 'https://zrzutka.pl/z/zdaj-se-cv7kpe',
    stats: 'https://zrzutka.pl/z/zdaj-se-cv7kpe+',
    text: 'Złamana łapka, rany po próbie zagryzienia',
    description: `Cel: ${formatGoal(12_000)}`,
    explicit: true,
  },
  {
    id: 'zca4wr',
    image: 'zca4wr.jpg',
    url: 'https://zrzutka.pl/z/zdaj-se-zca4wr',
    stats: 'https://zrzutka.pl/z/zdaj-se-zca4wr+',
    text: 'Kastracja i diagnostyka Kotów zabranych spod tirów',
    description: `Cel: ${formatGoal(3_500)}`,
  },
];
export const TOTAL_DONATED = 146;
export const DONATION_GOAL = 1337;
