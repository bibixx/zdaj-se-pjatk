import React, { useState, useEffect } from 'react';
import { Spin, List, PageHeader, Layout, Typography } from 'antd';
import styled from '@emotion/styled';
import Comments from '../Comments';

const { Content } = Layout;

const ListContainer = styled('div')`
  background: #fff;
  padding: 24px;
  min-height: 280px;

  .ant-list-footer {
    padding: 0;
  }
`;

const SubjectAllQuestions = () => {
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/data/sko1-skj.json').then(res=>res.json());

      setSubject(data);
      setLoading(false);
    }

    fetchData();
  });

  if (loading) {
    return <Spin />
  }

  return (
    <Content style={{ padding: '0 50px', maxWidth: 800, margin: '0 auto' }}>
      <PageHeader
        onBack={() => null}
        title={subject.title}
      />
      <ListContainer>
        {subject.data.map(({ answers, question, comments }) => (
          <List
            key={question}
            bordered
            header={
              <Typography.Title level={4} style={{marginBottom: 0}}>
                <div dangerouslySetInnerHTML={{__html: question.trim().replace(/ - \(\d+\)/, '') }} />
              </Typography.Title>
            }
            footer={<Comments comments={comments} />}
            itemLayout="horizontal"
            dataSource={answers}
            style={{marginBottom: '24px'}}
            renderItem={({answer, correct}) => (
              <List.Item
                style={{ background: correct ? "rgba(82, 196, 26, 0.5)" : 'transparent' }}
              >
                <List.Item.Meta
                  description={
                    <Typography.Text strong>
                      <div dangerouslySetInnerHTML={{__html: answer }} />
                    </Typography.Text>
                  }
                />
              </List.Item>
            )}
          />
        ))}
      </ListContainer>
    </Content>
  );
}

export default SubjectAllQuestions;
