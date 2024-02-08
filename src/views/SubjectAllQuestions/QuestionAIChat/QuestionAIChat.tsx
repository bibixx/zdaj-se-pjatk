import { OpenAI } from 'openai';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Stream } from 'openai/streaming';
import { Loader2, RotateCcw, Sparkles } from 'lucide-react';
import { ValidationError } from 'yup';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { UserContent } from 'components/UserContent/UserContent';
import { Card } from 'components/ui/card';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from 'components/ui/tooltip';
import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import { assertExistence } from 'utils/assertExistence';
import { safeJSONParse } from 'utils/safeJSONParse';
import { Question } from 'validators/subjects';
import { aiSchema } from 'validators/ai';

import { Answer } from '../Answer/Answer';

import { QuestionAIAnswer } from './QuestionAIAnswer';

export const OPEN_AI_TOKEN = localStorage.getItem('openai-token');
export const IS_AI_ENABLED = OPEN_AI_TOKEN != null;

const PROMPT = `
Remember if you do a good job, you will get a reward and a nice tip.

Below you will get a question. Which of the answers (a, b, c, d...) are correct?
Please describe all of the answers.
For correct answers describe why they are correct.
In case an answer is incorrect, also explain why.

If you see code or SQL, wrap it in code block. Please make sure to use the correct language for the code block.
Output the response using markdown. Make sure to use double new lines to separate paragraphs.

Always use the same language for the output (explanation, headers, supporting text) as the question and answers given by the user!!
If the question is in English, answer in English. If the question is in Polish, answer in Polish.
For example the "Correct answers are **A** and **B**" should be written in Polish as "Poprawne odpowiedzi to **A** i **B**".

Make sure to include the JSON at the beginning between SOJ and EOJ.

At the beginning of the response you have to provide the indices (0-based) of the correct answers in a JSON object like this:
{ "correctAnswersIndex": [0, 1] }
The "correctAnswersIndex" array should only contain the number (not a, b, c, d...!) indexes of the correct answers (0-based). Eg. if the correct answers are A and B, the JSON should look like this: { "correctAnswers": [0, 1] } instead of { "correctAnswers": ["a", "b"] }.

Replace the <JSON Object> with the correct JSON object.

MOST IMPORTANT THING IN THE RESPONSE IS THE JSON OBJECT WITH THE CORRECT ANSWERS INDICES. THE REST OF THE RESPONSE IS NOT AS IMPORTANT. ALWAYS INCLUDE IT!!!

For the entire output use the following structure:

SOJ
<JSON Object>
EOJ

Poprawne odpowiedzi to **A** i **B**

## Poprawne odpowiedzi:

a) _Odpowiedź A_ — Wyjaśnienie

b) _Odpowiedź B_ — Wyjaśnienie


## Niepoprawne odpowiedzi:

c) _Odpowiedź C_ — Wyjaśnienie


    `;

interface QuestionAIChatDialogProps {
  isOpen: boolean;
  closeModal: () => void;
  question: Question;
}
export const QuestionAIChatDialog = ({ isOpen, closeModal, question }: QuestionAIChatDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(willBeOpen) => {
        if (!willBeOpen) {
          closeModal();
        }
      }}
    >
      <DialogContent className="sm:max-h-[90%] top-[1rem] sm:top-[5%] data-[state=closed]:slide-out-to-top-[0.5rem] data-[state=open]:slide-in-from-top-[0.5rem] sm:data-[state=closed]:slide-out-to-top-[5%] sm:data-[state=open]:slide-in-from-top-[5%] translate-y-0 overflow-auto lg:max-w-[900px] md:max-w-[700px] md:w-full">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles width="1.5rem" height="1.5rem" absoluteStrokeWidth />
            Sprawdź z AI
          </DialogTitle>
        </DialogHeader>
        <QuestionAIChat question={question} />
      </DialogContent>
    </Dialog>
  );
};

