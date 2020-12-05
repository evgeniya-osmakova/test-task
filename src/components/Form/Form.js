import React from 'react';
import './Form.scss';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import validationSchema from './validation';
import initialValues from './initialValues';
import makePreview from './onChange';
import FileLoader from '../FileLoader/FileLoader';

function BannerForm() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const background = useSelector((state) => state.background.type);
  const showImg = useSelector((state) => state.img.addImg);

  const onFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    makePreview(name, value, dispatch);
  };

  const standardField = ({
    fieldClass,
    type,
    name,
    text,
    componentType,
  }) => (
    <label className="section-subheader" key={_.uniqueId()}>
      <span className="section-subheader__title">{text}</span>
      <Field component={componentType} className={fieldClass} type={type}
             name={name} />
    </label>
  );

  const fieldWithError = ({
    text,
    name,
    placeholder,
    errors,
    touched,
    componentType,
  }) => (
    <label className="section-subheader" key={_.uniqueId()}>
      <span className="section-subheader__title">{text}</span>
      <Field component={componentType} type="text" name={name} placeholder={placeholder}
             className={
               { errors } && { touched } ? 'input-error' : 'form-item'
             } />
      <ErrorMessage name={name} component="div" className="error" />
    </label>
  );

  const radioField = ({ name, value, text }) => (
    <label className="radio-label" key={_.uniqueId()}>
      <Field className="radio-input" type="radio" name={name} value={value}
             checked={background === value || showImg === value}/>
      {text}
    </label>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(t)}
      onSubmit={() => {}}>
      {(formik) => {
        const { errors, touched, isValid } = formik;
        return (
          <Form className="form" onChange={onFormChange}>
            <div className="section">
              <p className="section-header">Выберите тип фона:</p>
              <div className="radio-group">
                {[{ name: 'background', value: 'backgroundColor', text: 'Однотонный' },
                  { name: 'background', value: 'backgroundGradient', text: 'Градиент' },
                  { name: 'background', value: 'none', text: 'Без фона' },
                ].map((item) => radioField(item))}
              </div>

              {(background === 'backgroundColor')
                ? <div className="subsection">
                  {standardField({
                    fieldClass: 'form-item color-picker',
                    type: 'color',
                    name: 'color',
                    text: 'Выберите цвет фона:',
                    componentType: 'input',
                  })}
                  </div>
                : ''
              }

              {(background === 'backgroundGradient')
                ? <div className="subsection">
                    <p className="section-subheader">Выберите цвета для градиентной заливки</p>
                  {[
                    {
                      fieldClass: 'form-item color-picker',
                      type: 'color',
                      name: 'gradientStart',
                      text: 'Начальный:',
                      componentType: 'input',
                    },
                    {
                      fieldClass: 'form-item color-picker',
                      type: 'color',
                      name: 'gradientEnd',
                      text: 'Конечный:',
                      componentType: 'input',
                    },
                  ].map((item) => standardField(item))}
                  </div>
                : ''
              }
            </div>

            <div className="section">
              <p className="section-header">Добавить изображение?</p>
              <div className="radio-group">
                {[{ name: 'img', value: 'yes', text: 'Да' },
                  { name: 'img', value: 'no', text: 'Нет' },
                ].map((item) => radioField(item))}
              </div>

              {(showImg === 'yes')
                ? <div className="subsection">
                  {fieldWithError({
                    text: 'Введите URL изображения',
                    name: 'imgUrl',
                    placeholder: 'http://',
                    errors: errors.imgUrl,
                    touched: touched.imgUrl,
                    componentType: 'input',
                  })}

                    <p className="section-subheader">Задайте размеры изображения</p>
                    {[{
                      text: 'Ширина',
                      name: 'width',
                      placeholder: 0,
                      errors: errors.width,
                      touched: touched.width,
                      componentType: 'input',
                    },
                    {
                      text: 'Высота',
                      name: 'height',
                      placeholder: 0,
                      errors: errors.height,
                      touched: touched.height,
                      componentType: 'input',
                    },
                    ].map((item) => fieldWithError(item))}

                    <p className="section-subheader">Задайте положение изображения относительно левого верхнего угла баннера</p>
                    {[{
                      text: 'Положение по оси x',
                      name: 'imgX',
                      placeholder: 0,
                      errors: errors.imgX,
                      touched: touched.imgX,
                      componentType: 'input',
                    },
                    {
                      text: 'Положение по оси y',
                      name: 'imgY',
                      placeholder: 0,
                      errors: errors.imgY,
                      touched: touched.imgY,
                      componentType: 'input',
                    },
                    ].map((item) => fieldWithError(item))}
                  </div>
                : ''
              }
            </div>

            <div className="section">
              <p className="section-header">Добавьте текст:</p>
              {[
                {
                  fieldClass: 'form-item',
                  type: 'text',
                  name: 'text',
                  text: 'Введите не более 3х строк:',
                  componentType: 'textarea',
                },
                {
                  fieldClass: 'form-item color-picker',
                  type: 'color',
                  name: 'textColor',
                  text: 'Выберите цвет текста:',
                  componentType: 'input',
                },
              ].map((item) => standardField(item))}
              {fieldWithError({
                text: 'Введите размер шрифта:',
                name: 'textSize',
                placeholder: '20',
                errors: errors.textSize,
                touched: touched.textSize,
                componentType: 'input',
              })}
            </div>

            <div className="section">
              {fieldWithError({
                text: 'Добавьте ссылку, на которую должен вести баннер:',
                name: 'bannerUrl',
                placeholder: 'http://',
                errors: errors.bannerUrl,
                touched: touched.bannerUrl,
                componentType: 'input',
              })}
            </div>
            < FileLoader isValid={ isValid }/>
          </Form>
        );
      }}
    </Formik>
  );
}

export default BannerForm;
