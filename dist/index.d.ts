import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
declare type ActionPayload<P> = P extends Action<infer AP> ? AP : P;
export declare type Controller<T = any, P = any> = (dispatch: Dispatch<Action<ActionPayload<P>>>, props: T) => void;
declare type CurriedController<T = any> = (props: T) => void;
export declare function useController<P>(controller: Controller<P>): CurriedController<any>;
export declare const sampleController: Controller;
export {};
