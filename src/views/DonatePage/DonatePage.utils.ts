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
    id: 'paluch',
    image: 'paluch.jpg',
    url: 'https://napaluchu.waw.pl/elementor-2754/',
    text: 'Schronisko Na Paluchu',
    description:
      'Schronisko zapewnia bezdomnym zwierzętom opiekę, leczenie i szansę na znalezienie nowego domu. To przystanek na ich trudnej drodze życia, gdzie otrzymują drugą szansę.',
  },
  {
    id: 'malibracia',
    image: 'malibracia.jpg',
    url: 'https://www.malibracia.org.pl/wakacje/index.html#puzzle-section',
    text: 'Ufunduj spotkanie świąteczne dla samotnego seniora',
    description:
      'Samotni seniorzy często spędzają Święta w ciszy i zapomnieniu. Inicjatywa organizuje świąteczne spotkania w 13 miastach oraz odwiedziny w domach, aby zapewnić im ciepło i towarzystwo. Dzięki wsparciu, możemy sprawić, że dla tych osób wydarzy się świąteczny cud.',
    explicit: false,
  },
];
