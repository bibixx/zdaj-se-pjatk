import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Comment } from '../types/comments';

const useStyles = makeStyles({
  icon: {
    display: 'flex',
    alignItems: 'center',
    height: '2.625rem',
    marginLeft: '0.5rem',
  },
});

const getCommentsAmount = (n: number) => {
  switch (n) {
    case 1: {
      return `${n} komentarz`;
    }
    case 2:
    case 3:
    case 4: {
      return `${n} komentarze`;
    }
    default: {
      return `${n} komentarzy`;
    }
  }
};

interface Props {
  comments: Comment[] | null;
}

export const Comments = ({ comments }: Props) => {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const data = comments !== null ? comments : [];
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
      >
        <ListItemText>{getCommentsAmount(data.length)}</ListItemText>
        <ListItemIcon>
          <div className={classes.icon}>
            {!disabled && (commentsVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </div>
        </ListItemIcon>
      </ListItem>
      {commentsVisible && (
        <>
          <Divider />
          {data.map(({ author, comment, date }) => (
            <React.Fragment key={comment}>
              <ListItem
                role={undefined}
                dense
              >
                <ListItemText>
                  <Typography color="textSecondary" variant="body2">
                    {author
                      .replace('~', '')
                      .replace(/@[\d.*]+$/, '')}
                    {' '}
                    |
                    {' '}
                    {date}

                  </Typography>
                  <Typography variant="body2">{comment}</Typography>
                </ListItemText>
              </ListItem>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};
