import { Page, Pages } from 'validators/pages';

function getNewPages(pages: Pages, overrides: Pages | null): Page[] {
  const overwrittenIds: Page['id'][] = [];

  const overridePages = overrides?.pages ?? [];
  const overridePagesMap = Object.fromEntries(
    overridePages.map((page) => [page.id, page]),
  );

  const overwrittenPages = [
    ...pages.pages.map((page) => {
      if (overridePagesMap[page.id] === undefined) {
        return page;
      }

      overwrittenIds.push(page.id);

      return {
        ...page,
        ...overridePagesMap[page.id],
      };
    }),
  ];

  return [
    ...overwrittenPages,
    ...overridePages.filter(({ id }) => !overwrittenIds.includes(id)),
  ];
}

export const getDataWithOverrides = (pages: Pages, overrides: Pages | null) => {
  const updatedAt =
    overrides?.updatedAt === undefined
      ? pages.updatedAt
      : Math.max(pages.updatedAt, overrides.updatedAt);

  return {
    pages: getNewPages(pages, overrides),
    updatedAt,
  };
};
