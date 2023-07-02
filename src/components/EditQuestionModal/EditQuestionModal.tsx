/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Modal,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Link,
  CircularProgress,
} from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopy';
import { useSubjectData } from 'hooks/useSubjectData/useSubjectData';
import { useSnackbar } from 'notistack';
import { useFetch } from 'hooks/useFetch/useFetch';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import { useEditQuestionModalContext } from './EditQuestionModal.context';
import { useForm, useSaveOverride } from './EditQuestionModal.hooks';
import {
  modalStyles,
  useEditQuestionModalResultsStyles,
} from './EditQuestionModal.styles';
import { copyTextToClipboard } from './EditQuestionModal.utils';

import createPR2Src from './images/create-pr-2.png';
import createPRSrc from './images/create-pr.png';
import forkSrc from './images/fork.png';
import overwriteContentSrc from './images/overwrite-content.png';
import proposeChangeSrc from './images/propose-changes.png';
import pasteContentSrc from './images/paste-content.png';
import { OutputOverrideSubject } from './EditQuestionModal.types';

export const EditQuestionModal = () => {
  const { data, closeModal } = useEditQuestionModalContext();
  const isOpen = data != null;

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box sx={modalStyles}>
        {data && (
          <ModalContents
            questionId={data.questionId}
            subjectId={data.subjectId}
            closeModal={closeModal}
          />
        )}
      </Box>
    </Modal>
  );
};

interface ModalContentsProps {
  questionId: string;
  subjectId: string;
  closeModal: () => void;
}
function ModalContents({
  questionId,
  subjectId,
  closeModal,
}: ModalContentsProps) {
  const { data: anyOverrides, loading: overridesLoading } = useFetch(
    `overrides/${subjectId}.json`,
    yup.object({}),
  );
  const overrides = anyOverrides as OutputOverrideSubject | undefined;

  const subjectData = useSubjectData(subjectId);
  const question =
    subjectData.state === 'done'
      ? subjectData.data.data.find((q) => q.id === questionId)
      : undefined;

  const { onSave, overridesSubmitted, overridesString, onGoBack } =
    useSaveOverride({
      questionId,
      subjectId,
      overrides: overrides ?? null,
    });
  const {
    formState,
    onAnswerCorrectChange,
    onAnswerMarkdownChange,
    onAnswerTextChange,
    onQuestionChange,
    onQuestionMarkdownChange,
  } = useForm(question ?? null);

  const errorHandler = useErrorHandler();
  useEffect(() => {
    if (subjectData.state === 'done' && question == null) {
      errorHandler(new Error('Question for edit not found'));
    }
  }, [errorHandler, question, subjectData.state]);

  if (
    subjectData.state !== 'done' ||
    question === undefined ||
    formState == null ||
    overridesLoading
  ) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (overridesSubmitted === 'edit') {
    return (
      <EditResult
        subjectId={subjectId}
        overridesString={overridesString}
        onClose={closeModal}
        onGoBack={onGoBack}
      />
    );
  }

  if (overridesSubmitted === 'new') {
    return (
      <NewResult
        subjectId={subjectId}
        overridesString={overridesString}
        onClose={closeModal}
        onGoBack={onGoBack}
      />
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formState);
        }}
      >
        <Typography variant="h5">Edytuj Pytanie</Typography>
        <Box marginTop={2}>
          <TextField
            fullWidth
            label="Treść pytania"
            name="question"
            id="question"
            multiline
            maxRows={4}
            value={formState.question}
            onChange={(e) => onQuestionChange(e.target.value)}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                name="question-markdown"
                id="question-markdown"
                checked={formState.isMarkdown ?? false}
                onChange={(e) => onQuestionMarkdownChange(e.target.checked)}
              />
            }
            label="Formatowanie markdown"
          />
        </Box>
        <Box marginTop={2}>
          {formState.answers.map((a, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box marginBottom={2} key={i}>
              <Paper variant="outlined">
                <Box padding={2} sx={{ paddingBottom: 7 }}>
                  <Box marginBottom={1}>
                    <Typography variant="h6">Odpowiedź nr. {i + 1}</Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Treść odpowiedzi"
                    name={`answer-${i}`}
                    id={`answer-${i}`}
                    multiline
                    maxRows={4}
                    value={a.answer ?? ''}
                    onChange={(e) => onAnswerTextChange(e.target.value, i)}
                    required
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={`answer-correct-${i}`}
                        id={`answer-correct-${i}`}
                        checked={a.correct ?? false}
                        onChange={(e) =>
                          onAnswerCorrectChange(e.target.checked, i)
                        }
                      />
                    }
                    label="Odpowiedź poprawna"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={`answer-markdown-${i}`}
                        id={`answer-markdown-${i}`}
                        checked={a.isMarkdown ?? false}
                        onChange={(e) =>
                          onAnswerMarkdownChange(e.target.checked, i)
                        }
                      />
                    }
                    label="Formatowanie markdown"
                  />
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="submit" color="primary" variant="contained">
            Zapisz
          </Button>
          <Button type="submit" variant="outlined" onClick={closeModal}>
            Anuluj
          </Button>
        </div>
      </form>
    </div>
  );
}

