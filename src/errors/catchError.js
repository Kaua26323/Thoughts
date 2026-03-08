function catchErrors(err) {
  const errorBox = [];
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    err.errors.forEach((error) => {
      errorBox.push(error.message);
    });
  } else {
    errorBox.push("An internal error occurred. Please try again.");
    console.error("Internal error:", err);
  }

  return errorBox[0];
}

module.exports = catchErrors;
