export const filterBySpecification = <T>(array: T[], spec: Partial<T>): T[] => {
  return array.filter((item) => {
    return Object.keys(spec).every(
      (key) => item[key as keyof T] === spec[key as keyof T]
    );
  });
};
