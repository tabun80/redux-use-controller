import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';

type ActionPayload<P> = P extends Action<infer AP> ? AP : P;

export type Controller<T = any, P = any> = (dispatch: Dispatch<Action<ActionPayload<P>>>, props: T) => void;
type CurriedController<T = any> = (props: T) => void;

type CreateControllerFactory = <P>(dispatch: Dispatch<Action<ActionPayload<P>>>) => ControllerFactory<P>;
type ControllerFactory<P> = (controller: Controller<P>) => CurriedController;

export function useController<P>(controller: Controller<P>) {
  const dispatch = useDispatch();
  const createController = createControllerFactory<P>(dispatch);
  return createController(controller);
};

const createControllerFactory: CreateControllerFactory = (dispatch) => (controller) => {
  return (props) => controller(dispatch, props);
};

export const sampleController: Controller = (dispatch, props = { test: 'test' }) => {
  const testUseCase = new TestUseCase();
  const payload = testUseCase.test(props);
  dispatch({ type: 'TEST', payload })
};

class TestUseCase {
  test = (props: any) => props.test;
}
