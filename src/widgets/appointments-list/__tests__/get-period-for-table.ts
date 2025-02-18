import { getPeriodForTable } from '../domain';

describe('getPeriodForTable', () => {
  beforeEach(() => {
    const mockDate = new Date('2024-01-18');
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the current period for week', () => {
    // проверяем, что для индекса 0 возвращается текущая дата
    const period = getPeriodForTable({
      showMode: 'week',
      unitIndex: 0,
    });
    expect(period).toEqual({
      fromDate: '2024-01-15',
      toDate: '2024-01-21',
    });
    // проверяем, что увеличение индекса на 1 увеличивает дату на 1 неделю
    const period2 = getPeriodForTable({
      showMode: 'week',
      unitIndex: 1,
    });
    expect(period2).toEqual({
      fromDate: '2024-01-22',
      toDate: '2024-01-28',
    });
    // проверяем, что уменьшение индекса на 1 уменьшает дату на 1 неделю
    const period3 = getPeriodForTable({
      showMode: 'week',
      unitIndex: -1,
    });
    expect(period3).toEqual({
      fromDate: '2024-01-08',
      toDate: '2024-01-14',
    });
  });

  it('should return the current period for day', () => {
    // проверяем, что для индекса 0 возвращается текущая дата
    const period = getPeriodForTable({
      showMode: 'day',
      unitIndex: 0,
    });
    expect(period).toEqual({
      fromDate: '2024-01-18',
      toDate: '2024-01-18',
    });
    // проверяем, что увеличение индекса на 1 увеличивает дату на 1 день
    const period2 = getPeriodForTable({
      showMode: 'day',
      unitIndex: 1,
    });
    expect(period2).toEqual({
      fromDate: '2024-01-19',
      toDate: '2024-01-19',
    });
    // проверяем, что уменьшение индекса на 1 уменьшает дату на 1 день
    const period3 = getPeriodForTable({
      showMode: 'day',
      unitIndex: -1,
    });
    expect(period3).toEqual({
      fromDate: '2024-01-17',
      toDate: '2024-01-17',
    });
  });

  it('should return the current period for month', () => {
    // проверяем, что для индекса 0 возвращается текущая дата
    const period = getPeriodForTable({
      showMode: 'month',
      unitIndex: 0,
    });
    expect(period).toEqual({
      fromDate: '2024-01-01',
      toDate: '2024-01-31',
    });
    // проверяем, что увеличение индекса на 1 увеличивает дату на 1 месяц
    const period2 = getPeriodForTable({
      showMode: 'month',
      unitIndex: 1,
    });
    expect(period2).toEqual({
      fromDate: '2024-02-01',
      toDate: '2024-02-29',
    });
    // проверяем, что уменьшение индекса на 1 уменьшает дату на 1 месяц
    const period3 = getPeriodForTable({
      showMode: 'month',
      unitIndex: -1,
    });
    expect(period3).toEqual({
      fromDate: '2023-12-01',
      toDate: '2023-12-31',
    });
  });
});
