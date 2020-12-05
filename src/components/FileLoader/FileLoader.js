import React from 'react';
import { useSelector } from 'react-redux';
import useClipboard from 'react-use-clipboard';
import './FileLoader.scss';

// eslint-disable-next-line react/prop-types
function FileLoader({ isValid }) {
  const currentState = useSelector((state) => state);

  const dataForHtml = (currentState.url)
    ? `<a href="${currentState.url}"><img src="${currentState.png}" alt="banner" /></a>`
    : `<img src="${currentState.png}" alt="banner" />`;

  const [isCopiedHtml, setCopiedHtml] = useClipboard(dataForHtml, { successDuration: 1000 });

  const dataForJson = {
    background: currentState.background,
    img: currentState.img,
    text: currentState.text,
    url: currentState.url,
  };

  const [isCopiedJson, setCopiedJson] = useClipboard(JSON.stringify(dataForJson),
    { successDuration: 1000 });

  return (
    <div className="save-as">
      <a download href={currentState.png} target="_blank"
         className={!isValid ? 'link link--error' : 'link' }>
        <button type="button" className={!isValid ? 'btn btn--error' : 'btn' } disabled={!isValid }>
          Сохранить как png
        </button>
      </a>

      <div className="save-as__group">
        <button type="button" className={!isValid ? 'btn btn--error' : 'btn'}
                disabled={!isValid} onClick={setCopiedHtml}>
          Скопировать как html
        </button>
        {(isCopiedHtml) ? <div className="save-as__info">Скопированно!</div> : ''}
      </div>

      <div className="save-as__group">
        <button type="button" className={!isValid ? 'btn btn--error' : 'btn'}
                disabled={!isValid} onClick={setCopiedJson}>
          Скопировать как JSON
        </button>
        {(isCopiedJson) ? <div className="save-as__info">Скопированно!</div> : ''}
      </div>

    </div>
  );
}

export default FileLoader;
