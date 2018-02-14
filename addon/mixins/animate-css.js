import Mixin from '@ember/object/mixin';
import { isPresent, isEmpty } from '@ember/utils';
import { bind, scheduleOnce } from '@ember/runloop';
import { Promise, race } from 'rsvp';
import $ from 'jquery';

const AnimationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

export function wait(delay, animationType) {
  return new Promise(function(resolve) {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(`${animationType} timed out!`);
    }, delay)
  });
}

export function animate(target, animationType) {
  return new Promise(function(resolve) {
    if (isEmpty(animationType)) {
      resolve('animation is empty!');
    } else {
      scheduleOnce('afterRender', function() {
        let classes = 'animated ' + animationType;
        $(target)
          .one(AnimationEnd, bind(this, function(e) {
            $(e.currentTarget).removeClass(classes);
            resolve(`${animationType} completed!`);
          }))
          .addClass(classes);
      });
    }
  });
}

export function animateWithTimeout(target, animationType, timeout) {
  let p = [];
  p.push(animate(target, animationType));

  if (isPresent(timeout)) {
    p.push(wait(timeout, animationType));
  }

  return race(p);
}

export default Mixin.create({
  animate(target, animationType, timeout) {
    return animateWithTimeout(target, animationType, timeout);
  }
});
