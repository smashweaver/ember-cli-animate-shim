import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { animate } from 'ember-cli-animate-shim';
import $ from 'jquery';

export default Controller.extend({
  animationType: null,

  actions: {
    nop() {},

    changeAnimationType(animationType) {
      set(this, 'animationType', animationType);
    },

    animate() {
      let animationType = get(this, 'animationType');
      set(this, 'animationType', null);
      set(this, 'animationType', animationType);
    },

    viewGithub() {
      let viewGithub = () => {
         window.open('//github.com/smashweaver/ember-cli-animate-shim', '_blank');
      };

      animate($('.view-github'), 'rubberBand')
        .then(viewGithub);
    }
  }
});
