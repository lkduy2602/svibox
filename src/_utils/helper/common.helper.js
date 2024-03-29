const queryGoogleSheet = (sheetId, query) => {
  const url = SHEET_URL + '/gviz/tq?gid=' + sheetId + '&tqx=out:csv&tq=' + encodeURIComponent(query);

  const res = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
    },
  });

  return Utilities.parseCsv(res.getContentText());
};

const hashAndEncodePassword = (password) => {
  const sha256 = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password);
  const base64 = Utilities.base64Encode(sha256);

  return base64;
};

const routeDecorator = ({ isBypassLogin, accessPermissions, handler }) => {
  return {
    isBypassLogin: isBypassLogin || false,
    accessPermissions: accessPermissions || [],
    handler,
  };
};
