(function () {

  // Attach the script only for the first time (when the body tag doesn't have the 'no-fbclid' attribute)
  const body = document.querySelector('body');
  // Occurs when the page is still loading
  if (!body) return;
  // The body has 'no-fbclid' so we don't need to re-attach the script
  if (body.hasAttribute('no-fbclid')) return;

  const removeFBCLID = url => {
    const redirectURL = 'https://l.facebook.com';
    const newURLPattern = /https?%3A(.*)/;
    const fbclidPattern = /(\?|&)fbclid=(.*){1,64}/;

    // Check if the url is Facebook redirection page
    if (url.startsWith(redirectURL)) {
      // Get the direct decoded url
      url = decodeURIComponent((url.match(newURLPattern))[0]);
    }

    // Remove the fbclid from the url
    url = url.replace(fbclidPattern, '');
    return url;
  };

  // Attach click event listener to handle any click
  // 'mousedown' to handle both left/right clicks
  document.addEventListener('mousedown', e => {
    // Get the clicked element
    const { target: tag } = e;
    const { tagName } = tag;

    // Anchor tag handler
    if (tagName.toLowerCase() === 'a' && tag.target.toLowerCase() === '_blank') {
      // We simply update its 'href'
      tag.href = removeFBCLID(tag.href);
      // Disable the url manipulation by removing the element attribute
      // Occurs during right-clicking a link. Changes the 'href' to Facebook the redirect url
      tag.removeAttribute('data-lynx-mode');
    }

    // Attachment box image handler
    // Ex: https://ibb.co/3mCJH7D
    // Find the nearest anchor tag
    const closestLink = tag.closest('a[data-lynx-uri]');
    if (tagName.toLowerCase() === 'img' && closestLink) {
      // We simply update its 'href'
      closestLink.href = removeFBCLID(closestLink.href);
      // Disable the url manipulation by removing the element attribute
      // Occurs during right-clicking a link. Changes the 'href' to Facebook the redirect url
      closestLink.removeAttribute('data-lynx-mode');
    }

  });

  // Set the body attribute
  body.setAttribute('no-fbclid', true);

})();
