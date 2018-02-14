/* eslint no-console: 0 */
import Component from '@ember/component';
import layout from '../templates/components/x-animatable';
import AnimateMixin from 'ember-cli-animate-shim';
import { get } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extend(AnimateMixin, {
  layout,

  animateTask: task(function* (animationType) {
    let result = yield this.animate(this.element, animationType);
    yield timeout(5); // allow some time between queued animations !important
    return result;
  }).enqueue(),

  execute() {
    let animationType = get(this, 'animationType');
    let log = message => {
      console.log(message);
    };

    get(this, 'animateTask')
      .perform(animationType)
      .then(log);
  },

  didUpdateAttrs() {
    this.execute();
  }
});
