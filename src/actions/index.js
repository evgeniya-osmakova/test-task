import { createAction } from 'redux-actions';

export const changeBackgroundType = createAction('BACKGROUND_CHANGE');
export const addGradientStart = createAction('GRADIENT_START_ADD');
export const addGradientEnd = createAction('GRADIENT_END_ADD');

export const changeImgOption = createAction('IMG_CHANGE');
export const addImg = createAction('IMG_ADD');
export const changeImgX = createAction('IMG_X_CHANGE');
export const changeImgY = createAction('IMG_Y_CHANGE');
export const changeWidth = createAction('WIDTH_CHANGE');
export const changeHeight = createAction('HEIGHT_CHANGE');

export const addText = createAction('TEXT_ADD');
export const addTextSize = createAction('TEXT_SIZE_ADD');
export const addTextColor = createAction('TEXT_COLOR_ADD');

export const addUrl = createAction('URL_ADD');

export const addPng = createAction('ADD_PNG');

export const addJson = createAction('ADD_JSON');
