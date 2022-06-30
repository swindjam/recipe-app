jest.mock('node-fetch', () => () => {
  return new Promise((res) => {
    res({
      json: () => {},
    });
  });
});

process.env = {
    ...process.env,
    VERSION: 'test'
};
