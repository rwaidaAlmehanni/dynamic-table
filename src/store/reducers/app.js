/**
 * Created by Rwaida on 13/08/2021.
 */

import {createReducer} from "../index";
import {
  ADD_NEW_ROW,
  ON_CLICK_ORDER,
  ON_DELETE_ROW, ON_SEARCH_TEXT,
  UPDATE_COLUMN_CONTENT,
  UPDATE_COLUMN_STATUS,
  UPDATE_ROWS_ORDER,
} from '../Constant';

const initialState = {
  rows: [],
  filteredList: []
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default createReducer(initialState, {
  [UPDATE_COLUMN_STATUS]: (state, payload) => {
    let oldList = [...state.rows];
    oldList[payload.index][payload.key]["isActive"] = !oldList[payload.index][payload.key]["isActive"];
    return Object.assign({}, state, {
      rows: oldList
    });
  },

  [UPDATE_COLUMN_CONTENT]: (state, payload) => {
    let oldList = [...state.rows];
    oldList[payload.index][payload.key]["content"] = payload.content;
    return Object.assign({}, state, {
      rows: oldList
    });
  },

  [ADD_NEW_ROW]: (state) => {
    let newRows = [...state.rows];
    const newRow = {
      id: getRandomInt(10000),
      text: { isActive: false, content: '' },
      date: { isActive: false, content: '' },
      number: { isActive: false, content: '' },
    }
    return Object.assign({}, state, {
      rows: [...newRows, newRow]
    });
  },

  [ON_DELETE_ROW]: (state, payload) => {
    let oldList = [...state.rows];
    payload.selectedList.map((id) => {
      let itemIndex = oldList.findIndex(item => item.id === id)
      oldList.splice(itemIndex, 1)
    })
    return Object.assign({}, state, {
      rows: [...oldList]
    });
  },

  [UPDATE_ROWS_ORDER]: (state, payload) => {
    return Object.assign({}, state, {
      rows: payload,
    });
  },

  [ON_CLICK_ORDER]: (state) => {
    let oldList = [...state.rows];
    oldList.sort(function(a, b) {
      return a.id - b.id;
    });
    return Object.assign({}, state, {
      rows: oldList,
    });
  },

  [ON_SEARCH_TEXT]: (state, payload) => {
    let oldList = [...state.rows];
    let list = oldList.filter((item) => {return item.text.content.indexOf(payload) > -1});
    return Object.assign({}, state, {
      filteredList: payload.length > 0 ? list : oldList,
    });
  },
})
