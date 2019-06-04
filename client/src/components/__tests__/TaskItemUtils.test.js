import * as utils from '../Dashboard/TaskItem/TaskItemUtils';

describe('getTaskStyleByPriority() - should return priority based class', () => {
  describe('When status is Done', () => {
    it('when priority High', () => {
      const status = 'High';
      const style = utils.getTaskStyleByPriority(status);
      expect(style).toBe('task-item d-flex justify-content-start High-task');
    });
    it('when priority Medium', () => {
      const status = 'Medium';
      const style = utils.getTaskStyleByPriority(status);
      expect(style).toBe('task-item d-flex justify-content-start Medium-task');
    });
    it('when priority Low', () => {
      const status = 'Low';
      const style = utils.getTaskStyleByPriority(status);
      expect(style).toBe('task-item d-flex justify-content-start Low-task');
    });
  });
});
