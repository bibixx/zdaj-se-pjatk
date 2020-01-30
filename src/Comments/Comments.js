import React, { useState } from 'react';
import { List, Comment, Tooltip, Icon, Button } from 'antd';
import moment from 'moment';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const mapCommentsToDataSource = comments => comments.map(({author, comment, date}) => ({
  author,
  comment: comment,
  datetime: (
    <Tooltip
      title={moment(date, "DD-MM-YYYY HH:mm:ss").format('DD.MM.YYYY HH:mm:ss')}
    >
      <span>
        {moment(date, "DD-MM-YYYY HH:mm:ss").fromNow()}
      </span>
    </Tooltip>
  ),
}));

const getCommentsAmount = (n) => {
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
}

const Comments = ({ comments }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const data = Array.isArray(comments) ? comments : [];

  return (
    <div>
      <List.Item>
        <Button
          onClick={() => setCommentsVisible(!commentsVisible)}
          disabled={data.length === 0}
          type="link"
        >
          <IconText type="message" text={getCommentsAmount(data.length)} key="list-vertical-message" />
        </Button>
      </List.Item>
      {commentsVisible && data.length > 0 &&
        (<List
          itemLayout="horizontal"
          dataSource={mapCommentsToDataSource(data)}
          style={{ padding: 0 }}
          renderEmpty={() => <div></div>}
          renderItem={item => (
            <li style={{ paddingRight: 24, paddingLeft: 12 }}>
              <Comment
                author={item.author}
                content={item.comment}
                datetime={item.datetime}
              />
            </li>
          )}
        />)
      }
    </div>
  );
};

export default Comments;
