export const getUserSelectClassNames = (disableUserSelect: boolean, wasUserSelectCorrect: boolean) => {
  if (!disableUserSelect) {
    return undefined;
  }

  return wasUserSelectCorrect
    ? 'border-green-600 data-[state=checked]:bg-green-600'
    : 'border-red-600 data-[state=checked]:bg-red-600';
};
