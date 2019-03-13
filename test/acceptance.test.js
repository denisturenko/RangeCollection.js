import expect from 'expect';
import {RangeCollection} from '../src/RangeCollection';

describe('RangeCollection acceptance', () => {
  it('Should work correctly', () => {
    const rc = new RangeCollection();
    rc.add([1, 5]);
    expect(rc.print()).toBe('[1, 5)');
    rc.add([10, 20]);
    expect(rc.print()).toBe('[1, 5) [10, 20)');
    rc.add([20, 20]);
    expect(rc.print()).toBe('[1, 5) [10, 20)');
    rc.add([20, 21]);
    expect(rc.print()).toBe('[1, 5) [10, 21)');
    rc.add([2, 4]);
    expect(rc.print()).toBe('[1, 5) [10, 21)');
    rc.add([3, 8]);
    expect(rc.print()).toBe('[1, 8) [10, 21)');
    rc.remove([10, 10]);
    expect(rc.print()).toBe('[1, 8) [10, 21)');
    rc.remove([10, 11]);
    expect(rc.print()).toBe('[1, 8) [11, 21)');
    rc.remove([15, 17]);
    expect(rc.print()).toBe('[1, 8) [11, 15) [17, 21)');
    rc.remove([3, 19]);
    expect(rc.print()).toBe('[1, 3) [19, 21)');
  });

});

