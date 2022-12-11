export type Result<E> = {
  result?: E;
  error?: string;
  isError: boolean;
  method: string;
  duration: number;
};
