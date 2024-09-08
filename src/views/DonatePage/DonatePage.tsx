import { useState } from 'react';
import { BarChart3, Eye, EyeOff } from 'lucide-react';
import { Helmet } from 'react-helmet';

import { cn } from 'utils';
import { Header } from 'components/Header/Header';
import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { Card, CardDescription, CardHeader } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from 'components/ui/tooltip';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';

import { DONATION_PAGES, DonationPage } from './DonatePage.utils';

export const DonatePage = () => (
  <>
    <Helmet>
      <title>Wspomóż | Generatory 3.0</title>
    </Helmet>
    <PageWrapper>
      <div className="pl-0 max-md:pl-2 pr-2 max-md:pr-4">
        <Header>
          <BreadCrumbs
            crumbs={[
              {
                content: <span className="whitespace-nowrap">Generatory 3.0</span>,
                id: 'root',
                to: '/',
              },
              {
                content: 'Wspomóż',
              },
            ]}
          />
        </Header>
      </div>
    </PageWrapper>
    <main className="px-4">
      <PageWrapper>
        <p>
          Zdaj.se <strong className="font-medium">zawsze</strong> będzie serwisem darmowym dzięki zastosowanym darmowym
          technologiom i serwisom:
        </p>
        <ul className="mb-4 mt-1 ml-6 list-disc [&>li]:mt-1">
          <li>
            Hosting:{' '}
            <a target="_blank" className="link" href="https://vercel.com/" rel="noreferrer">
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
              pliki JSON trzymane na GitHubie
            </a>{' '}
            i serwowane przez{' '}
            <a href="https://statically.io/" className="link" target="_blank" rel="noreferrer">
              statically.io
            </a>
          </li>
          <li>
            Domena: domenę zdaj.se opłacam z własnej kieszeni (61,99 zł/rok), jednak cała platforma dostępna jest też
            pod adresem{' '}
            <a className="link" href="https://zdaj-se.vercel.app">
              https://zdaj-se.vercel.app
            </a>
            , który dzięki Vercelowi jest utrzymywany za darmo
          </li>
        </ul>
        <p>
          Natomiast jeśli jednak chcesz wesprzeć to co robię, możesz wpłacić dowolną kwotę na jedną z poniższych
          zbiórek.
        </p>
      </PageWrapper>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap md:grid grid-cols-3 gap-3 my-2 sm:my-4">
          {DONATION_PAGES.map((page) => (
            <DonationCard page={page} key={page.id} />
          ))}
        </div>
      </div>
    </main>
  </>
);

interface DonationCardProps {
  page: DonationPage;
}
const DonationCard = ({ page }: DonationCardProps) => {
  const { text, image, explicit, description, url, stats } = page;
  const [explicitShown, setExplicitShown] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="hover:-translate-y-1 focus-visible:-translate-y-1 transition-transform group w-full"
      onMouseLeave={() => setExplicitShown(false)}
    >
      <Card className="overflow-hidden">
        <div
          className={cn('relative select-none border-b after:transition-opacity aspect-video overflow-hidden', {
            'after:top-0 after:bg-white/20 after:w-full after:h-full after:absolute': explicit,
            'after:opacity-0': explicitShown,
          })}
        >
          <img
            className={cn('transition-all select-none h-full w-full object-cover', {
              'blur-md': explicit,
              'blur-none': explicitShown,
            })}
            draggable="false"
            src={`/donate/${image}`}
            alt=""
          />
          {explicit && (
            <div className="absolute w-full h-full top-0 left-0 p-2 flex items-end justify-start z-10 transition-opacity sm:opacity-0 group-hover:opacity-100 pointer-events-none">
              <Tooltip delayDuration={50}>
                <TooltipPortal>
                  <TooltipContent>Uwaga! Drastyczne treści 😿</TooltipContent>
                </TooltipPortal>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setExplicitShown(!explicitShown);
                    }}
                    className="pointer-events-auto"
                  >
                    {explicitShown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </div>
          )}
          {stats && (
            <div className="absolute w-full h-full top-0 left-0 p-2 flex items-end justify-end z-10 transition-opacity sm:opacity-0 group-hover:opacity-100 pointer-events-none">
              <Tooltip delayDuration={50}>
                <TooltipPortal>
                  <TooltipContent>Nasze statystyki</TooltipContent>
                </TooltipPortal>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="pointer-events-auto" asChild>
                    <a href={stats} target="_blank" rel="noreferrer">
                      <BarChart3 className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </div>
          )}
        </div>
        <CardHeader>
          <h3 className="text-lg font-semibold leading-none tracking-tight text-wrap-balanced">{text}</h3>
          {description != null && <CardDescription className="text-pretty">{description}</CardDescription>}
        </CardHeader>
      </Card>
    </a>
  );
};
