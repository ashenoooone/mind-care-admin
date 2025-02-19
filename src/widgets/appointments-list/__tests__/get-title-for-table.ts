import { getTitleForTable } from '../domain/domain';

describe('getTitleForTable', () => {
  beforeEach(() => {
    const mockDate = new Date('2024-01-18');
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the correct title for day', () => {
    const title = getTitleForTable({
      showMode: 'day',
      unitIndex: 0,
    });
    expect(title).toBe('Четверг 18');
  });

  it('should return the correct title for week', () => {
    const title = getTitleForTable({
      showMode: 'week',
      unitIndex: 0,
    });
    expect(title).toBe('Январь, 2024');
  });

  it('should return the correct title for month', () => {
    const title = getTitleForTable({
      showMode: 'month',
      unitIndex: 0,
    });
    expect(title).toBe('Январь, 2024');
  });
});
