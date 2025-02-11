import { ChevronRight } from 'lucide-react';
import { Fragment, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { cn } from 'utils';
import { Button } from 'components/ui/button';

type Crumb =
  | { content: string; to?: string; id?: string; className?: string; onClick?: MouseEventHandler }
  | { content: Exclude<JSX.Element, string>; to?: string; id: string; className?: string; onClick?: MouseEventHandler };
interface BreadCrumbsProps {
  crumbs: Crumb[];
}
export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  const lastCrumb = crumbs[crumbs.length - 1];
  return (
    <div className="flex items-center max-w-full">
      {crumbs.slice(0, crumbs.length - 1).map((crumb, i) => {
        const key = typeof crumb.content === 'string' ? crumb.id ?? crumb.content : crumb.id ?? i;

        return (
          <Fragment key={key}>
            {crumb.to != null ? (
              <Button asChild variant="ghost" className="px-2">
                <Link
                  to={crumb.to}
                  onClick={crumb.onClick}
                  className={cn('text-muted-foreground hover:text-foreground', crumb.className)}
                >
                  {crumb.content}
                </Link>
              </Button>
            ) : (
              <div className={cn('text-muted-foreground p-2 font-medium text-sm select-none', crumb.className)}>
                {crumb.content}
              </div>
            )}
            <ChevronRight className="h-3 w-3 flex-shrink-0 text-muted-foreground mr-2" />
          </Fragment>
        );
      })}

      <h1 className={cn('text-xl font-semibold select-none overflow-hidden leading-9', lastCrumb.className)}>
        {lastCrumb.content}
      </h1>
    </div>
  );
};
