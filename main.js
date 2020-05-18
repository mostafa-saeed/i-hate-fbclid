(function (window) {
  if (window.FBCLIDRemoverAttached) return;

  const removeFBCLID = url => {
    const redirectURL = 'https://l.facebook.com';
    const newURLPattern = /https?%3A(.*)/;
    const fbclidPattern = /(\?|&)fbclid=(.*){1,64}/;

    // Check if redirect url
    if (url.startsWith(redirectURL)) {
      url = decodeURIComponent((url.match(newURLPattern))[0]);
    }

    url = url.replace(fbclidPattern, '');
    return url;
  };

  document.addEventListener('click', e => {
    const { target: tag } = e;
    const { tagName } = tag;
    
    if (tagName.toLowerCase() === 'a' && tag.target.toLowerCase() === '_blank') {
      tag.href = removeFBCLID(tag.href);
    }

    window.FBCLIDRemoverAttached = true;
  });
})(this);

