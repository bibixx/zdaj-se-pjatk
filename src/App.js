import React from 'react';
import { Layout } from 'antd';
import SubjectAllQuestions from './SubjectAllQuestions';

const { Footer } = Layout;

const App = () => (
  <Layout className="layout">
    <SubjectAllQuestions />
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
);

export default App;
