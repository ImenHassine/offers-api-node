exports.checkIfImageIsCorrectType = (value) => {
  console.log("value", value);
  if (!value) return true;
  if (
    value.mimetype === "image/png" ||
    value.mimetype === "image/jpg" ||
    value.mimetype === "image/jpeg"
  ) {
    return true;
  }
  return false;
};

exports.checkIfFileIsTooBig = (value) => {
  const maxSize = 2 * 1024 * 1024; // for 2MB
  if (!value) return true;
  return value.size <= maxSize;
};
