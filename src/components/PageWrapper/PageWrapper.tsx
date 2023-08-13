import { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return <div className="max-w-3xl mx-auto font-normal">{children}</div>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const withPageWrapper =
  (Component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>) =>
  (props: RouteComponentProps<any>) => {
    return (
      <PageWrapper>
        <Component {...props} />
      </PageWrapper>
    );
  };
/* eslint-enable @typescript-eslint/no-explicit-any */
