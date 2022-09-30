// prettier-ignore
export type CornerLocation =
  | 'UBL' | 'UBR' | 'UFR' | 'UFL'
  | 'LUB' | 'LUF' | 'LDF' | 'LDB'
  | 'FUL' | 'FUR' | 'FDR' | 'FDL' 
  | 'RUF' | 'RUB' | 'RDB' | 'RDF'
  | 'BUR' | 'BUL' | 'BDL' | 'BDR'
  | 'DFL' | 'DFR' | 'DBR' | 'DBL';

// prettier-ignore
export type EdgeLocation = 
  | 'UB' | 'UR' | 'UF' | 'UL'
  | 'LU' | 'LF' | 'LD' | 'LB'
  | 'FU' | 'FR' | 'FD' | 'FL'
  | 'RU' | 'RB' | 'RD' | 'RF'
  | 'BU' | 'BL' | 'BD' | 'BR'
  | 'DF' | 'DR' | 'DB' | 'DL';

export type CubeLocation = CornerLocation | EdgeLocation;

export type Face = 'U' | 'D' | 'F' | 'B' | 'L' | 'R';

export type ColorScheme = Record<Face, string>;
