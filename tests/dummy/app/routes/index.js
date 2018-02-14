import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';
import { later, scheduleOnce } from '@ember/runloop';

export default Route.extend({
  onActivate: on('activate', function(){
    scheduleOnce('afterRender', this, function() {
      later(this, function() {
        this.controller.send('changeAnimationType', 'bounce');
      }, 1250);
    });
  })
});
