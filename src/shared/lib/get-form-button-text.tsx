import {
  CircleCheckBig,
  TriangleAlert,
} from 'lucide-react';
import { ReactNode } from 'react';
import Loader from '../ui/loader';

export type TFormState =
  | 'loading'
  | 'error'
  | 'idle'
  | 'success';

export type TGetFormButtonTextMapper =
  Record<TFormState, ReactNode>;

const GET_FORM_BUTTON_TEXT_MAPPER: TGetFormButtonTextMapper =
  {
    error: (
      <>
        <TriangleAlert /> Ошибка
      </>
    ),
    idle: '',
    success: <CircleCheckBig />,
    loading: (
      <>
        <Loader />
        Загрузка
      </>
    ),
  };

export const getFormButtonText = ({
  state,
  mapper,
}: {
  state: TFormState;
  mapper?: Partial<TGetFormButtonTextMapper>;
}): ReactNode => {
  if (mapper && state in mapper) {
    return mapper[state];
  }
  return GET_FORM_BUTTON_TEXT_MAPPER[
    state
  ];
};
