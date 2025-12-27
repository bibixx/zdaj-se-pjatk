import { PostHogErrorBoundaryFallbackProps } from 'posthog-js/react';
import { useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from 'utils';
import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Button } from 'components/ui/button';

import styles from './ErrorBoundary.module.css';

export const ErrorBoundary = ({ error, componentStack }: PostHogErrorBoundaryFallbackProps) => {
  const [isFullStackVisible, setIsFullStackVisible] = useState(false);
  const overflowRef = useRef<HTMLDivElement | null>(null);

  const handleReset = () => {
    window.location.href = '/';
  };

  return (
    <PageWrapper className="h-[100dvh] flex flex-col align-center">
      <Header className="h-[68px]">
        <BreadCrumbs
          crumbs={[
            {
              content: <span className="whitespace-nowrap">Generatory 3.0</span>,
              id: 'root',
              to: '/',
              onClick: handleReset,
            },
            {
              content: 'Ups... Coś poszło nie tak',
            },
          ]}
        />
      </Header>

      <div className="flex justify-center flex-col items-center gap-4">
        <p className="text-center">
          Zostaliśmy już powiadomieni o błędzie i pracujemy nad jego naprawą. <br />
          Jeśli jednak chcesz go zgłosić,{' '}
          <a href="https://github.com/bibixx/zdaj-se-pjatk/issues/new" className="link">
            stwórz zgłoszenie na GitHubie
          </a>
          .
        </p>
      </div>

      <div
        ref={overflowRef}
        className={cn(
          'relative w-full rounded-sm shadow-sm text-red-800 bg-red-50 border border-red-200 my-6',
          !isFullStackVisible && 'max-h-[400px] overflow-hidden',
          isFullStackVisible && 'overflow-auto',
        )}
      >
        <pre
          className={cn(
            'inline-block p-4',
            !isFullStackVisible && 'h-full',
            !isFullStackVisible && styles.fadeOut,
            'font-mono text-sm font-semibold',
          )}
        >
          {String(error) + componentStack}
        </pre>
        <div className={cn('sticky left-1/2 bottom-4 mt-4 -translate-x-1/2 pointer-events-none flex justify-center')}>
          <Button
            className="pointer-events-auto"
            variant="destructive"
            onClick={() => {
              overflowRef.current?.scrollTo(0, 0);
              setIsFullStackVisible(!isFullStackVisible);
            }}
          >
            {!isFullStackVisible ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronUp className="w-4 h-4 mr-2" />}
            Pokaż {!isFullStackVisible ? 'więcej' : 'mniej'}
          </Button>
        </div>
      </div>
      <div className="flex-1"></div>
      <Footer />
    </PageWrapper>
  );
};
