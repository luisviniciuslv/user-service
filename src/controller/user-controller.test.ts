const ROUTER_MOCK = { get: jest.fn() };

import { UserController } from './user-controller';

jest.mock('express', () => ({
  ...jest.requireActual('express'),
  Router: () => ROUTER_MOCK
}));

describe('User controller tests', () => {
  test('should set routes properly', () => {
    // act
    new UserController();

    // assert
    expect(ROUTER_MOCK.get).toHaveBeenCalledTimes(1);
    expect(ROUTER_MOCK.get).toHaveBeenCalledWith('/', expect.any(Function));
  });
});
