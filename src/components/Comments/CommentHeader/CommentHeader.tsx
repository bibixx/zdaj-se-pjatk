import { Badge } from 'components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import { BadgeInfo } from 'lucide-react';

interface Props {
  author: string;
  date: string;
  overwritten: boolean;
}

export const CommentHeader = ({ author, date, overwritten }: Props) => {
  return (
    <div className="font-normal text-sm mb-0.5 flex items-center gap-1">
      <Badge variant="outline" className="-ml-1.5">
        {author.replace('~', '').replace(/@[\d.*]+$/, '')}
      </Badge>
      <span className="text-xs text-muted-foreground">{formatDate(date)}</span>
      {overwritten && (
        <Tooltip delayDuration={0}>
          <TooltipTrigger className="cursor-default">
            <BadgeInfo className="w-4 h-4 text-muted-foreground" />
            <span className="sr-only">Komentarz dodany przez zdaj.se</span>
          </TooltipTrigger>
          <TooltipContent>Komentarz dodany przez zdaj.se</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

const formatDate = (dateString: string) => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('-');
  const [hour, minute, second] = timePart.split(':');
  const date = new Date(+year, +month - 1, +day, +hour, +minute, +second);
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${pad(date.getDate())}.${pad(
    date.getMonth() + 1,
  )}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
