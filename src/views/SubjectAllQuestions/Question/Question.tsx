import { Typography, Tooltip, makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import { Subject } from 'validators/subjects';

import { Comments } from 'components/Comments/Comments';
import { UserContent } from 'components/UserContent/UserContent';
import { AddedByZdajSeIcon } from 'components/AddedByZdajSeIcon/AddedByZdajSeIcon';
import { Answer } from '../Answer/Answer';

interface Props {
  question: Subject['data'][number];
}

const useStyles = makeStyles({
  root: {
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1.5rem',
  },
  button: {
    textTransform: 'none',
  },
  questionHeader: {
    padding: '1rem',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  questionTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: '1.5rem',
    height: '1.5rem',
    marginLeft: '0.5rem',
  },
});

export const Question = ({
  question: { question, answers, comments, overwritten },
}: Props) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined">
      <header className={classes.questionHeader}>
        <Typography
          variant="h5"
          component="h2"
          className={classes.questionTextWrapper}
        >
          <UserContent>{question.trim().replace(/ - \(\d+\)/, '')}</UserContent>
          {overwritten && (
            <Tooltip
              title="Zedytowane przez zdaj.se"
              aria-label="Zedytowane przez zdaj.se"
              placement="bottom"
            >
              <AddedByZdajSeIcon className={classes.icon} />
            </Tooltip>
          )}
        </Typography>
      </header>
      <List disablePadding>
        {answers.map((answer, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Answer answer={answer} key={`${answer.answer}-${i}`} />
          );
        })}
        <Comments comments={comments} />
      </List>
    </Paper>
  );
};
