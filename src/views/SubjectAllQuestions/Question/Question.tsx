import { shallowEqual } from 'shallow-equal';
import { BadgeInfo, GraduationCap, Pencil } from 'lucide-react';
import { Fragment, memo, useState } from 'react';

import { UserContent } from 'components/UserContent/UserContent';
import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import { Checkbox } from 'components/ui/checkbox';
import { Comments } from 'components/Comments/Comments';
import { EditQuestionModal } from 'components/EditQuestionModal/EditQuestionModal';
import { Subject } from 'validators/subjects';

import { Answer } from '../Answer/Answer';

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
    onAnswerPick,
    ...props
  }: QuestionProps) => {
    const { id: questionId, question: questionContents, answers, overwritten, added, isMarkdown, comments } = question;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showEdit = !hideEdit && !added;

    return (
      <>
        <Card>
          <header className="p-4">
            <div className="flex justify-between items-start flex-col-reverse sm:flex-row gap-2 sm:gap-0">
              <div className="font-semibold flex-1 overflow-hidden w-full">
                <UserContent isMarkdown={isMarkdown}>{questionContents.trim().replace(/ - \(\d+\)/, '')}</UserContent>
              </div>
              <div className="flex w-full sm:flex-row flex-row-reverse justify-start sm:w-auto gap-2 sm:ml-2 sm:-my-1">
                {/* TODO Nested buttons */}
                {props.isLearnt != null && (
                  <Tooltip>
                    <TooltipContent>Oznacz jako nauczone</TooltipContent>
                    <TooltipTrigger title="Oznacz jako nauczone">
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2 gap-2"
                        onClick={() => props.onLearntChange(questionId, !props.isLearnt)}
                      >
                        <GraduationCap width="1.25rem" height="1.25rem" absoluteStrokeWidth />
                        <Checkbox aria-label="Oznacz jako nauczone" checked={props.isLearnt} />
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                )}
                {(overwritten || added || showEdit) && (
                  <div className="flex items-center">
                    {overwritten && (
                      <Tooltip>
                        <TooltipContent>Zedytowane przez zdaj.se</TooltipContent>
                        <TooltipTrigger className="cursor-default">
                          <div className="inline-flex items-center justify-center h-8 w-8">
                            <BadgeInfo
                              width="1.25rem"
                              height="1.25rem"
                              absoluteStrokeWidth
                              aria-label="Zedytowane przez zdaj.se"
                            />
                          </div>
                        </TooltipTrigger>
                      </Tooltip>
                    )}
                    {added && (
                      <Tooltip>
                        <TooltipContent>Dodane przez zdaj.se</TooltipContent>
                        <TooltipTrigger className="cursor-default">
                          <div className="inline-flex items-center justify-center h-8 w-8">
                            <BadgeInfo
                              width="1.25rem"
                              height="1.25rem"
                              absoluteStrokeWidth
                              aria-label="Dodane przez zdaj.se"
                            />
                          </div>
                        </TooltipTrigger>
                      </Tooltip>
                    )}
                    {showEdit && (
                      <Tooltip>
                        <TooltipContent>Edytuj</TooltipContent>
                        <TooltipTrigger>
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
      </>
    );
  },
  shallowEqual,
);
