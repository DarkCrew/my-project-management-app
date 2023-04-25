import { Dispatch, SetStateAction } from 'react';

export type Props = {
  toggleSaveModalWindow?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setModalSaveWindow?: Dispatch<SetStateAction<boolean>>;
};
