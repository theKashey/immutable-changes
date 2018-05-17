import {detectChanges} from "../src";

describe('detect changes', () => {
  describe('detect zero changes', () => {
    it('in object', () => {
      const state = {a: 1, b: {c: 2}};
      expect(detectChanges(state, state)).toEqual({});
    });

    it('in array', () => {
      const state = [1, 2];
      expect(detectChanges(state, state)).toEqual({});
    });
  });

  describe('detect false changes', () => {
    it('in object', () => {
      const c = {};
      const state1 = {a: {}, b: {}, c};
      const state2 = {a: {}, b: {}, c};
      expect(detectChanges(state1, state2)).toEqual({a: {}, b: {}});
    });

    it('in array', () => {
      const c = {};
      const state1 = [{}, {}, c];
      const state2 = [{}, {}, c];
      expect(detectChanges(state1, state2)).toEqual({0: {}, 1: {}});
    });
  });

  describe('detect 1 change', () => {
    it('in object', () => {
      const state1 = {a: 1, b: {c: 2}};
      const state2 = {a: 2, b: {c: 2, d: 2}};
      expect(detectChanges(state1, state2)).toEqual({a: "changed", b: {d: "created"}});
    });

    it('in array', () => {
      const state1 = [1, [2, 3]];
      const state2 = [2, [2, 4]];
      expect(detectChanges(state1, state2)).toEqual({0: "changed", 1: {1: "changed"}});
    });
  });

  describe('detect deletion', () => {
    it('in object', () => {
      const state1 = {a: 1, b: {c: 2}};
      const state2 = {a: 1};
      expect(detectChanges(state1, state2)).toEqual({b: "deleted"});
    });

    it('in array', () => {
      const state1 = [1, 2];
      const state2 = [1];
      expect(detectChanges(state1, state2)).toEqual({1: "deleted"});
    });
  });

  describe('detect deep change', () => {
    it('in object', () => {
      const c = {};
      const state1 = {a: c, b: {c, d: {c}}};
      const state2 = Object.assign({a: c, b: {c, d: {c}}}, {b: {c: {}, d: state1.b.d}});
      expect(detectChanges(state1, state2)).toEqual({b: {c: {}}});
    });
  });
});