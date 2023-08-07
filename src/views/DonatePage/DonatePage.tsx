import { useState } from 'react';
import { Header } from 'components/Header/Header';

import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { Card, CardDescription, CardHeader } from 'components/ui/card';
import { cn } from 'utils';
import { Button } from 'components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import {
  TOTAL_DONATED,
  DONATION_PAGES,
  DonationPage,
  DONATION_GOAL,
} from './DonatePage.utils';

export const DonatePage = () => (
  <>
    <Header>
      <BreadCrumbs
        crumbs={[
          {
            content: 'Generatory 3.0',
            to: '/',
          },
          {
            content: 'Wspomóż',
          },
        ]}
      />
    </Header>
    <main className="px-2">
      <p>
        Zdaj.se <strong className="font-medium">zawsze</strong> będzie serwisem
        darmowym dzięki zastosowanym darmowym technologiom i serwisom:
      </p>
      <ul className="mb-4 mt-1 ml-6 list-disc [&>li]:mt-1">
        <li>
          Hosting:{' '}
          <a
            target="_blank"
            className="link"
            href="https://vercel.com/"
            rel="noreferrer"
          >
            vercel.com
          </a>
        </li>
        <li>
          Baza danych:{' '}
          <a
            className="link"
            target="_blank"
            href="https://bibixx.github.io/zdaj-se-pjatk-data/index.json"
            rel="noreferrer"
          >
            pliki JSON na GitHub Pages
          </a>
        </li>
        <li>
          Domena: domenę zdaj.se opłacam z własnej kieszeni (61,99 zł/rok),
          jednak cała platforma dostępna jest też pod adresem{' '}
          <a className="link" href="https://zdaj-se.vercel.app">
            https://zdaj-se.vercel.app
          </a>
          , który dzięki Vercelowi jest utrzymywany za darmo
        </li>
      </ul>
      <p>
        Natomiast jeśli jednak chcesz wesprzeć to co robię, możesz wpłacić
        dowolną kwotę na jedną z poniższych zbiórek.
      </p>

      <h2 className="text-2xl font-semibold mt-2 text-center ">
        <span className="tracking-tight">Razem zebraliśmy: </span>
        <span className="text-blue-500 dark:text-blue-400">
          {formatGoal(TOTAL_DONATED)}&nbsp;/&nbsp;
          {formatGoal(DONATION_GOAL)}
        </span>
      </h2>

      <div className="grid grid-cols-3 gap-3 my-4 -mx-40">
        {DONATION_PAGES.map((page) => (
          <DonationCard page={page} key={page.id} />
        ))}
      </div>

      <p className="text-md text-center text-muted-foreground">
        Jako że pomagam.pl nie pozwala śledzić ile zostało wpłacone przez
        zdaj.se, przekaż maila z potwierdzeniem na&nbsp;
        <a href="donate@zdaj.se" className="link">
          donate@zdaj.se
        </a>{' '}
        bym mógł policzyć twoje wsparcie!
      </p>
    </main>
  </>
);

interface DonationCardProps {
  page: DonationPage;
}
const DonationCard = ({ page }: DonationCardProps) => {
  const { text, image, explicit, goal, url } = page;
  const [explicitShown, setExplicitShown] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="hover:-translate-y-1 focus-visible:-translate-y-1 transition-transform group"
      onMouseLeave={() => setExplicitShown(false)}
    >
      <Card className="overflow-hidden">
        <div
          className={cn(
            'relative select-none border-b after:transition-opacity aspect-video overflow-hidden',
            {
              'after:top-0 after:bg-white/20 after:w-full after:h-full after:absolute':
                explicit,
              'after:opacity-0': explicitShown,
            },
          )}
        >
          <img
            className={cn('transition-all select-none', {
              'blur-md': explicit,
              'blur-none': explicitShown,
            })}
            draggable="false"
            src={`/donate/${image}`}
            alt=""
          />
          {explicit && (
            <div className="absolute w-full h-full top-0 left-0 p-2 flex items-end justify-start z-10 transition-opacity opacity-0 group-hover:opacity-100">
              <Tooltip delayDuration={50}>
                <TooltipContent>Uwaga! Drastyczne treści 😿</TooltipContent>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setExplicitShown(!explicitShown);
                    }}
                  >
                    {explicitShown ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </div>
          )}
        </div>
        <CardHeader>
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {text}
          </h3>
          <CardDescription>Cel: {formatGoal(goal)}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
};

const formatGoal = (goal: number) =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(
    goal,
  );
