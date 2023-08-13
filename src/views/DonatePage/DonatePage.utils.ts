export interface DonationPage {
  id: string;
  image: string;
  url: string;
  stats?: string;
  text: string;
  explicit?: boolean;
  goal: number;
}
export const DONATION_PAGES: DonationPage[] = [
  {
    id: 'jpwypz',
    image: 'jpwypz.jpg',
    url: 'https://zrzutka.pl/z/zdaj-se-jpwypz',
    stats: 'https://zrzutka.pl/z/zdaj-se-jpwypz+',
    text: 'Na wsparcie sforowych seniorów',
    explicit: false,
    goal: 5_000,
  },
  {
    id: 'cv7kpe',
    image: 'cv7kpe.jpg',
    url: 'https://zrzutka.pl/z/zdaj-se-cv7kpe',
    stats: 'https://zrzutka.pl/z/zdaj-se-cv7kpe+',
    text: 'Złamana łapka, rany po próbie zagryzienia',
    goal: 12_000,
    explicit: true,
  },
  {
    id: 'zca4wr',
    image: 'zca4wr.jpg',
    url: 'https://zrzutka.pl/z/zdaj-se-zca4wr',
    stats: 'https://zrzutka.pl/z/zdaj-se-zca4wr+',
    text: 'Kastracja i diagnostyka Kotów zabranych spod tirów',
    goal: 3_500,
  },
];
export const TOTAL_DONATED = 146;
export const DONATION_GOAL = 1337;
