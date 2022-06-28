import { Typography, Tooltip, makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import { Subject } from 'validators/subjects';

import { UserContent } from 'components/UserContent/UserContent';
import { AddedByZdajSeIcon } from 'components/AddedByZdajSeIcon/AddedByZdajSeIcon';
import { Answer } from '../Answer/Answer';

interface Props {
  question: Subject['data'][number];
  showCorrect?: boolean;
  showUserSelect?: boolean;
  disableUserSelect?: boolean;
  wasUserSelectCorrect?: boolean;
  onAnswerPick?: (
    questionId: string,
    answerIndex: number,
    answerValue: boolean,
  ) => void;
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  icon: {
    width: '1.5rem',
    height: '1.5rem',
    marginLeft: '0.5rem',
  },
});

export const Question = ({
  question: {
    id: questionId,
    question,
    answers,
    overwritten,
    added,
    isMarkdown,
  },
  showCorrect = false,
  showUserSelect = false,
  disableUserSelect = false,
  wasUserSelectCorrect = false,
  onAnswerPick,
}: Props) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined">
      <header className={classes.questionHeader}>
        <Typography
          variant="body1"
          component="h2"
          className={classes.questionTextWrapper}
        >
          <UserContent isMarkdown={isMarkdown}>
            {question.trim().replace(/ - \(\d+\)/, '')}
          </UserContent>
          {overwritten && (
            <Tooltip
              title="Zedytowane przez zdaj.se"
              aria-label="Zedytowane przez zdaj.se"
              placement="bottom"
            >
              <AddedByZdajSeIcon className={classes.icon} />
            </Tooltip>
          )}
          {added && (
            <Tooltip
              title="Dodane przez zdaj.se"
              aria-label="Dodane przez zdaj.se"
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
            <Answer
              answer={answer}
              // eslint-disable-next-line react/no-array-index-key
              key={`${answer.answer}-${i}`}
              showCorrect={showCorrect}
              showUserSelect={showUserSelect}
              disableUserSelect={disableUserSelect}
              wasUserSelectCorrect={wasUserSelectCorrect}
              onChange={(value) => onAnswerPick?.(questionId, i, value)}
            />
          );
        })}
      </List>
    </Paper>
  );
};