interface QuestionAIChatProps {
  question: Question;
}
export const QuestionAIChat = ({ question }: QuestionAIChatProps) => {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'working' | 'done'>('idle');
  const [aiCorrectAnswers, setAICorrectAnswers] = useState<number[] | null>(null);

  const currentStreamController = useRef<Stream<OpenAI.Chat.Completions.ChatCompletionChunk> | null>(null);

  const errorHandler = useErrorHandler();
  const runAICompletion = useCallback(async () => {
    try {
      assertExistence(OPEN_AI_TOKEN, 'OpenAI token is not set');

      const openai = new OpenAI({
        apiKey: OPEN_AI_TOKEN,
        dangerouslyAllowBrowser: true,
      });

      currentStreamController.current?.controller.abort();
      currentStreamController.current = null;

      if (status === 'working') {
        setStatus('done');
        return;
      }

      setStatus('working');
      setAICorrectAnswers(null);

      const answersString = question.answers
        .map((answer, index) => getLetterBasedOnIndex(index) + answer.answer)
        .join('\n');

      const promptQuestion = question.question + '\n' + answersString;

      setOutput('');
      const stream = await openai.chat.completions.create({
        // /*
        model: 'gpt-4-turbo-preview',
        /*/
        model: 'gpt-3.5-turbo-0125',
        //*/
        messages: [
          { role: 'system', content: PROMPT },
          { role: 'user', content: promptQuestion },
        ],
        temperature: 0.25,
        n: 1,
        stream: true,
      });

      currentStreamController.current = stream;

      let preamble = '';
      let isPreambleFinished = false;
      let fullOutput = '';

      streamLoop: for await (const chunk of stream) {
        for (const choice of chunk.choices) {
          if (choice.finish_reason === 'stop') {
            break streamLoop;
          }

          if (choice.finish_reason != null) {
            continue;
          }

          let chunkContent = choice.delta.content;
          if (chunkContent == null) {
            continue;
          }

          fullOutput += chunkContent;

          if (!isPreambleFinished) {
            preamble += chunkContent;
            if (preamble.includes('\nEOJ\n')) {
              isPreambleFinished = true;
              const preambleJSON = cleanupPreamble(preamble);
              setAICorrectAnswers(preambleJSON);
            }

            chunkContent = chunkContent.substring(chunkContent.lastIndexOf('EOJ'));
          }

          if (isPreambleFinished) {
            setOutput((o) => o + chunkContent);
          }
        }
      }

      if (!isPreambleFinished) {
        setOutput(fullOutput);
      }

      setStatus('done');
      console.log(fullOutput);
    } catch (error) {
      errorHandler(error);
    }
  }, [errorHandler, question.answers, question.question, status]);

  useEffect(function cleanupActiveStream() {
    return () => {
      currentStreamController.current?.controller.abort();
    };
  }, []);

  const tooltip = useMemo(() => {
    if (status === 'working') {
      return 'Przerwij';
    }

    if (status === 'done') {
      return 'Sprawdź ponownie';
    }

    return undefined;
  }, [status]);

  return (
    <div className="flex flex-col min-w-0 gap-4">
      <QuestionPreview question={question} aiCorrectAnswers={aiCorrectAnswers} />

      <Card className="relative shadow-none pr-2 sm:pr-4 pl-4 py-1 w-full bg-gradient-to-br from-green-50/50 to-green-200/50 min-h-[3.25rem]">
        {status === 'idle' && (
          <Button
            variant="default"
            size="sm"
            onClick={runAICompletion}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            Sprawdź
          </Button>
        )}

        {status !== 'idle' && (
          <Tooltip>
            <TooltipPortal>
              <TooltipContent>{tooltip}</TooltipContent>
            </TooltipPortal>
            <TooltipTrigger title={tooltip} asChild>
              <Button variant="outline" size="icon-sm" onClick={runAICompletion} className="absolute top-2 right-2">
                {status === 'working' && (
                  <Loader2 width="1rem" height="1rem" className="animate-spin" absoluteStrokeWidth />
                )}
                {status === 'done' && <RotateCcw width="1rem" height="1rem" absoluteStrokeWidth />}
              </Button>
            </TooltipTrigger>
          </Tooltip>
        )}

        <QuestionAIAnswer content={output} />
      </Card>
    </div>
  );
};

interface QuestionPreviewProps {
  question: Question;
  aiCorrectAnswers: number[] | null;
}
const QuestionPreview = ({ question, aiCorrectAnswers }: QuestionPreviewProps) => {
  return (
    <Card className="shadow-none">
      <header className="font-semibold flex-1 overflow-hidden w-full p-4">
        <UserContent isMarkdown={question.isMarkdown}>{question.question.trim().replace(/ - \(\d+\)/, '')}</UserContent>
      </header>
      <div className="w-full border-b" />
      <div>
        {question.answers.map((answer, i) => {
          return (
            <Fragment key={`${answer.answer}-${i}`}>
              {i > 0 && <div className="w-full border-b" />}
              <Answer
                answer={answer}
                showCorrect={false}
                userAnswer={aiCorrectAnswers?.includes(i) ?? false}
                showUserSelect={aiCorrectAnswers != null}
                disableUserSelect
                wasUserSelectCorrect
              />
            </Fragment>
          );
        })}
      </div>
    </Card>
  );
};

function getLetterBasedOnIndex(index: number) {
  const letter = String.fromCharCode(97 + (index % 26));
  const letterList = Math.floor(index / 26) > 0 ? String.fromCharCode(96 + Math.floor(index / 26)) + letter : letter;

  return `${letterList}) `;
}

function cleanupPreamble(preamble: string) {
  const preambleWithoutHeader = preamble.substring(preamble.indexOf('SOJ') + 3);
  const preambleWithoutFooter = preambleWithoutHeader.substring(0, preambleWithoutHeader.lastIndexOf('EOJ'));
  const preambleWithoutNewLines = preambleWithoutFooter.replace(/\n/g, '');
  const parsedPreamble = safeJSONParse(preambleWithoutNewLines);
  if (parsedPreamble == null) {
    return [];
  }

  try {
    return aiSchema.validateSync(parsedPreamble).correctAnswersIndex;
  } catch (error) {
    if (error instanceof ValidationError) {
      return [];
    }

    throw error;
  }
}
