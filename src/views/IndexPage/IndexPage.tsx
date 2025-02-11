import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';

import { Header } from 'components/Header/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { Button } from 'components/ui/button';
import { AnimalEmoji } from 'components/AnimalEmoji/AnimalEmoji';
import { useIndexData } from 'hooks/useIndexData/useIndexData';

import { IndexPageSkeletonRows } from './IndexPageSkeleton';

const helmetHead = (
  <Helmet>
    <title>Generatory 3.0</title>
  </Helmet>
);

export const IndexPage = () => {
  const state = useIndexData();

  const header = (
    <div className="px-2 max-md:px-4">
      <Header>
        <h1 className="text-2xl font-bold select-none">
          <span className="text-blue-500 dark:text-inherit">G</span>
          eneratory 3.0
        </h1>
        <div className="flex-1" />
        <Button asChild size="icon" variant="outline">
          <RouterLink to="/donate" className="text-xl">
            <AnimalEmoji />
            <span className="sr-only">Wspomóż</span>
          </RouterLink>
        </Button>
      </Header>
    </div>
  );

  if (state.state === 'loading') {
    return (
      <>
        {helmetHead}
        {header}
        <Table>
          <TableHeader>
            <TableRow hasHover={false}>
              <TableHead className="max-md:pl-4">Przedmiot</TableHead>
              <TableHead className="text-right max-md:hidden w-24">Ilość pytań</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <IndexPageSkeletonRows />
          </TableBody>
        </Table>
      </>
    );
  }

  return (
    <>
      {helmetHead}
      {header}
      <Table>
        <TableHeader>
          <TableRow hasHover={false}>
            <TableHead className="max-md:pl-4">Przedmiot</TableHead>
            <TableHead className="text-right max-md:hidden w-24">Ilość pytań</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.data.pages.map(({ title, id, questionsCount }) => {
            const url = `/${id}`;

            return (
              <TableRow key={id}>
                <TableCell to={url} className="max-md:px-2">
                  <strong className="font-bold">{id.toUpperCase()}</strong>
                  <span className="text-muted-foreground"> &bull; </span>
                  <span className="text-muted-foreground">{title}</span>
                </TableCell>
                <TableCell to={url} className="text-right text-xs text-muted-foreground max-md:hidden">
                  {questionsCount}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
