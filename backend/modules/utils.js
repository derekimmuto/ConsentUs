/* Immuto Web App Template | (c) Immuto, Inc. and other contributors */

exports.is_empty = (obj) => {
   for (var x in obj) { return false; }
      return true;
}