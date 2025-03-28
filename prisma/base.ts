export type Order<T> = {
  [K in keyof T]?: Direction.ASC | Direction.DESC;
};

export type Specification<T> = {
  [K in keyof T]?: T[K];
};

export enum Direction {
  ASC = "asc",
  DESC = "desc",
}
