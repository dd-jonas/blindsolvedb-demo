import { Set, SetCase } from '#types/api';
import { chunk, transpose } from '#utils';

type TableData2D = {
  headers: [string[], string[]];
  cases: (SetCase | null)[][];
  is2D: true;
};

type TableData1D = {
  headers: string[];
  cases: SetCase[];
  is2D: false;
};

export const useSetTableData = (set: Set): TableData2D | TableData1D => {
  const headers = set.headers.split('&');
  const is2D = headers.length === 2;

  if (is2D) {
    const columnHeaders = headers[0].split('|');
    const rowHeaders = headers[1].split('|');

    const length = columnHeaders.length * rowHeaders.length;
    const findCase = (i: number) => set.cases.find((c) => c.sort === i);

    const array = Array.from({ length }).map((_, i) => findCase(i + 1) ?? null);
    const cases = transpose(chunk(array, rowHeaders.length));

    return { headers: [columnHeaders, rowHeaders], cases, is2D: true };
  } else {
    const headers = set.headers.split('|');
    const { cases } = set;

    return { headers, cases, is2D: false };
  }
};
