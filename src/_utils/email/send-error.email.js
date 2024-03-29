const sendErrorEmail = (error) => {
  const recipient = 'lkduy2602@gmail.com';
  const subject = `[SViBox][ERROR]: ${error.message}`;
  const body = error.stack || error.message || error;
  const options = {
    name: 'SViBox Error',
    noReply: true,
    replyTo: 'error@svibox.com',
  };
  MailApp.sendEmail(recipient, subject, body, options);
};
