import { shallowEqual } from 'shallow-equal';
import { BadgeInfo, GraduationCap, Pencil, Sparkles } from 'lucide-react';
import { Fragment, memo, useState } from 'react';

import { UserContent } from 'components/UserContent/UserContent';
import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import { Checkbox } from 'components/ui/checkbox';
import { Comments } from 'components/Comments/Comments';
import { EditQuestionModal } from 'components/EditQuestionModal/EditQuestionModal';
import { joinJSX } from 'utils/joinJSX';
import { Subject } from 'validators/subjects';

import { Answer } from '../Answer/Answer';
import { QuestionAIChatDialog } from '../QuestionAIChat/QuestionAIChat';

type IsLearntProps =
  | {
      isLearnt: boolean;
      onLearntChange: (questionId: string, checked: boolean) => void;
    }
  | {
      isLearnt?: undefined;
    };

type QuestionProps = {
  question: Subject['data'][number];
  subjectId: string;
  hasHashLink?: boolean;
  showCorrect?: boolean;
  showUserSelect?: boolean;
  disableUserSelect?: boolean;
  wasUserSelectCorrect?: boolean;
  hideEdit?: boolean;
  userAnswer?: boolean[];
  onAnswerPick?: (questionId: string, answerIndex: number, answerValue: boolean) => void;
} & IsLearntProps;

export const Question = memo(
  ({
    question,
    subjectId,
    userAnswer,
    showCorrect = false,
    showUserSelect = false,
    disableUserSelect = false,
    wasUserSelectCorrect = false,
    hideEdit = false,
    hasHashLink = false,
    onAnswerPick,
    ...props
  }: QuestionProps) => {
    const {
      id: questionId,
      question: questionContents,
      answers,
      overwritten,
      added,
      isMarkdown,
      comments,
      contributors,
    } = question;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const showEdit = !hideEdit && !added;
    const hashId = `question-${questionId}`;
    const contributorsText = contributors.length > 0 ? <> przez {joinContributors(contributors)}</> : '';

    return (
      <>
        <Card className="relative group scroll-my-4" id={hashId}>
          {hasHashLink && (
            <a
              href={`#${hashId}`}
              className="group/link absolute block max-lg:hidden left-0 px-1.5 -translate-x-full opacity-0 group-hover:opacity-100 focus:opacity-100 h-full text-muted-foreground hover:text-blue-500 hover:dark:text-blue-400 focus:text-blue-500 focus:dark:text-blue-400 no-underline focus-visible:outline-none"
            >
              <span className="flex py-1 mt-3 w-8 justify-center items-center text-center group-focus-visible/link:ring-1 group-focus-visible/link:ring-ring rounded-sm">
                #
              </span>
            </a>
          )}
          <header className="p-4">
            <div className="flex justify-between items-start flex-col-reverse sm:flex-row gap-2 sm:gap-0">
              <div className="font-semibold flex-1 overflow-hidden w-full">
                <UserContent isMarkdown={isMarkdown}>{questionContents.trim().replace(/ - \(\d+\)/, '')}</UserContent>
              </div>
              <div className="flex w-full sm:flex-row flex-row-reverse justify-start sm:w-auto gap-2 sm:ml-2 sm:-my-1">
                <Tooltip>
                  <TooltipContent>Sprawdź z AI</TooltipContent>
                  <TooltipTrigger title="Zapytaj AI" asChild>
                    <Button variant="outline" size="icon-sm" onClick={() => setIsAiModalOpen(true)}>
                      <Sparkles width="1.25rem" height="1.25rem" absoluteStrokeWidth />
                    </Button>
                  </TooltipTrigger>
                </Tooltip>

                {props.isLearnt != null && (
                  <Tooltip>
                    <TooltipContent>Oznacz jako nauczone</TooltipContent>
                    <TooltipTrigger title="Oznacz jako nauczone" asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2 gap-2"
                        onClick={() => props.onLearntChange(questionId, !props.isLearnt)}
                      >
                        <GraduationCap width="1.25rem" height="1.25rem" absoluteStrokeWidth />
                        <Checkbox aria-label="Oznacz jako nauczone" checked={props.isLearnt} isStub />
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                )}
                {(overwritten || added || showEdit) && (
                  <div className="flex items-center">
                    {overwritten && (
                      <Tooltip>
                        <TooltipContent>Zedytowane na zdaj.se{contributorsText}</TooltipContent>
                        <TooltipTrigger className="cursor-default">
                          <div className="inline-flex items-center justify-center h-8 w-8">
                            <BadgeInfo
                              width="1.25rem"
                              height="1.25rem"
                              absoluteStrokeWidth
                              aria-label="Zedytowane na zdaj.se"
                            />
                          </div>
                        </TooltipTrigger>
                      </Tooltip>
                    )}
                    {added && contributors != null && (
                      <Tooltip>
                        <TooltipContent>Dodane na zdaj.se{contributorsText}</TooltipContent>
                        <TooltipTrigger className="cursor-default">
                          <div className="inline-flex items-center justify-center h-8 w-8">
                            <BadgeInfo
                              width="1.25rem"
                              height="1.25rem"
                              absoluteStrokeWidth
                              aria-label="Dodane na zdaj.se"
                            />
                          </div>
                        </TooltipTrigger>
                      </Tooltip>
                    )}
                    {showEdit && (
                      <Tooltip>
                        <TooltipContent>Edytuj</TooltipContent>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon-sm" onClick={() => setIsModalOpen(true)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
            </div>
          </header>
          <div className="w-full border-b" />
          <div>
            {answers.map((answer, i) => {
              return (
                <Fragment key={`${answer.answer}-${i}`}>
                  {i > 0 && <div className="w-full border-b" />}
                  <Answer
                    answer={answer}
                    showCorrect={showCorrect}
                    showUserSelect={showUserSelect}
                    userAnswer={userAnswer?.[i]}
                    disableUserSelect={disableUserSelect}
                    wasUserSelectCorrect={wasUserSelectCorrect}
                    onChange={(value) => onAnswerPick?.(questionId, i, value)}
                  />
                </Fragment>
              );
            })}
          </div>
          {comments.length > 0 && (
            <>
              <div className="w-full border-b-2" />
              <Comments comments={comments} />
            </>
          )}
        </Card>
        <EditQuestionModal
          question={question}
          subjectId={subjectId}
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
        <QuestionAIChatDialog isOpen={isAiModalOpen} closeModal={() => setIsAiModalOpen(false)} question={question} />
      </>
    );
  },
  shallowEqual,
);

interface ContributorWrapperProps {
  children: React.ReactNode;
}
const ContributorWrapper = ({ children }: ContributorWrapperProps) => (
  <strong className="text-blue-300 font-semibold dark:text-blue-400 dark:font-medium">{children}</strong>
);
const joinContributors = (contributors: string[]) => {
  if (contributors.length === 1) {
    return <ContributorWrapper>{contributors[0]}</ContributorWrapper>;
  }

  const allButLastContributors = contributors.slice(0, -1);
  return (
    <>
      {joinJSX(
        allButLastContributors.map((c) => <ContributorWrapper key={c}>{c}</ContributorWrapper>),
        ', ',
      )}{' '}
      oraz <ContributorWrapper>{contributors[contributors.length - 1]}</ContributorWrapper>
    </>
  );
};
