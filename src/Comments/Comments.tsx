import React, { useCallback, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Divider, TextField, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Comment } from '../types/comments';
import customFetch from '../utils/fetch';
import { API_ROOT_URL } from '../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    display: 'flex',
    alignItems: 'center',
    height: '2.625rem',
    marginLeft: '0.5rem',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

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

interface CommentsProps {
  subjectId: string;
  questionId: number | string;
  comments: Comment[] | null;
  fetchData: () => Promise<void>;
}

const Comments: React.FC<CommentsProps> = ({
  subjectId,
  questionId,
  comments,
  fetchData,
}) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = useCallback((event: any) => {
    setCommentValue(event.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await customFetch(
        `${API_ROOT_URL}/subjects/${subjectId}/questions/${questionId}/comments`,
        () => true,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            author: 'bibixx',
            contents: commentValue,
          },
        }
      );

      setCommentValue('');

      fetchData();
    },
    [fetchData, setCommentValue, commentValue, questionId, subjectId]
  );

  const data = comments !== null ? comments : [];
  const classes = useStyles();

  return (
    <>
      <Divider />
      <ListItem
        role={undefined}
        dense
        button
        onClick={() => setCommentsVisible(!commentsVisible)}
      >
        <ListItemText>{getCommentsAmount(data.length)}</ListItemText>
        <ListItemIcon>
          <div className={classes.icon}>
            {commentsVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </ListItemIcon>
      </ListItem>
      {commentsVisible && (
        <>
          <Divider />
          {data.map(({ author, comment, date }) => (
            <React.Fragment key={comment}>
              <ListItem role={undefined} dense>
                <ListItemText>
                  <Typography color="textSecondary" variant="body2">
                    {author.replace('~', '').replace(/@[\d.*]+$/, '')} | {date}
                  </Typography>
                  <Typography variant="body2">{comment}</Typography>
                </ListItemText>
              </ListItem>
            </React.Fragment>
          ))}
          <ListItem role={undefined} dense>
            <ListItemText>
              <form noValidate onSubmit={onSubmit} className={classes.form}>
                <TextField
                  error={false}
                  label="Nowy komentarz"
                  fullWidth
                  multiline
                  value={commentValue}
                  onChange={handleChange}
                  className={classes.input}
                />
                <Button variant="contained" color="primary" type="submit">
                  Dodaj komentarz
                </Button>
              </form>
            </ListItemText>
          </ListItem>
        </>
      )}
    </>
  );
};

export default Comments;
