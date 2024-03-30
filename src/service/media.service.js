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
  return FILE_EXTENSIONS[extension] || MEDIA_TYPES.OTHER;
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
