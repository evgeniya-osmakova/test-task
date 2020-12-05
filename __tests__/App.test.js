import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import React from 'react';
import userEvent from '@testing-library/user-event';
import BannerForm from '../src/components/Form/Form';
import FileLoader from '../src/components/FileLoader/FileLoader';

const initialState1 = {
  background: {
    type: 'none',
    color1: '#ffffff',
    color2: '#ffffff',
  },
  img: {
    addImg: 'yes',
    url: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  text: {
    text: '',
    size: 20,
    color: '#000',
  },
  url: '',
  png: '',
};

const initialState2 = {
  background: {
    type: 'backgroundColor',
    color1: '#ffffff',
    color2: '#ffffff',
  },
  img: {
    addImg: 'no',
    url: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  text: {
    text: '',
    size: 20,
    color: '#000',
  },
  url: '',
  png: '',
};

const initialState3 = {
  background: {
    type: 'backgroundGradient',
    color1: '#ffffff',
    color2: '#ffffff',
  },
  img: {
    addImg: 'no',
    url: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  text: {
    text: '',
    size: 20,
    color: '#000',
  },
  url: '',
  png: '',
};

const mockStore = configureStore();
let store;

describe('form section rendering check', () => {
  it('should show img section', () => {
    store = mockStore(initialState1);
    render(<Provider store={store}><BannerForm /></Provider>);
    expect(screen.queryByLabelText('Высота')).toBeInTheDocument();
  });

  it('should hide img section', () => {
    store = mockStore(initialState2);
    render(<Provider store={store}><BannerForm /></Provider>);
    expect(screen.queryByLabelText('Высота')).toBeNull();
  });

  it('should hide background section', () => {
    store = mockStore(initialState1);
    render(<Provider store={store}><BannerForm /></Provider>);
    expect(screen.queryByLabelText('Начальный')).toBeNull();
  });

  it('should show background section', () => {
    store = mockStore(initialState3);
    render(<Provider store={store}><BannerForm /></Provider>);
    expect(screen.queryByLabelText('Начальный:')).toBeInTheDocument();
  });
});

describe('buttons pressing check', () => {
  store = mockStore(initialState1);
  render(<Provider store={store}><FileLoader /></Provider>);
  document.execCommand = jest.fn();

  const clickCheck = (save) => {
    userEvent.click(save);
    expect(document.execCommand).toHaveBeenCalled();
  };

  it('should click html-copy button', () => {
    const saveHtmlBtn = screen.findByText('html');
    saveHtmlBtn.then((save) => {
      clickCheck(save);
    });
  });

  it('should click json-copy button', () => {
    const saveJsonBtn = screen.findByText('json');
    saveJsonBtn.then((save) => {
      clickCheck(save);
    });
  });

  it('should click png-save button', () => {
    render(<Provider store={store}><FileLoader /></Provider>);
    const savePngBtn = screen.findByText('png');
    savePngBtn.then((save) => {
      clickCheck(save);
    });
  });
});
