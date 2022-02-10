/* eslint-disable react/no-danger */

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider, Box } from '@material-ui/core';

import { UserContent } from 'components/UserContent/UserContent';
import { Subject } from 'validators/subjects';

interface Props {
  answer: Subject['data'][number]['answers'][number];
}

export const Answer = ({ answer: { answer, correct, isMarkdown } }: Props) => {
  const labelId = `checkbox-list-label-${answer}`;

  return (
    // eslint-disable-next-line react/no-array-index-key
    <>
      <Divider />
      <ListItem role={undefined} dense>
        <ListItemText
          id={labelId}
          primary={
            <Box>
              <UserContent isMarkdown={isMarkdown}>{answer}</UserContent>
            </Box>
          }
        />
        <ListItemIcon>
          <Checkbox
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            checked={correct}
            disabled
          />
        </ListItemIcon>
      </ListItem>
    </>
  );
};