interface ResultProps {
  overridesString: string;
  subjectId: string;
  onClose: () => void;
  onGoBack: () => void;
}
const EditResult = ({
  overridesString,
  subjectId,
  onClose,
  onGoBack,
}: ResultProps) => {
  const styles = useEditQuestionModalResultsStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onCopy = () => {
    enqueueSnackbar('Skopiowano do schowka', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
    });
    copyTextToClipboard(overridesString);
  };

  const url = `https://github.com/bibixx/zdaj-se-pjatk-data/edit/master/overrides/${subjectId}.json`;
  return (
    <div className={styles.result}>
      <Typography variant="h5">Jak przesłać poprawione pytanie?</Typography>
      <ol>
        <li>
          Skopiuj poniższy JSON
          <div className={styles.outputWrapper}>
            <div className={styles.copyButtonWrapper}>
              <Tooltip title="Skopuj do schowka" aria-label="Skopuj do schowka">
                <IconButton onClick={onCopy}>
                  <CopyIcon />
                </IconButton>
              </Tooltip>
            </div>
            <pre>{overridesString}</pre>
          </div>
        </li>
        <li>
          Wejdź na{' '}
          <Link href={url} target="_blank" rel="noreferrer">
            {url}
          </Link>
        </li>
        <li>W razie potrzeby zaloguj się na swoje konto GitHub</li>
        <li>
          Stwórz fork repozytorium{' '}
          <Link
            href="https://github.com/bibixx/zdaj-se-pjatk-data"
            target="_blank"
            rel="noreferrer"
          >
            bibixx/zdaj-se-pjatk-data
          </Link>{' '}
          poprzez naciśnięcie przycisku <em>Fork this repository</em>.
          <img src={forkSrc} alt="" />
        </li>
        <li>
          Nadpisz zawartość pliku skopiowanym JSONem
          <img src={overwriteContentSrc} alt="" />
        </li>
        <li>
          Naciśnij przycisk <em>Propose changes</em>
          <img src={proposeChangeSrc} alt="" />
        </li>
        <li>
          Naciśnij przycisk <em>Create pull request</em>
          <img src={createPRSrc} alt="" />
        </li>
        <li>
          Wypełnij tytuł, oraz opis Pull Requesta
          <p>
            <Typography variant="h6" component="div" align="center">
              🚨 Pull Request bez podania źródła zostanie zamknięty bez dalszych
              pytań 🚨
            </Typography>
          </p>
        </li>
        <li>
          Naciśnij przycisk <em>Create pull request</em>
          <img src={createPR2Src} alt="" />
        </li>
        <li>
          Udało się! Teraz poczekaj na review, a twoja zmiana wkrótce pojawi się
          na zdaj.se
        </li>
      </ol>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={onClose}
        >
          Zamknij
        </Button>
        <Button type="submit" variant="outlined" onClick={onGoBack}>
          Wróć
        </Button>
      </div>
    </div>
  );
};

const NewResult = ({
  overridesString,
  subjectId,
  onClose,
  onGoBack,
}: ResultProps) => {
  const styles = useEditQuestionModalResultsStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onCopy = () => {
    enqueueSnackbar('Skopiowano do schowka', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
    });
    copyTextToClipboard(overridesString);
  };

  const url = `https://github.com/bibixx/zdaj-se-pjatk-data/new/master/overrides/${subjectId}.json?filename=${subjectId}.json`;
  return (
    <div className={styles.result}>
      <Typography variant="h5">Jak przesłać poprawione pytanie?</Typography>
      <ol>
        <li>
          Skopiuj poniższy JSON
          <div className={styles.outputWrapper}>
            <div className={styles.copyButtonWrapper}>
              <Tooltip title="Skopuj do schowka" aria-label="Skopuj do schowka">
                <IconButton onClick={onCopy}>
                  <CopyIcon />
                </IconButton>
              </Tooltip>
            </div>
            <pre>{overridesString}</pre>
          </div>
        </li>
        <li>
          Wejdź na{' '}
          <Link href={url} target="_blank" rel="noreferrer">
            {url}
          </Link>
        </li>
        <li>W razie potrzeby zaloguj się na swoje konto GitHub</li>
        <li>
          Stwórz fork repozytorium{' '}
          <Link
            href="https://github.com/bibixx/zdaj-se-pjatk-data"
            target="_blank"
            rel="noreferrer"
          >
            bibixx/zdaj-se-pjatk-data
          </Link>{' '}
          poprzez naciśnięcie przycisku <em>Fork this repository</em>.
          <img src={forkSrc} alt="" />
        </li>
        <li>
          Wklej skopiowany JSON jako zawartość pliku
          <img src={pasteContentSrc} alt="" />
        </li>
        <li>
          Naciśnij przycisk <em>Propose changes</em>
          <img src={proposeChangeSrc} alt="" />
        </li>
        <li>
          Naciśnij przycisk <em>Create pull request</em>
          <img src={createPRSrc} alt="" />
        </li>
        <li>Wypełnij tytuł, oraz opis Pull Requestu</li>
        <li>
          Naciśnij przycisk <em>Create pull request</em>
          <img src={createPR2Src} alt="" />
        </li>
        <li>
          Udało się! Teraz poczekaj na review, a twoja zmiana wkrótce pojawi się
          na zdaj.se
        </li>
      </ol>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={onClose}
        >
          Zamknij
        </Button>
        <Button type="submit" variant="outlined" onClick={onGoBack}>
          Wróć
        </Button>
      </div>
    </div>
  );
};
