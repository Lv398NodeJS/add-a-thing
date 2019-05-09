import * as utils from './utils';

const crtObj = (priority, status) => {
  const obj = [
    {
      priority,
      status,
    },
  ];
  return obj;
};

describe('getTaskStyleByPriority() - should return priority class', () => {
  describe('When status is Done', () => {
    it('when priority High', () => {
      const obj = crtObj('High', 'Done');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item-done High');
    });
    it('when priority Medium', () => {
      const obj = crtObj('Medium', 'Done');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item-done Medium');
    });
    it('when priority Low', () => {
      const obj = crtObj('Low', 'Done');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item-done Low');
    });
  });
  describe('When status is InProgress', () => {
    it('when priority High', () => {
      const obj = crtObj('High', 'In Progress');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item High');
    });
    it('when priority Medium', () => {
      const obj = crtObj('Medium', 'In Progress');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item Medium');
    });
    it('when priority Low', () => {
      const obj = crtObj('Low', 'In Progress');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item Low');
    });
  });
  describe('When status is ToDo', () => {
    it('when priority High', () => {
      const obj = crtObj('High', 'To Do');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item High');
    });
    it('when priority Medium', () => {
      const obj = crtObj('Medium', 'To Do');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item Medium');
    });
    it('when priority Low', () => {
      const obj = crtObj('Low', 'To Do');
      const style = utils.getTaskStyleByPriority(...obj);
      expect(style).toBe('task-item Low');
    });
  });
});
