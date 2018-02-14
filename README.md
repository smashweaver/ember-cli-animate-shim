# ember-cli-animate-shim

This ember-cli addon simplifies integration of animate.css with ember-cli apps.

## Installation
```
ember install ember-cli-animate-shim
```

## Usage

- By default, all available animations will be included unless otherwise specified in your app's  *ember-cli-build.js* like so:
```
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'animate.css' : {
      include: ['bounce', 'zoomIn']
    }
  });

  return app.toTree();
};
```

- Animate by mixin

```
import Component from '@ember/component';
import AnimateMixin from 'ember-cli-animate-shim';

export default Component.extend(AnimateMixin, {
  click() {
    let log = message => {
      console.log(message);
    };

    this.animate(this.element, 'pulse').then(log);
  }
});
```

- Animate from a task

```
import Component from '@ember/component';
import AnimateMixin from 'ember-cli-animate-shim';
import { task, timeout } from 'ember-concurrency';

export default Component.extend(AnimateMixin, {
  animateTask: task(function* (animationType) {
    let message = yield this.animate(this.element, animationType);
    yield timeout(5); // allow some time between queued animations !important
    return message;
  }).enqueue(),

  execute() {
    let log = message => {
      console.log(message);
    };

    get(this, 'animateTask')
      .perform('bounce')
      .then(log);
  }
});
```

- Animate via function

```
/* your.js */
import Controller from '@ember/controller';
import { animate } from 'ember-cli-animate-shim';
import $ from 'jquery';

export default Controller.extend({
  actions: {
    openNews() {
      let callback = () => {
        window.open('//cnn.com', '_blank');
      };

      animate($('.news'), 'rubberBand').then(callback);
    }
  }
});
```

```
{{!-- your.hbs --}}
<p class="news" onclick={{action "openNews"}}>
  <span>News</span>
</p>

```
