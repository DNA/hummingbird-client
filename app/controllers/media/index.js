import Controller from 'ember-controller';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';
import jQuery from 'jquery';
import getter from 'client/utils/getter';
import { moment } from 'client/utils/moment';

export default Controller.extend({
  mediaQueryParams: [
    'averageRating',
    'genres',
    'text',
    'year'
  ],
  averageRating: [0.5, 5.0],
  genres: [],
  text: undefined,
  year: [1907, moment().year() + 1],

  router: service('-routing'),

  isAnime: getter(function() {
    return get(this, 'router.currentRouteName').split('.')[0] === 'anime';
  }),

  isManga: getter(function() {
    return get(this, 'router.currentRouteName').split('.')[0] === 'manga';
  }),

  maxYear: getter(() => moment().year() + 1),

  init() {
    this._super(...arguments);
    const mediaQueryParams = get(this, 'mediaQueryParams');
    const queryParams = get(this, 'queryParams');
    set(this, 'queryParams', Object.assign(mediaQueryParams, queryParams));
  },

  _handleScroll() {
    if (jQuery(document).scrollTop() >= 51) {
      jQuery('.filter-options').addClass('scrolled');
      jQuery('.search-media').addClass('scrolled');
    } else {
      jQuery('.filter-options').removeClass('scrolled');
      jQuery('.search-media').removeClass('scrolled');
    }
  },

  _setDirtyValues() {
    set(this, 'dirtyYear', get(this, 'year'));
    set(this, 'dirtyRating', get(this, 'averageRating'));
  }
});
