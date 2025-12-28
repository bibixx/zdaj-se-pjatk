export const formatGoal = (goal: number) =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(goal);

const getMaliBracia = (): DonationPage => {
  const now = new Date();
  const currentMonth = now.getMonth();

  if (currentMonth === 11) {
    return {
      id: 'malibracia-wigilia',
      image: 'malibracia-wigilia.jpg',
      url: 'https://www.podarujwigilie.pl/',
      text: 'Podaruj Wigilię samotnym seniorom',
      description:
        'Twoja darowizna dla Stowarzyszenia małych braci Ubogich pozwoli komuś w te Święta znów przełamać się opłatkiem z drugą osobą.',
    };
  }

  if (currentMonth >= 5 && currentMonth <= 7) {
    return {
      id: 'malibracia-wakacje',
      image: 'malibracia-wakacje.jpg',
      url: 'https://www.malibracia.org.pl/wakacje/index.html#puzzle-section',
      text: 'Dzień wakacji dla samotnych seniorów',
      description:
        'Samotni seniorzy często pozostają zamknięci w domach z powodu chorób lub lęku. „Wakacje jednego dnia” organizują dla nich krótkie wycieczki z wolontariuszami, oferując im chwilę wytchnienia poza domem.',
      explicit: false,
    };
  }

  return {
    id: 'malibracia',
    image: 'malibracia.jpg',
    url: 'https://www.malibracia.org.pl/wspieraj/index.html',
    text: 'Stowarzyszenie mali bracia Ubogich',
    description:
      'Pomóż walczyć z samotnością starszych osób, które każdego dnia zmagają się z ciszą i brakiem bliskości.',
    explicit: false,
  };
};

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
  getMaliBracia(),
];
