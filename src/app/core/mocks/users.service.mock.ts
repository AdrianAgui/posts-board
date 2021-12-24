import { of } from 'rxjs';

export class MockUsersService {
  get = () => of([]);
  getName = () => 'john';
}
