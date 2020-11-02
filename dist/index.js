"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleController = exports.useController = void 0;
var react_redux_1 = require("react-redux");
function useController(controller) {
    var dispatch = react_redux_1.useDispatch();
    var createController = createControllerFactory(dispatch);
    return createController(controller);
}
exports.useController = useController;
;
var createControllerFactory = function (dispatch) { return function (controller) {
    return function (props) { return controller(dispatch, props); };
}; };
exports.sampleController = function (dispatch, props) {
    if (props === void 0) { props = { test: 'test' }; }
    var testUseCase = new TestUseCase();
    var payload = testUseCase.test(props);
    dispatch({ type: 'TEST', payload: payload });
};
var TestUseCase = /** @class */ (function () {
    function TestUseCase() {
        this.test = function (props) { return props.test; };
    }
    return TestUseCase;
}());
