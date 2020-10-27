Redux useController
=========================

## Installation
```sh
npm i redux-use-controller
```

### Usage

#### Controller
```js
const testController = (dispatch, props) => {
  const testUseCase = new TestUseCase();
  const payload = testUseCase.test();
  dispatch({ type: 'TEST', payload })
}
```

#### React Functional Component
```js
const MyButton = () => {
  const executeTest = useController(testController);
  return (
    <button onClick={executeTest}>test</button>
  );
}
```
