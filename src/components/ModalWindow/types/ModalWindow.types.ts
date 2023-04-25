import { Dispatch, SetStateAction } from 'react';
import { ColumnBody, TaskCreateBody } from 'core/api/models';

type Props = {
  toggleModalWindow?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setModalSaveWindow?: Dispatch<SetStateAction<boolean>>;
  deleteBoard?: () => void;
  deleteProfile?: () => void;
  deleteCurrentColumn?: () => void;
  deleteCurrentTask?: () => void;
  createColumn?: (column: ColumnBody) => void;
  createTask?: (task: TaskCreateBody) => void;
  type?: string;
};

const TYPES = {
  DELETE: 'delete',
  CREATE: 'create',
  PROFILE: 'profile',
  DELETEPROFILE: 'deleteprofile',
  SAVEPROFILE: 'saveprofile',
  DELETECOLUMN: 'deletecolumn',
  CREATECOLUMN: 'createcolumn',
  CREATETASK: 'createtask',
  DELETETASK: 'deletetask',
};

export { Props, TYPES };
