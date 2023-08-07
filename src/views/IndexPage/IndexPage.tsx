import { Helmet } from 'react-helmet';
import { CircularProgress, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { ContentWrapper } from 'components/ContentWrapper/ContentWrapper';
import { Header } from 'components/Header/Header';

import { useIndexData } from 'hooks/useIndexData/useIndexData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table';
import { Button } from 'components/ui/button';
import { AnimalEmoji } from 'components/AnimalEmoji/AnimalEmoji';

const helmetHead = (
  <Helmet>
    <title>Generatory 3.0</title>
  </Helmet>
);

export const IndexPage = () => {
  const state = useIndexData();

  if (state.state === 'loading') {
    return (
      <>
        {helmetHead}
        <ContentWrapper noHeader>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </ContentWrapper>
      </>
    );
  }

  return (
    <>
      {helmetHead}
      <div className="px-2">
        <Header>
          <h1 className="text-2xl font-bold select-none">
            <span className="text-sky-500 dark:text-inherit">G</span>eneratory
            3.0
          </h1>
          <div className="flex-1" />
          <Button asChild size="icon" variant="outline">
            <RouterLink to="/donate" className="text-xl">
              <AnimalEmoji />
            </RouterLink>
          </Button>
        </Header>
      </div>
      <Table>
        <TableHeader>
          <TableRow hasHover={false}>
            <TableHead className="max-md:px-4">Przedmiot</TableHead>
            <TableHead className="text-right max-md:hidden">
              Ilość pytań
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.data.pages.map(({ title, id, questionsCount }) => {
            const url = `/${id}`;

            return (
              <TableRow key={id}>
                <TableCell to={url} className="max-md:px-4">
                  <strong className="font-bold">{id.toUpperCase()}</strong>
                  <span className="text-muted-foreground"> &bull; </span>
                  <span className="text-muted-foreground">{title}</span>
                </TableCell>
                <TableCell
                  to={url}
                  className="text-right text-xs text-muted-foreground max-md:hidden"
                >
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
