const mediaIdConstraint = {
  type: 'string',
  presence: {
    allowEmpty: false,
  },
  numericality: {
    onlyInteger: true,
    strict: true,
    greaterThan: 0,
  },
};

const mediaFormatConstraints = (format) => {
  return {
    [`${format}.url`]: {
      type: 'string',
      presence: {
        allowEmpty: false,
      },
    },
    [`${format}.name`]: {
      type: 'string',
      presence: {
        allowEmpty: false,
      },
    },
    [`${format}.size`]: {
      type: 'integer',
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: true,
        greaterThan: 0,
      },
    },
    [`${format}.width`]: {
      type: 'integer',
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: true,
        greaterThan: 0,
      },
    },
    [`${format}.height`]: {
      type: 'integer',
      presence: {
        allowEmpty: false,
      },
      numericality: {
        onlyInteger: true,
        strict: true,
        greaterThan: 0,
      },
    },
  };
};

const mediaConstraints = {
  media_id: mediaIdConstraint,
  ...mediaFormatConstraints('original'),
  ...mediaFormatConstraints('medium'),
  ...mediaFormatConstraints('thumb'),
};

const validateCreateMedia = (body) => {
  handleValidate(
    {
      medias: {
        type: 'array',
        presence: {
          allowEmpty: false,
        },
        length: {
          maximum: 10,
        },
      },
    },
    body
  );

  return {
    medias: body.medias,
  };
};

const validateDeleteMedia = (body) => {
  const constraints = {
    media_id: mediaIdConstraint,
  };

  handleValidate(constraints, body);

  return {
    media_id: body.media_id,
  };
};

const validateListMedia = (body) => {
  const constraints = {
    limit: limitConstraint,
    position: positionConstraint,
  };

  handleValidate(constraints, body);

  return {
    limit: body.limit,
    position: body.position,
  };
};
