import { JsonDecoder } from 'ts.data.json';
import { Page } from '../types/page';
import { Pages } from '../types/pages';

const pageDecoder = JsonDecoder.object<Page>(
  {
    title: JsonDecoder.string,
    id: JsonDecoder.string,
  },
  'Page'
);

const pagesDecoder = JsonDecoder.object<Pages>(
  {
    pages: JsonDecoder.array<Page>(pageDecoder, 'Page[]'),
  },
  'Pages'
);

function validatePages(element: unknown): asserts element is Pages {
  const res = pagesDecoder.decode(element);

  if (!res.isOk()) {
    throw new Error(res.error);
  }
}

export default validatePages;
