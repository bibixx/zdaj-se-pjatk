import { makeStyles, Tooltip, Typography } from '@material-ui/core';
import { AddedByZdajSeIcon } from 'components/AddedByZdajSeIcon/AddedByZdajSeIcon';

interface Props {
  author: string;
  date: string;
  overwritten: boolean;
}

const useStyles = makeStyles({
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '0.66em',
    height: '0.66em',
  },
});

export const CommentHeader = ({ author, date, overwritten }: Props) => {
  const classes = useStyles();

  return (
    <Typography
      color="textSecondary"
      variant="body2"
      className={classes.textWrapper}
    >
      {author.replace('~', '').replace(/@[\d.*]+$/, '')} | {date}
      {overwritten && (
        <>
          &nbsp;&nbsp;
          <Tooltip
            title="Komentarz dodany przez zdaj.se"
            aria-label="Komentarz dodany przez zdaj.se"
            placement="top"
          >
            <AddedByZdajSeIcon className={classes.icon} />
          </Tooltip>
        </>
      )}
    </Typography>
  );
};
