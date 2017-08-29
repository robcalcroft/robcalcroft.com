module.exports = (logLevel, log) => {
  const date = new Date();
  switch (logLevel) {
    case 0: return console.log(`${date.toLocaleString()} INFO: ${log}`); // eslint-disable-line no-console
    case 1: return console.log(`${date.toLocaleString()} ERROR: ${log}`); // eslint-disable-line no-console
    case 2: return console.log(`${date.toLocaleString()} SUCCESS: ${log}`); // eslint-disable-line no-console
    default: return console.log(log); // eslint-disable-line no-console
  }
};
