import { Button } from 'components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Crumb =
  | { content: string; to?: string; id?: string }
  | { content: Exclude<JSX.Element, string>; to?: string; id: string };
interface BreadCrumbsProps {
  crumbs: Crumb[];
}
export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  const lastCrumb = crumbs[crumbs.length - 1];
  return (
    <div className="flex items-center">
      {crumbs.slice(0, crumbs.length - 1).map((crumb, i) => {
        const key =
          typeof crumb.content === 'string'
            ? crumb.id ?? crumb.content
            : crumb.id ?? i;

        return (
          <>
            {crumb.to != null ? (
              <Button asChild variant="ghost" className="px-2" key={key}>
                <Link
                  to={crumb.to}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {crumb.content}
                </Link>
              </Button>
            ) : (
              <div
                key={key}
                className="text-muted-foreground p-2 font-medium text-sm select-none"
              >
                {crumb.content}
              </div>
            )}
            <ChevronRight className="h-4 text-muted-foreground mr-2" />
          </>
        );
      })}
      <h1 className="text-xl font-semibold select-none">{lastCrumb.content}</h1>
    </div>
  );
};
