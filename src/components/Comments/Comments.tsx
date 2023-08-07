import { MultilineText } from 'components/MultilineText/MultilineText';
import { Comment } from 'validators/subjects';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';
import { getSortedComments, getCommentsAmount } from './Comments.utils';
import { CommentHeader } from './CommentHeader/CommentHeader';

interface CommentsProps {
  comments: Comment[];
}

export const Comments = ({ comments }: CommentsProps) => {
  const data = comments !== null ? getSortedComments(comments) : [];

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="comments"
        className="rounded-b-lg border-none overflow-hidden"
      >
        {/* TODO: Border radius */}
        <AccordionTrigger className="px-4 py-1 hover:bg-accent hover:text-accent-foreground">
          <span className="text-xs font-normal text-muted-foreground">
            {getCommentsAmount(data.length)}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          {data.map(({ author, comment, date, overwritten }) => (
            <div
              key={`${comment}-${author}-${date}`}
              className="px-4 py-2 first:pt-1"
            >
              <CommentHeader
                author={author}
                date={date}
                overwritten={overwritten ?? false}
              />
              <MultilineText>{comment}</MultilineText>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
