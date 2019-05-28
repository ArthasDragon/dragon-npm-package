

export const infiniteTimer = (callback) => {

  setTimeout(() => {
    callback && callback();

    infiniteTimer(callback);
  }, 300);
}
