export interface DonationPage {
  id: string;
  image: string;
  url: string;
  text: string;
  explicit?: boolean;
  goal: number;
}
export const DONATION_PAGES: DonationPage[] = [
  {
    id: 'brgkn3',
    image: 'brgkn3.jpeg',
    url: 'https://pomagam.pl/brgkn3',
    text: 'Na ratunek konającym',
    explicit: true,
    goal: 40_000,
  },
  {
    id: '7rm499',
    image: '7rm499.jpeg',
    url: 'https://pomagam.pl/7rm499',
    text: 'Walka o normalne życie źrebaka',
    goal: 35_000,
  },
  {
    id: 'sezon23',
    image: 'sezon23.jpeg',
    url: 'https://pomagam.pl/sezon23',
    text: 'KsB kontra Kryzys',
    goal: 50_000,
  },
];
export const TOTAL_DONATED = 128;
export const DONATION_GOAL = 1337;
