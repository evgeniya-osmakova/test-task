import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index';

const background = handleActions({
  [actions.changeBackgroundType](state, { payload: { type } }) {
    return { ...state, type };
  },
  [actions.addGradientStart](state, { payload: { color } }) {
    return { ...state, color1: color };
  },
  [actions.addGradientEnd](state, { payload: { color } }) {
    return { ...state, color2: color };
  },
}, { type: 'none', color1: '#ffffff', color2: '#ffffff' });

const img = handleActions({
  [actions.changeImgOption](state, { payload: { imgOption } }) {
    if (imgOption === 'yes') {
      return {
        addImg: 'yes',
        url: '',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    }
    return {
      addImg: 'no',
      url: '',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  },
  [actions.addImg](state, { payload: { url } }) {
    return { ...state, url };
  },
  [actions.changeImgX](state, { payload: { x } }) {
    return { ...state, x };
  },
  [actions.changeImgY](state, { payload: { y } }) {
    return { ...state, y };
  },
  [actions.changeWidth](state, { payload: { width } }) {
    return { ...state, width };
  },
  [actions.changeHeight](state, { payload: { height } }) {
    return { ...state, height };
  },
}, {
  addImg: 'no',
  url: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

const text = handleActions({
  [actions.addText](state, { payload: { text: newText } }) {
    return { ...state, text: newText };
  },
  [actions.addTextSize](state, { payload: { size } }) {
    return { ...state, size };
  },
  [actions.addTextColor](state, { payload: { color } }) {
    return { ...state, color };
  },
}, { text: '', size: 20, color: '#000' });

const url = handleActions({
  [actions.addUrl](state, { payload: { url: newUrl } }) {
    return newUrl;
  },
}, '');

const png = handleActions({
  [actions.addPng](state, { payload: { img: newImg } }) {
    return newImg;
  },
}, '');

export default combineReducers({
  background,
  img,
  text,
  url,
  png,
});
