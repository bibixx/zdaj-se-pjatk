import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { MultilineText } from 'components/MultilineText/MultilineText';
import { Comment } from 'validators/subjects';

import { getSortedComments, getCommentsAmount } from './Comments.utils';
import { CommentHeader } from './CommentHeader/CommentHeader';

const useStyles = makeStyles({
  icon: {
    display: 'flex',
    alignItems: 'center',
    height: '2.625rem',
    marginLeft: '0.5rem',
  },
  commentsExpandButtonClickable: {
    cursor: 'pointer',
  },
});

interface Props {
  comments: Comment[];
}

export const Comments = ({ comments }: Props) => {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const data = comments !== null ? getSortedComments(comments) : [];
  const classes = useStyles();

  const disabled = data.length === 0;

  return (
    <>
      <Divider />
      <ListItem
        role={undefined}
        dense
        button={!disabled ? undefined : false}
        onClick={() => setCommentsVisible(!commentsVisible)}
        className={!disabled ? classes.commentsExpandButtonClickable : ''}
      >
        <ListItemText>{getCommentsAmount(data.length)}</ListItemText>
        <ListItemIcon>
          <div className={classes.icon}>
            {!disabled &&
              (commentsVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </div>
        </ListItemIcon>
      </ListItem>
      {commentsVisible && (
        <>
          <Divider />
          {data.map(({ author, comment, date, overwritten }) => (
            <React.Fragment key={comment}>
              <ListItem role={undefined} dense>
                <ListItemText>
                  <CommentHeader
                    author={author}
                    date={date}
                    overwritten={overwritten ?? false}
                  />
                  <Typography variant="body2">
                    <MultilineText>{comment}</MultilineText>
                  </Typography>
                </ListItemText>
              </ListItem>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};
