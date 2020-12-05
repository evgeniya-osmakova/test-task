import * as allActions from '../../actions';

const makePreview = (name, value, dispatch) => {
  if (name === 'background') {
    dispatch(allActions.changeBackgroundType({ type: value }));
  }
  if (name === 'background' && value === 'none') {
    dispatch(allActions.addGradientStart({ color: 'white' }));
    dispatch(allActions.addGradientEnd({ color: 'white' }));
  }
  if (name === 'color') {
    dispatch(allActions.addGradientStart({ color: value }));
    dispatch(allActions.addGradientEnd({ color: value }));
  }
  if (name === 'gradientStart') {
    dispatch(allActions.addGradientStart({ color: value }));
  }
  if (name === 'gradientEnd') {
    dispatch(allActions.addGradientEnd({ color: value }));
  }
  if (name === 'img') {
    dispatch(allActions.changeImgOption({ imgOption: value }));
  }
  if (name === 'imgUrl') {
    dispatch(allActions.addImg({ url: value }));
  }
  if (name === 'imgX') {
    dispatch(allActions.changeImgX({ x: value }));
  }
  if (name === 'imgY') {
    dispatch(allActions.changeImgY({ y: value }));
  }
  if (name === 'width') {
    dispatch(allActions.changeWidth({ width: value }));
  }
  if (name === 'height') {
    dispatch(allActions.changeHeight({ height: value }));
  }
  if (name === 'text') {
    dispatch(allActions.addText({ text: value }));
  }
  if (name === 'textColor') {
    dispatch(allActions.addTextColor({ color: value }));
  }
  if (name === 'textSize') {
    dispatch(allActions.addTextSize({ size: value }));
  }
  if (name === 'bannerUrl') {
    dispatch(allActions.addUrl({ url: value }));
  }
};

export default makePreview;
