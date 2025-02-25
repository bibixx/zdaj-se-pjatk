import { Toast } from 'components/ui/use-toast';

export const CLOSED_ANNOUNCEMENTS_KEY = 'closed-announcements';

export const ANNOUNCEMENTS: Toast[] = [
  {
    htmlId: 'mykhi-closing-resolved',
    title: 'Zamknięcie mykhi 20 lutego',
    description: (
      <span>
        Wszystkie pliki dostępne są na{' '}
        <a href="https://github.com/bibixx/zdaj-se-pjatk-files" target="_blank" className="underline" rel="noreferrer">
          github.com/bibixx/zdaj-se-pjatk-files
        </a>
        . W ciągu najbliższych dni powinny się one też pojawić bezpośrednio na stronie zdaj.se.
      </span>
    ),
    variant: 'blue',
  },
];
