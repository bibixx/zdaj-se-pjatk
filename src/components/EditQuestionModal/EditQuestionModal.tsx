/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */
// import { Box, Link, CircularProgress } from '@material-ui/core';
import { useSubjectData } from 'hooks/useSubjectData/useSubjectData';
import { useFetch } from 'hooks/useFetch/useFetch';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Textarea } from 'components/ui/textarea';
import { Checkbox } from 'components/ui/checkbox';
import { Button } from 'components/ui/button';
import { useToast } from 'components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import { Copy, Loader2, Save } from 'lucide-react';
import { useEditQuestionModalContext } from './EditQuestionModal.context';
import { useForm, useSaveOverride } from './EditQuestionModal.hooks';
import { copyTextToClipboard } from './EditQuestionModal.utils';

import createPR2Src from './images/create-pr-2.png';
import createPRSrc from './images/create-pr.png';
import forkSrc from './images/fork.png';
import overwriteContentSrc from './images/overwrite-content.png';
import proposeChangeSrc from './images/propose-changes.png';
import pasteContentSrc from './images/paste-content.png';
import { OutputOverrideSubject } from './EditQuestionModal.types';

import './EditQuestionModal.css';

export const EditQuestionModal = () => {
  const { data, closeModal } = useEditQuestionModalContext();
  const isOpen = data != null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(willBeOpen) => {
        if (!willBeOpen) {
          closeModal();
        }
      }}
    >
      {data && (
        <DialogContent className="overflow-auto max-h-[800px] lg:max-w-[900px] md:max-w-[700px] md:w-full">
          <ModalContents
            questionId={data.questionId}
            subjectId={data.subjectId}
            closeModal={closeModal}
          />
        </DialogContent>
      )}
    </Dialog>
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
      <div className="flex h-[400px] w-full justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
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
    <DialogHeader>
      <DialogTitle>Edytuj pytanie</DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formState);
        }}
      >
        <div className="flex flex-col gap-2 py-4">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block"
            htmlFor="question"
          >
            Treść pytania
          </label>
          <Textarea
            name="question"
            id="question"
            value={formState.question}
            onChange={(e) => onQuestionChange(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              name="question-markdown"
              id="question-markdown"
              checked={formState.isMarkdown ?? false}
              onCheckedChange={(checked) => {
                if (checked === 'indeterminate') {
                  return;
                }

                onQuestionMarkdownChange(checked);
              }}
            />
            <label
              htmlFor="question-markdown"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Formatowanie markdown
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {formState.answers.map((a, i) => (
            <div
              className="flex flex-col gap-2 p-4 pt-3 rounded-lg border"
              // eslint-disable-next-line react/no-array-index-key
              key={i}
            >
              <div className="text-xl font-semibold tracking-tight mb-1">
                Odpowiedź nr. {i + 1}
              </div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block"
                htmlFor={`answer-${i}`}
              >
                Treść odpowiedzi
              </label>
              <Textarea
                name={`answer-${i}`}
                id={`answer-${i}`}
                value={a.answer ?? ''}
                onChange={(e) => onAnswerTextChange(e.target.value, i)}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  name={`answer-correct-${i}`}
                  id={`answer-correct-${i}`}
                  checked={a.correct ?? false}
                  onCheckedChange={(checked) => {
                    if (checked === 'indeterminate') {
                      return;
                    }

                    onAnswerCorrectChange(checked, i);
                  }}
                />
                <label
                  htmlFor={`answer-correct-${i}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Odpowiedź poprawna
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  name={`answer-markdown-${i}`}
                  id={`answer-markdown-${i}`}
                  checked={a.isMarkdown ?? false}
                  onCheckedChange={(checked) => {
                    if (checked === 'indeterminate') {
                      return;
                    }

                    onAnswerMarkdownChange(checked, i);
                  }}
                />
                <label
                  htmlFor={`answer-markdown-${i}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Formatowanie markdown
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit" variant="blue">
            <Save className="w-4 h-4 mr-2" />
            Zapisz
          </Button>
          <Button variant="outline" onClick={closeModal}>
            Anuluj
          </Button>
        </div>
      </form>
    </DialogHeader>
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
  const { toast } = useToast();

  const onCopy = () => {
    toast({
      variant: 'success',
      title: 'Skopiowano do schowka',
      duration: 2000,
      className: 'md:max-w-none w-auto',
    });

    copyTextToClipboard(overridesString);
  };

  const url = `https://github.com/bibixx/zdaj-se-pjatk-data/edit/master/overrides/${subjectId}.json`;
  return (
    <DialogHeader className="edit-question-modal">
      <DialogTitle>Jak przesłać poprawione pytanie?</DialogTitle>
      <ol>
        <li>
          Skopiuj poniższy JSON
          <div className="relative">
            <Tooltip>
              <TooltipContent>Skopuj do schowka</TooltipContent>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={onCopy}
                  className="absolute top-2 right-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
            </Tooltip>
            <pre>{overridesString}</pre>
          </div>
        </li>
        <li>
          Wejdź na{' '}
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </li>
        <li>W razie potrzeby zaloguj się na swoje konto GitHub</li>
        <li>
          Stwórz fork repozytorium{' '}
          <a
            href="https://github.com/bibixx/zdaj-se-pjatk-data"
            target="_blank"
            rel="noreferrer"
          >
            bibixx/zdaj-se-pjatk-data
          </a>{' '}
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
          <p className="text-lg font-semibold text-center mt-4 mb-4 border border-red-200 bg-red-100 text-red-900 py-3 rounded-md">
            🚨 Pull Request bez podania źródła zostanie zamknięty bez
            dopytywania 🚨
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
      <div className="flex gap-2">
        <Button variant="blue" onClick={onClose}>
          Zamknij
        </Button>
        <Button variant="outline" onClick={onGoBack}>
          Wróć
        </Button>
      </div>
    </DialogHeader>
  );
};

const NewResult = ({
  overridesString,
  subjectId,
  onClose,
  onGoBack,
}: ResultProps) => {
  const { toast } = useToast();

  const onCopy = () => {
    toast({
      variant: 'success',
      title: 'Skopiowano do schowka',
      duration: 2000,
      className: 'md:max-w-none w-auto',
    });

    copyTextToClipboard(overridesString);
  };

  const url = `https://github.com/bibixx/zdaj-se-pjatk-data/new/master/overrides/${subjectId}.json?filename=${subjectId}.json`;
  return (
    <DialogHeader className="edit-question-modal">
      <DialogTitle>Jak przesłać poprawione pytanie?</DialogTitle>
      <ol>
        <li>
          Skopiuj poniższy JSON
          <div className="relative">
            <Tooltip>
              <TooltipContent>Skopuj do schowka</TooltipContent>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={onCopy}
                  className="absolute top-2 right-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
            </Tooltip>
            <pre>{overridesString}</pre>
          </div>
        </li>
        <li>
          Wejdź na{' '}
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </li>
        <li>W razie potrzeby zaloguj się na swoje konto GitHub</li>
        <li>
          Stwórz fork repozytorium{' '}
          <a
            href="https://github.com/bibixx/zdaj-se-pjatk-data"
            target="_blank"
            rel="noreferrer"
          >
            bibixx/zdaj-se-pjatk-data
          </a>{' '}
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
        <li>
          Wypełnij tytuł, oraz opis Pull Requesta
          <p className="text-lg font-semibold text-center mt-4 mb-4 border border-red-200 bg-red-100 text-red-900 py-3 rounded-md">
            🚨 Pull Request bez podania źródła zostanie zamknięty bez
            dopytywania 🚨
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
      <div className="flex gap-2">
        <Button variant="blue" onClick={onClose}>
          Zamknij
        </Button>
        <Button variant="outline" onClick={onGoBack}>
          Wróć
        </Button>
      </div>
    </DialogHeader>
  );
};
