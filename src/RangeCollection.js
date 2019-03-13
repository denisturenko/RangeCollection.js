import _ from 'lodash';
import {isEven} from "./utils";

export class RangeCollection {

  /**
   * Ranges will be stored as sorted array with an even amount of elements
   * @type {Array}
   */
  ranges = [];

  /**
   * Allow specify ranges
   * For example new RangeCollection([9, 11], [20, 30])
   * or even with intersection new RangeCollection([9, 11], [20, 30], [2, 10])
   */
  constructor() {
    _.each(arguments, this.add);
  }

  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add = (range) => {
    // todo check range and throw error
    const [start, finish] = range;
    /**
     * Do nothing if range is kind of point
     */
    if (start === finish) return;
    /**
     * For first time directly save new range
     */
    if (_.isEmpty(this.ranges)) return this.ranges = range;
    /**
     * Looking for future indexes of new range
     */
    const startIndex = _.sortedIndex(this.ranges, start);
    const finishIndex = _.sortedIndex(this.ranges, finish);
    /**
     * Insert range into the free place between ranges
     */
    if (startIndex === finishIndex && isEven(startIndex)) {
      this.ranges.splice(finishIndex, 0, finish);
      this.ranges.splice(startIndex, 0, start);
      return;
    }
    /**
     * Recalculate and store range if it's inserted into another range
     */
    if (!isEven(startIndex)) {
      if (isEven(finishIndex)) {
        this.ranges.splice(finishIndex, 0, finish);
      }
      _.pullAt(this.ranges, _.range(startIndex, finishIndex));
      return;
    }
    /**
     * Recalculate and store range if it's inserted into free place from left side
     * and right side is inside another range
     */
    if (!isEven(finishIndex)) {
      this.ranges[startIndex] = start;
      _.pullAt(this.ranges, _.range(startIndex + 1, finishIndex));
      return;
    }
    /**
     * Recalculate and store range if it's inserted into free place from left side
     * and right side is located into free place from another side
     */
    this.ranges[startIndex] = start;
    this.ranges[finishIndex - 1] = finish;
    _.pullAt(this.ranges, _.range(startIndex + 1, finishIndex - 1));

  };

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    // todo check range and throw error
    const [start, finish] = range;
    /**
     * Do nothing if range is kind of point
     */
    if (start === finish) return;
    /**
     * Looking for future indexes of new rage
     */
    const startIndex = _.sortedIndex(this.ranges, start);
    const finishIndex = _.sortedIndex(this.ranges, finish);
    /**
     * Cut the piece of range from another rage
     */
    if (startIndex === finishIndex) {
      if (!isEven(startIndex)) {
        this.ranges.splice(finishIndex, 0, finish);
        this.ranges.splice(startIndex, 0, start);
      }
      return;
    }
    /**
     * Cut the piece of range inside another range
     */
    if (!isEven(startIndex)) {
      /**
       * If right side is outside of range
       */
      if (isEven(finishIndex)) {
        this.ranges.splice(finishIndex, 0, start);
        _.pullAt(this.ranges, _.range(startIndex, finishIndex));
      } else {
        /**
         * Or if left side is inside of next range
         */
        this.ranges.splice(startIndex, 0, start);
        this.ranges.splice(finishIndex + 1, 0, finish);
        _.pullAt(this.ranges, _.range(startIndex + 1, finishIndex + 1));
      }
      return;
    }
    /**
     * Cut the piece of range from left side of range
     */
    if (!isEven(finishIndex)) {
      this.ranges[startIndex] = finish;
      _.pullAt(this.ranges, _.range(startIndex + 1, finishIndex));
      return;
    }
    /**
     * Cut the piece of range from right side  of range
     */
    _.pullAt(this.ranges, _.range(startIndex, finishIndex));
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  print() {
    return _.chain(this.ranges)
      .chunk(2)
      .map(([start, end]) => `[${start}, ${end})`)
      .join(' ')
      .value();
  }


}