export function isEmpty(str) {
    return (!str || str.length === 0 );
}
export function getQueryStringValue(url, key) {
    return decodeURIComponent(
      url?.replace(
        new RegExp(
          '^(?:.*[&\\?]' +
            encodeURIComponent(key)?.replace(/[\.\+\*]/g, '\\$&') +
            '(?:\\=([^&]*))?)?.*$',
          'i',
        ),
        '$1',
      ),
    );
  }


export  function arraysEqual(a1,a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */

    
    return JSON.stringify(a1)==JSON.stringify(a2);
}

export   const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};