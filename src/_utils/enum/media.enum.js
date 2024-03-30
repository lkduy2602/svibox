const MEDIA_TYPES = {
  IMG: 1,
  VIDEO: 2,
  AUDIO: 3,
};

const FILE_EXTENSIONS = {
  jpg: MEDIA_TYPES.IMG,
  png: MEDIA_TYPES.IMG,
  gif: MEDIA_TYPES.IMG,
  web: MEDIA_TYPES.IMG,

  mp4: MEDIA_TYPES.VIDEO,
  webm: MEDIA_TYPES.VIDEO,
  avi: MEDIA_TYPES.VIDEO,

  mp3: MEDIA_TYPES.AUDIO,
  wav: MEDIA_TYPES.AUDIO,
};
