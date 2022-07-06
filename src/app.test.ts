import { App } from './app';

const expressMock = { use: jest.fn() };

jest.mock('express', () => () => expressMock);

describe('App tests', () => {
  test('should create and call setConfig method properly', () => {
    //garantir que a classe app efetue as configurações com sucesso

    // act
    const myapp = new App();

    // assert
    expect(expressMock.use).toBeCalledTimes(3);
  });
});
