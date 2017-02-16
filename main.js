$(document).ready(function() {

  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  // Maintain sizing on icon blocks
  var $iconBlocks = $('.icon-holder .w-col .text-div');

  function matchHeights(){
    $iconBlocks.height('auto');
    var max = Math.max.apply( null, $iconBlocks.map(function(i,e){ return $(e).height()}));
    $iconBlocks.height(max);
  }
  matchHeights();
  $(window).on('resize', throttle(matchHeights, 250))



  // Show confirmation box at the right scrolling moment
  window.onscroll = function() {
    var body = document.querySelector('body');
    var scrollTop = body.scrollTop;
    var confirmation = $('#confirmation');

    if (450 < scrollTop && !window.confirmationDismissed) {
      confirmation.addClass('show');
    }
  };

  window.confirmation = {
    'deportation': false,
    'islam': false,
    'voting': false,
    'cities': false,
    'news': false,
    'protest': false,
    'howmuch': 1,
  };

  window.confirmationPhrase = {
    'deportation': 'deportation or walls',
    'islam': 'Islam or bans',
    'voting': 'crooked elections',
    'cities': 'inner cities or law and order',
    'news': 'fake news',
    'protest': 'protesters',
  }

  function noCausesSelected () {
    return window.confirmation['deportation'] === false &&
           window.confirmation['islam'] === false &&
           window.confirmation['voting'] === false &&
           window.confirmation['cities'] === false &&
           window.confirmation['news'] === false &&
           window.confirmation['protest'] === false;
  };

  $(document).on('click','#dismiss',function(e){
    $('#confirmation').remove();
    window.confirmationDismissed = true;
  });

  function updateConfirmationBox () {
    var image = '<img src="image/logo.jpg" width="30" height="30" style="position: relative; bottom: 8px;">';

    if (noCausesSelected()) {
      $('#confirmation').html(
        'You haven\'t selected any causes yet! <br/><br/><br/>' +
        '<div style="position: absolute; top: 20px; right: 30px; cursor: pointer;" id="dismiss">x</div>' +
        image + image + image
      );

      return;
    }

    $('#confirmation').html(
      'You\'ve pledged to donate:<br/><br/>' +
      '<div style="position: absolute; top: 20px; right: 30px; cursor: pointer;" id="dismiss">x</div>'
    );
    Object.keys(window.confirmation).map(function (key) {
      if (window.confirmation[key] === true) {
        var phrase = window.confirmationPhrase[key];
        $('#confirmation').append(
          '<div class="confirmation-item">' +
          '$' + window.confirmation.howmuch + ' each time ' + image +
          ' tweets about ' + phrase + '.' + '<br/>' +
          '</div>'
        );
      }
    });
  };

  updateConfirmationBox();

  $('label[for="mce-group[335]-335-0"]').click(function (event) {
    window.confirmation.deportation = event.target.checked;
    updateConfirmationBox();
  });

  $('label[for="mce-group[335]-335-1"]').click(function (event) {
    window.confirmation.islam = event.target.checked;
    updateConfirmationBox();
  });

  $('label[for="mce-group[335]-335-2"]').click(function (event) {
    window.confirmation.voting = event.target.checked;
    updateConfirmationBox();
  });

  $('label[for="mce-group[335]-335-3"]').click(function (event) {
    window.confirmation.protest = event.target.checked;
    updateConfirmationBox();
  });

  $('label[for="mce-group[335]-335-4"]').click(function (event) {
    window.confirmation.news = event.target.checked;
    updateConfirmationBox();
  });

  $('label[for="mce-group[335]-335-5"]').click(function (event) {
    window.confirmation.cities = event.target.checked;
    updateConfirmationBox();
  });

  $('#mce-MMERGE1').change(function (event) {
    window.confirmation.howmuch = event.target.value;
    updateConfirmationBox();
  });
});
