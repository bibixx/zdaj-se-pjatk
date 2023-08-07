import { UserContent } from 'components/UserContent/UserContent';
import { Subject } from 'validators/subjects';
import { Checkbox } from 'components/ui/checkbox';
import { Button } from 'components/ui/button';
import { getUserSelectClassNames } from './Answer.utils';

interface Props {
  answer: Subject['data'][number]['answers'][number];
  userAnswer?: boolean;
  showCorrect: boolean;
  showUserSelect: boolean;
  disableUserSelect: boolean;
  wasUserSelectCorrect: boolean;
  onChange?: (value: boolean) => void;
}

export const Answer = ({
  answer: { answer, correct, isMarkdown },
  userAnswer,
  showCorrect,
  showUserSelect,
  disableUserSelect,
  wasUserSelectCorrect,
  onChange,
}: Props) => {
  const labelId = `checkbox-list-label-${answer}`;

  return (
    <div className="px-4 py-1 flex items-center">
      <div className="text-sm flex-1" id={labelId}>
        <UserContent isMarkdown={isMarkdown}>{answer}</UserContent>
      </div>
      <div className="flex ml-2">
        {showUserSelect && (
          // TODO: Nested button
          <Button
            size="icon-sm"
            variant="ghost"
            disabled={disableUserSelect}
            className="disabled:opacity-100"
            onClick={() => onChange?.(!userAnswer)}
          >
            <Checkbox
              aria-labelledby={labelId}
              className={getUserSelectClassNames(
                disableUserSelect,
                wasUserSelectCorrect,
              )}
              checked={userAnswer}
              color="primary"
            />
          </Button>
        )}
        {showCorrect && (
          <Button size="icon-sm" variant="ghost" disabled>
            <Checkbox
              tabIndex={-1}
              aria-labelledby={labelId}
              checked={correct}
            />
          </Button>
        )}
      </div>
    </div>
  );
};
