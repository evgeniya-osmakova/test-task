import React from 'react';
import './common.scss';
import './App.scss';
import Preview from './Preview/Preview';
import BannerForm from './Form/Form';

function App() {
  return (
    <div className="bannerMaker">
      <h1 className="title">Создай свой баннер</h1>
      <Preview />
      <BannerForm />
    </div>
  );
}

export default App;
