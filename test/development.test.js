import expect from 'expect';
import {RangeCollection} from '../src/RangeCollection';

describe('RangeCollection lifecycle', () => {
  describe('By constructor', () => {
    it('Should add range', () => {
      const rc = new RangeCollection([9, 11]);
      expect(rc.print()).toBe('[9, 11)');
    });
    it('Should add ranges', () => {
      const rc = new RangeCollection([9, 11], [20, 30]);
      expect(rc.print()).toBe('[9, 11) [20, 30)');
    });
    it('Should work even wrong order', () => {
      const rc = new RangeCollection([20, 30], [9, 11]);
      expect(rc.print()).toBe('[9, 11) [20, 30)');
    });
    it('Should work even there is intersection', () => {
      const rc = new RangeCollection([9, 11], [20, 30], [2, 10]);
      expect(rc.print()).toBe('[2, 11) [20, 30)');
    });
  });
  describe('By add method', () => {
    it('Should add range to empty object', () => {
      const rc = new RangeCollection();
      rc.add([9, 11]);
      expect(rc.print()).toBe('[9, 11)');
    });
    it('Should add range at the begin of ranges', () => {
      const rc = new RangeCollection([5, 10]);
      rc.add([1, 3]);
      expect(rc.print()).toBe('[1, 3) [5, 10)');
    });
    it('Should add range at the middle of ranges', () => {
      const rc = new RangeCollection([5, 10], [20, 25]);
      rc.add([15, 17]);
      expect(rc.print()).toBe('[5, 10) [15, 17) [20, 25)');
    });
    it('Should add range at the end of ranges', () => {
      const rc = new RangeCollection([5, 10]);
      rc.add([20, 25]);
      expect(rc.print()).toBe('[5, 10) [20, 25)');
    });
    it('Should ignore if range is point', () => {
      const rc = new RangeCollection([5, 10]);
      rc.add([20, 20]);
      expect(rc.print()).toBe('[5, 10)');
    });
    it('Should ignore if range inside of another range', () => {
      const rc = new RangeCollection([5, 10]);
      rc.add([6, 8]);
      expect(rc.print()).toBe('[5, 10)');
    });
    it('Should add range when "start" is inside of range but "finish" is outside #1', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.add([7, 17]);
      expect(rc.print()).toBe('[5, 17) [20, 25) [30, 35)');
    });
    it('Should add range when "start" is inside of range but "finish" is outside #2', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.add([7, 27]);
      expect(rc.print()).toBe('[5, 27) [30, 35)');
    });
    it('Should add range when "start" is outside of range but "finish" is inside #1', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.add([3, 7]);
      expect(rc.print()).toBe('[3, 10) [20, 25) [30, 35)');
    });
    it('Should add range when "start" is outside of range but "finish" is inside #2', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.add([3, 22]);
      expect(rc.print()).toBe('[3, 25) [30, 35)');
    });
    it('Should add range when "start" is inside of range and "finish" is inside of another range #1', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.add([7, 22]);
      expect(rc.print()).toBe('[5, 25) [30, 35)');
    });
    it('Should add range when "start" is inside of range and "finish" is inside of another range #2', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.add([7, 32]);
      expect(rc.print()).toBe('[5, 35)');
    });
    it('Should add range when "start" is outside of range and "finish" is outside from another #1', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.add([3, 12]);
      expect(rc.print()).toBe('[3, 12) [20, 25) [30, 35)');
    });
    it('Should add range when "start" is outside of range and "finish" is outside from another #2', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.add([3, 27]);
      expect(rc.print()).toBe('[3, 27) [30, 35)');
    });
  });
  describe('By remove method', () => {
    it('Should ignore if range is point', () => {
      const rc = new RangeCollection([5, 10]);
      rc.remove([20, 20]);
      expect(rc.print()).toBe('[5, 10)');
    });
    it('Should ignore if range outside of another range', () => {
      const rc = new RangeCollection([5, 10]);
      rc.remove([16, 18]);
      expect(rc.print()).toBe('[5, 10)');
    });
    it('Should remove range inside of another range', () => {
      const rc = new RangeCollection([5, 20]);
      rc.remove([10, 15]);
      expect(rc.print()).toBe('[5, 10) [15, 20)');
    });
    it('Should add range when "start" is inside of range but "finish" is outside #1', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.remove([7, 17]);
      expect(rc.print()).toBe('[5, 7) [20, 25) [30, 35)');
    });
    it('Should add range when "start" is inside of range but "finish" is outside #2', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.remove([7, 27]);
      expect(rc.print()).toBe('[5, 7) [30, 35)');
    });
    it('Should remove range when "start" is outside of range but "finish" is inside #1', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.remove([3, 7]);
      expect(rc.print()).toBe('[7, 10) [20, 25) [30, 35)');
    });
    it('Should remove range when "start" is outside of range but "finish" is inside #2', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.remove([3, 22]);
      expect(rc.print()).toBe('[22, 25) [30, 35)');
    });
    it('Should remove range when "start" is inside of range and "finish" is inside of another range #1', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.remove([7, 22]);
      expect(rc.print()).toBe('[5, 7) [22, 25) [30, 35)');
    });
    it('Should remove range when "start" is inside of range and "finish" is inside of another range #2', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.remove([7, 32]);
      expect(rc.print()).toBe('[5, 7) [32, 35)');
    });
    it('Should remove range when "start" is outside of range and "finish" is outside from another #1', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.remove([3, 12]);
      expect(rc.print()).toBe('[20, 25) [30, 35)');
    });
    it('Should remove range when "start" is outside of range and "finish" is outside from another #2', () => {
      const rc = new RangeCollection([5, 10], [20, 25], [30, 35]);
      rc.remove([3, 27]);
      expect(rc.print()).toBe('[30, 35)');
    });
  });
});
