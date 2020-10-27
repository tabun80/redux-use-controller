import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';

type ActionPayload<P> = P extends Action<infer AP> ? AP : P;

type Controller<P = any> = (dispatch: Dispatch<Action<ActionPayload<P>>>, ...args: any[]) => void;
type CurriedController = (...args: any[]) => void;

type CreateControllerFactory = <P>(dispatch: Dispatch<Action<ActionPayload<P>>>) => ControllerFactory<P>;
type ControllerFactory<P> = (controller: Controller<P>) => CurriedController;

type UseController = <P = any>(controller: Controller<P>) => CurriedController;

export function useController<P>(controller: Controller<P>) {
  const dispatch = useDispatch();
  const createController = createControllerFactory<P>(dispatch);
  return createController(controller);
};

const createControllerFactory: CreateControllerFactory = (dispatch) => (controller) => {
  return (...args: any[]) => controller(dispatch, ...args);
};

export const sampleController: Controller = (dispatch, props) => {
  const testUseCase = new TestUseCase();
  const payload = testUseCase.test();
  dispatch({ type: 'TEST', payload })
};

class TestUseCase {
  test = () => 'test';
}
