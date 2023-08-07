export function polishPlural(
  singularNominativ: string,
  pluralNominativ: string,
  pluralGenitive: string,
  value: number,
) {
  if (value === 1) {
    return singularNominativ;
  }

  if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) {
    return pluralNominativ;
  }

  return pluralGenitive;
}
