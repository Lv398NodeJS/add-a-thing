import * as utils from './utils';

describe('getTaskStyleByPriority() - should return priority based class', () => {
  describe('When status is Done', () => {
    it('when priority High', () => {
      const status = 'High';
      const style = utils.getTaskStyleByPriority(status);
      expect(style).toBe('task-item d-flex justify-content-between High');
    });
    it('when priority Medium', () => {
      const status = 'Medium';
      const style = utils.getTaskStyleByPriority(status);
      expect(style).toBe('task-item d-flex justify-content-between Medium');
    });
    it('when priority Low', () => {
      const status = 'Low';
      const style = utils.getTaskStyleByPriority(status);
      expect(style).toBe('task-item d-flex justify-content-between Low');
    });
  });
});
