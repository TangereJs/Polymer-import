/*
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function (scope) {

  /**
   * @class Polymer
   */


  /**
   * Loads the set of HTMLImports contained in `node`. Notifies when all
   * the imports have loaded by calling the `callback` function argument.
   * This method can be used to lazily load imports. For example, given a
   * template:
   *
   *     <template>
   *       <link rel="import" href="my-import1.html">
   *       <link rel="import" href="my-import2.html">
   *     </template>
   *
   *     Polymer.importElements(template.content, function() {
   *       console.log('imports lazily loaded');
   *     });
   *
   * @method importElements
   * @param {Node} node Node containing the HTMLImports to load.
   * @param {Function} callback Callback called when all imports have loaded.
   */
  function importElements(node, callback) {
    if (node) {
      document.head.appendChild(node);
      HTMLImports.whenReady(callback);
    } else if (callback) {
      callback();
    }
  }

  /**
   * Loads an HTMLImport for each url specified in the `urls` array.
   * Notifies when all the imports have loaded by calling the `callback`
   * function argument. This method can be used to lazily load imports.
   * For example,
   *
   *     Polymer.import(['my-import1.html', 'my-import2.html'], function() {
   *       console.log('imports lazily loaded');
   *     });
   *
   * @method import
   * @param {Array} urls Array of urls to load as HTMLImports.
   * @param {Function} callback Callback called when all imports have loaded.
   */
  function _import(urls, callback) {
    if (urls && urls.length) {
      var frag = document.createDocumentFragment();
      for (var i = 0, l = urls.length, url, link;
        (i < l) && (url = urls[i]); i++) {
        link = document.createElement('link');
        link.rel = 'import';
        link.href = url;
        frag.appendChild(link);
      }
      importElements(frag, callback);
    } else if (callback) {
      callback();
    }
  }

  // exports
  scope.import = _import;
  scope.importElements = importElements;

})(Polymer);


// native importing elements twice causes errors (when not using the import polyfill), so we're checking if it's already imported
// queries Polymer.telemetry.registrations which seems hacky

(function (scope) {
  function _isImported(elementName) {
    var regs = Polymer.telemetry.registrations;

    for (i = 0; i < regs.length; i++) {
      var reg = regs[i];
      if (reg.is == elementName) return true;
    }

    return false;
  }

  scope.import.isImported = _isImported;
})(Polymer);