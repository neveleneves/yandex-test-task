module.exports = async function (input) {
  const sortFiles = (allFiles) => {
    return (sorted = allFiles.sort());
  };

  const fileSearch = async (input, result = []) => {
    if (input) {
      const size = await input.size();

      for (let i = 0; i < size; i++) {
        let file = await input.read(i);

        if (typeof file === "string" && file !== "file") {
          result.push(file);
        } else if (
          typeof file === "object" &&
          file &&
          Object.keys(file).length !== 0
        ) {
          return await fileSearch(file, result);
        }
      }
    }
  };

  const allFiles = await fileSearch(input);
  const result = sortFiles(allFiles);

  return result;
};
