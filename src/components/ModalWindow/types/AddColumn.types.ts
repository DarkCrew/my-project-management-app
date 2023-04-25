import { ColumnBody } from 'core/api/models';

export type Props = {
  toggleModalWindow?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  createColumn?: (column: ColumnBody) => void;
};
