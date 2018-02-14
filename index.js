/* eslint node/no-extraneous-require: 0 */
'use strict';

const path = require('path');
const concat = require('broccoli-concat');
const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-animate-shim',

  included() {
    this._super.included.apply(this, arguments);

    const host = findHost(this);

    this.animateCssOptions = host.options['animate.css'] || {};
    this.animateCssPath = path.dirname(require.resolve('animate.css'));

    host.import('vendor/animate.css');
  },

  treeForVendor(vendorTree) {
    const includeFiles = this.animateCssOptions.include;
    const sourceDir = path.join(this.animateCssPath, 'source');

    const trees = [];
    if (vendorTree !== undefined) {
      trees.push(vendorTree);
    }

    let filter = '**/*.css';
    if (Array.isArray(includeFiles)) {
      includeFiles.push('_base');
      filter = (file) => {
        let fileName = path.basename(file).replace('.css', '');
        return includeFiles.includes(fileName);
      }
    }

    let animateCssTree = funnel(sourceDir, {
      include: [filter]
    });
    animateCssTree = concat(animateCssTree, {
      inputFiles: ['**/*.css'],
      outputFile: '/animate.css'
    });

    trees.push(animateCssTree);

    return merge(trees);
  }
};


/* identical to ember-cli/lib/models/addon.js's `_findHost` */
/* used instead of breaking backwards compat. w/ older versions of cli */
function findHost(addon) {
  var current = addon;
  var app;

  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));

  return app;
}
