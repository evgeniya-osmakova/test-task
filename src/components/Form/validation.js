import * as Yup from 'yup';

const validationSchema = (t) => (Yup.object().shape({
  imgUrl: Yup.lazy((value) => /^data/.test(value)
    ? Yup.string()
      .matches(
        /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
        t('errors.incorrectURI'),
      )
    : Yup.string().url(t('errors.incorrectUrl'))),
  bannerUrl: Yup.string().url(t('errors.incorrectUrl')),
  imgX: Yup.number().typeError(t('errors.incorrectCoordinate')).integer(t('errors.incorrectCoordinate')),
  imgY: Yup.number().typeError(t('errors.incorrectCoordinate')).integer(t('errors.incorrectCoordinate')),
  width: Yup
    .number().typeError(t('errors.incorrectDimension'))
    .positive(t('errors.incorrectDimension'))
    .integer(t('errors.incorrectDimension')),
  height: Yup
    .number().typeError(t('errors.incorrectDimension'))
    .positive(t('errors.incorrectDimension'))
    .integer(t('errors.incorrectDimension')),
  textSize: Yup
    .number().typeError(t('errors.incorrectDimension'))
    .positive(t('errors.incorrectDimension'))
    .integer(t('errors.incorrectDimension')),
}));

export default validationSchema;
