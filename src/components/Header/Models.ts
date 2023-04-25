export type SetActiveCallbackProps = {
  isActive: boolean;
  isPending: boolean;
};

export type SetActiveCallback = (props: SetActiveCallbackProps) => string;
