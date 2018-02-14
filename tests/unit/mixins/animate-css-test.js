import EmberObject from '@ember/object';
import AnimateCssMixin from 'ember-cli-animate-shim/mixins/animate-css';
import { module, test } from 'qunit';

module('Unit | Mixin | animate css');

// Replace this with your real tests.
test('it works', function(assert) {
  let AnimateCssObject = EmberObject.extend(AnimateCssMixin);
  let subject = AnimateCssObject.create();
  assert.ok(subject);
});
