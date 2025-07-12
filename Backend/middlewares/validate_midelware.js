const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the details properly ";
    const extraDetails = err.errors;

    const error = {
      status,
      message,
      extraDetails,
    };
    return res.status(status).json({
      status,
      message,
      errors: extraDetails,
    });
  }
};

module.exports = validate;
