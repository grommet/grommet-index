// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

export const isMobile = (() => {

  let hasTouchScreen = false;

  try {
    hasTouchScreen = typeof window.orientation !== 'undefined';
  } catch (e) {
    console.warn(e);
  }

  return hasTouchScreen;
})();

