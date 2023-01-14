exports.isArgsLength5 = (args) => {
  if (Object.keys(args).length !== 5) {
    throw new Error("There is no 5 args!!");
  }
};
