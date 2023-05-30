import {
  Typography,
  Tooltip,
  makeStyles,
  IconButton,
  Checkbox,
  Button,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import SchoolIcon from '@material-ui/icons/School';

import { Subject } from 'validators/subjects';

import { UserContent } from 'components/UserContent/UserContent';
import { AddedByZdajSeIcon } from 'components/AddedByZdajSeIcon/AddedByZdajSeIcon';
import { useEditQuestionModalContext } from 'components/EditQuestionModal/EditQuestionModal.context';
import { Answer } from '../Answer/Answer';

interface Props {
  question: Subject['data'][number];
  subjectId: string;
  showCorrect?: boolean;
  showUserSelect?: boolean;
  disableUserSelect?: boolean;
  wasUserSelectCorrect?: boolean;
  hideEdit?: boolean;
  userAnswer?: boolean[];
  onAnswerPick?: (
    questionId: string,
    answerIndex: number,
    answerValue: boolean,
  ) => void;
  learntButtonData?: {
    onClick: (checked: boolean) => void;
    checked: boolean;
  };
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
  learntWrapper: {
    padding: '0',
    margin: '-0.125rem 0 -0.125rem 0.5rem',
    width: 'min-content',
  },
  learntCheckbox: {
    padding: '0 0 0 0.375rem',
    '&.MuiCheckbox-root': {
      color: green[700],
      background: 'transparent !important',
    },
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
  subjectId,
  userAnswer,
  showCorrect = false,
  showUserSelect = false,
  disableUserSelect = false,
  wasUserSelectCorrect = false,
  hideEdit = false,
  onAnswerPick,
  learntButtonData,
}: Props) => {
  const classes = useStyles();
  const { openModal } = useEditQuestionModalContext();

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
          <div style={{ display: 'flex', gap: 12 }}>
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
            {learntButtonData && (
              <Tooltip title="Oznacz jako nauczone" placement="bottom">
                <Button
                  fullWidth
                  component="label"
                  variant="outlined"
                  className={classes.learntWrapper}
                >
                  <SchoolIcon fontSize="small" />
                  <Checkbox
                    disableRipple
                    aria-label="Oznacz jako nauczone"
                    checked={learntButtonData.checked}
                    onChange={(e) => learntButtonData.onClick(e.target.checked)}
                    className={classes.learntCheckbox}
                  />
                </Button>
              </Tooltip>
            )}
            {!hideEdit && !added && (
              <Tooltip title="Edytuj pytanie" placement="bottom">
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                  }}
                >
                  <IconButton
                    color="default"
                    aria-label="Edytuj pytanie"
                    component="label"
                    onClick={() => openModal({ questionId, subjectId })}
                    style={{ position: 'absolute' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </div>
              </Tooltip>
            )}
          </div>
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
              userAnswer={userAnswer?.[i]}
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
