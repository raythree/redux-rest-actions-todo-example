import reducer from './reducer';
import {ALL, COMPLETED, NOT_COMPLETED} from './filters';

describe('todos root reducer tests', () => {
  it('should return the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      list: {
        pending: false,
        todos: [],
        error: null
      },
      filters: {
        visibility: 'all',
        search: ''
      },
      update: {
        pending: false,
        todo: null,
        error: null
      }
    });
  });
});

// Include if doing client side filtering
//
// import { selectVisibleTodos } from './reducer'
//
// describe('selectVisibleTodos selector test', () => {
//   const state = {
//     list: {
//       pending: false,
//       todos: [
//         {id: 1, content: 'one', completed: false},
//         {id: 2, content: 'two', completed: true},
//         {id: 3, content: 'three', completed: false}
//       ],
//       error: null
//     },
//     filter: ALL,
//     update: {
//       pending: false,
//       todo: null,
//       error: null
//     }
//   };

//   it('should select by fiter', () => {
//     expect(selectVisibleTodos(state)).toEqual([
//       {id: 1, content: 'one', completed: false},
//       {id: 2, content: 'two', completed: true},
//       {id: 3, content: 'three', completed: false}
//     ]);

//     const state2 = {...state};
//     state2.filter = COMPLETED;
//     expect(selectVisibleTodos(state2)).toEqual([
//       {id: 2, content: 'two', completed: true}
//     ]);

//     const state3 = {...state};
//     state3.filter = NOT_COMPLETED;
//     expect(selectVisibleTodos(state3)).toEqual([
//       {id: 1, content: 'one', completed: false},
//       {id: 3, content: 'three', completed: false}
//     ]);
//   });
// });
