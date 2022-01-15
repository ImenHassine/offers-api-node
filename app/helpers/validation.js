exports.checkIfImageIsCorrectType = (file) => {
  if (!file) return true;
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    return true;
  }
  return false;
};

exports.checkIfFileIsTooBig = (file) => {
  const maxSize = 2 * 1024 * 1024; // for 2MB
  if (!file) return true;
  return file.size <= maxSize;
};

exports.checkIfImagesIsCorrectType = (files) => {
  let valid = true;
  if (!files) return valid;
  files.forEach((file) => {
    if (
      file.mimetype != "png" &&
      file.mimetype != "jpg" &&
      file.mimetype != "jpeg"
    )
      valid = false;
  });
  return true;
};

exports.checkIfFilesIsTooBig = (files) => {
  const maxSize = 2 * 1024 * 1024; // for 2MB
  let valid = true;
  if (!files) return valid;
  files.forEach((file) => {
    if (file.size > maxSize) valid = false;
  });
  return valid;
};
