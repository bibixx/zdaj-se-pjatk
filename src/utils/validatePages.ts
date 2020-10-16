import { Pages } from '../types/pages';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
function validatePages(element: any): element is Pages {
  if (!element?.pages) {
    return false;
  }

  if (!Array.isArray(element.pages)) {
    return false;
  }

  if (!(element.pages as Array<any>).every(Boolean)) {
    return false;
  }

  if (
    !(element.pages as Array<any>).every(
      ({ title, id }) => typeof title === 'string' && typeof id === 'string'
    )
  ) {
    return false;
  }

  return true;
}

export default validatePages;
