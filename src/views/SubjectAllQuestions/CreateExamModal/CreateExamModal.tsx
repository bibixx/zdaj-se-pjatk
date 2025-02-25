import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'components/ui/dialog';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { Checkbox } from 'components/ui/checkbox';
import { examSearchParamsKeys } from 'views/Exam/Exam.utils';

interface CreateExamModalProps {
  isOpen: boolean;
  subjectId: string;
  onClose: () => void;
}

export const CreateExamModal = ({ isOpen, subjectId, onClose }: CreateExamModalProps) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState('10');
  const [percentage, setPercentage] = useState('');
  const [filterLearnt, setFilterLearnt] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setNumberOfQuestions('10');
      setPercentage('');
    }
  }, [isOpen]);

  const parsedNumberOfQuestions = Number.parseInt(numberOfQuestions, 10);
  const parsedPercentage = Number.parseInt(percentage, 10);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (Number.isNaN(parsedNumberOfQuestions)) {
      return;
    }

    query.set(examSearchParamsKeys.questionCount, String(parsedNumberOfQuestions));

    if (!Number.isNaN(parsedPercentage)) {
      query.set(examSearchParamsKeys.successThreshold, String(parsedPercentage));
    }

    query.set(examSearchParamsKeys.filterOutLearnt, String(filterLearnt));

    navigate(`/${subjectId}/exam?${query.toString()}`);
  };

  const onCancel = () => {
    navigate(`/${subjectId}`, { replace: true });
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(state) => {
        if (!state) {
          onCancel();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parametry testu</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block"
                htmlFor="number-of-questions"
              >
                Liczba pytań
              </label>
              <Input
                id="number-of-questions"
                value={numberOfQuestions}
                className="col-span-3"
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                type="number"
                min={1}
                step={1}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block"
                htmlFor="percentage"
              >
                Procent do zdania (opcjonalne)
              </label>
              <Input
                id="percentage"
                className="col-span-3"
                onChange={(e) => setPercentage(e.target.value)}
                value={percentage}
                type="number"
                min={0}
                max={100}
                step={1}
              />
            </div>
            <div className="flex items-center space-x-2 col-span-3">
              <Checkbox
                id="filterLearnt"
                checked={filterLearnt}
                onCheckedChange={(state) => {
                  if (state === 'indeterminate') {
                    return;
                  }

                  setFilterLearnt(state);
                }}
              />
              <Label htmlFor="filterLearnt">Pomiń pytania, na które już znasz odpowiedź</Label>
            </div>
          </div>
          <DialogFooter className="mt-2 sm:mt-0">
            <Button type="button" variant="outline" onClick={onCancel}>
              Anuluj
            </Button>
            <Button variant="blue" type="submit" disabled={Number.isNaN(parsedNumberOfQuestions)}>
              Wygeneruj
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
