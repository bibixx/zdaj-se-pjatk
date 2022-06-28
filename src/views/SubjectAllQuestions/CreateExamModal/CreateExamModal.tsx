import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { modalStyles } from './CreateExamModal.styles';

interface CreateExamModalProps {
  isOpen: boolean;
  subjectId: string;
  onClose: () => void;
}

export const CreateExamModal = ({
  isOpen,
  subjectId,
  onClose,
}: CreateExamModalProps) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState('10');
  const [percentage, setPercentage] = useState('');
  const history = useHistory();

  const parsedNumberOfQuestions = Number.parseInt(numberOfQuestions, 10);
  const parsedPercentage = Number.parseInt(percentage, 10);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (Number.isNaN(parsedNumberOfQuestions)) {
      return;
    }

    query.set('n', String(parsedNumberOfQuestions));

    if (!Number.isNaN(parsedPercentage)) {
      query.set('success', String(parsedPercentage));
    }

    history.push(`/${subjectId}/exam?${query.toString()}`);
  };

  const onCancel = () => {
    history.replace(`/${subjectId}`);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onCancel}>
      <Box sx={modalStyles}>
        <form onSubmit={onSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Parametry testu
          </Typography>
          <Box
            marginY={2}
            display="flex"
            flexDirection="column"
            style={{ gap: '16px' }}
          >
            <TextField
              id="outlined-basic"
              label="Ilość pytań"
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{
                min: 1,
                step: 1,
              }}
              autoFocus
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              value={numberOfQuestions}
            />
            <TextField
              id="outlined-basic"
              label="Procent do zdania (opcjonalne)"
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{
                min: 0,
                max: 100,
                step: 1,
              }}
              onChange={(e) => setPercentage(e.target.value)}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              value={percentage}
            />
          </Box>
          <Box display="flex" style={{ gap: '8px' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={Number.isNaN(parsedNumberOfQuestions)}
            >
              Wygeneruj
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              Anuluj
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
