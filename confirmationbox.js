$(document).ready(function() {

  // Show confirmation box at the right scrolling moment
  window.onscroll = function() {
    var body = document.querySelector('body');
    var scrollTop = body.scrollTop;
    var confirmation = $('#confirmation');

    if (250 < scrollTop && 1000 < window.screen.width) {
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

  function updateConfirmationBox () {
    var image = '<img src="image/logo.jpg" width="30" height="30" style="position: relative; bottom: 8px;">';

    if (noCausesSelected()) {
      $('#confirmation').html(
        'You haven\'t selected any causes yet. <br/><br/><br/>' +
        image + image + image
      );

      return;
    }

    $('#confirmation').html('You\'ve pledged to donate:<br/><br/>');
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
