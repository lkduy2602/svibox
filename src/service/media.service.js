const handleCreateMedia = (body, userId) => {
  const { medias } = validateCreateMedia(body);

  medias.forEach((media) => {
    handleValidate(mediaConstraints, media);

    const { media_id, original, medium, thumb } = media;

    const mediaExist = MEDIA_MODEL.find({
      where: {
        media_id: `CONTAINS '${media_id}'`,
      },
    })[0];
    if (mediaExist) throw new ExceptionResponse(HTTP_STATUS.BAD_REQUEST, 'media already exist');

    const type = mediaType(original.name);
    MEDIA_MODEL.insert({
      user_id: userId,
      media_id,
      type,
      original: JSON.stringify(original),
      medium: JSON.stringify(medium),
      thumb: JSON.stringify(thumb),
    });
  });
};

const mediaType = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();

  if (!FILE_EXTENSIONS[extension]) throw new ExceptionResponse(HTTP_STATUS.BAD_REQUEST, 'file is not supported')

  return FILE_EXTENSIONS[extension]
};

const handleDeleteMedia = (body, userId) => {
  const { media_id } = validateDeleteMedia(body);

  const mediaExist = MEDIA_MODEL.find({
    where: {
      media_id: `CONTAINS '${media_id}'`,
      user_id: `CONTAINS '${userId}'`,
    },
  })[0];
  if (!mediaExist) throw new ExceptionResponse(HTTP_STATUS.BAD_REQUEST, 'media not found');

  MEDIA_MODEL.delete({
    row_number: mediaExist.row_number,
  });
};

const handleListMedia = (body, userId) => {
  const { limit, position } = validateListMedia(body);

  const conditions = {
    user_id: `CONTAINS '${userId}'`,
  };
  if (position) conditions.media_id = `< ${position}`;

  const medias = MEDIA_MODEL.find({
    where: conditions,
    limit: limit,
    orderBy: {
      media_id: 'DESC',
    },
  });

  return medias.map((media) => {
    const { media_id, type, original, medium, thumb } = media;

    return {
      media_id,
      type: +type,
      original: JSON.parse(original),
      medium: JSON.parse(medium),
      thumb: JSON.parse(thumb),
      position: media_id,
    };
  });
};
