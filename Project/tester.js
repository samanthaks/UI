videos = [
    {
      "name": "Sheet Pan Quinoa Pizza Crust",
      "times": [
          1,3,
          4,10, 
          11, 13,
          14, 28,
          29, 38,
          39, 44,
          45, 62,
          63, 83
        ],
      "id": "F0RceeajFzk"
    },
    {
      "name": "Energy-Boosting Buddha Bowl",
      "times": [
          1,5,
          6,15, 
          16, 35,
          36, 38,
          39, 56,
          57, 91
        ],
      "id": "dbGUYwebQmE"
    },
    {
      "name": "Cucumber, Tomato, and Avocado Salad",
      "times": [
          1,6,
          7,12, 
          13, 18,
          19, 25,
          26, 29,
          30, 44
        ],
      "id": "vUBpiP9aPtg"
    }
  ];


var faves = [];
var step_list = [];
var count = 0;
var speed = 1;
var vid_array_idx = 0;

$(document).ready(function(){
  loadScript();

  $('#home-nav').addClass('active');
  $('#vid-body').hide();
  $('#vid-faves-body').hide();
  $('#remove-fave-button').hide();
  $('#remove-fave').hide();
  $('#watch-nav').hide();

  $('#watch-nav').click(function(){
    $('#watch-nav').addClass('active');
    $('#fave-nav').removeClass('active');
    $('#home-nav').removeClass('active');

    $('#vid-menu-body').hide();
    $('#vid-body').show();
    $('#vid-faves-body').hide();
  })
  $('#fave-nav').click(function(){
    $('#watch-nav').removeClass('active');
    $('#fave-nav').addClass('active');
    $('#home-nav').removeClass('active');

    $('#vid-menu-body').hide();
    $('#vid-body').hide();
    $('#vid-faves-body').show();
  })
  $('#home-nav').click(function(){
    $('#watch-nav').removeClass('active');
    $('#fave-nav').removeClass('active');
    $('#home-nav').addClass('active');

    $('#vid-menu-body').show();
    $('#vid-body').hide();
    $('#vid-faves-body').hide();
  })

  $('#add-fave-button').click(function(){
    $('#add-fave-button').hide();
    $('#add-fave').hide();

    if (faves[vid_array_idx]){
      faves[vid_array_idx].push(count);
    }
    else {
      faves[vid_array_idx] = [];
      faves[vid_array_idx].push(count);
    }
    createFavesUI();

    $('#remove-fave-button').show();
    $('#remove-fave').show();
  })
  $('#remove-fave-button').click(function(){
    $('#add-fave-button').show();
    $('#add-fave').show();

    var index = faves[vid_array_idx].indexOf(count);
    faves[vid_array_idx].splice(index, 1);
    
    createFavesUI();

    $('#remove-fave-button').hide();
    $('#remove-fave').hide();
  })

  createHomeUI();
  

})

function loadScript() {
  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var vid_id = "";
var ytplayer;

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  ytplayer.setVolume(0);
  repeatInt = setInterval('loop()', 1000);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    ytplayer.seekTo(parseInt(4), true);
    ytplayer.playVideo()
  }
}

function stopVideo() {
  player.stopVideo();
}

function pauseVideo(){
  ytplayer.pauseVideo();
}

function playVideo(){
  ytplayer.playVideo();
}

function setPlaybackRate(count){
  console.log(count);
  console.log(ytplayer.getAvailablePlaybackRates());
  ytplayer.setPlaybackRate(count);
}

function loop() {
  if (parseInt(videos[vid_array_idx]['times'][count+1]) < ytplayer.getCurrentTime()) {
  	console.log("LOOP");
  	console.log(ytplayer.getCurrentTime());
      ytplayer.seekTo(parseInt(videos[vid_array_idx]['times'][count]), true);
  }
  if (parseInt(videos[vid_array_idx]['times'][count]) > ytplayer.getCurrentTime()) {
    ytplayer.seekTo(videos[vid_array_idx]['times'][count], true);
  }
}

function createVidUI(vid_index) {
  // 2. This code loads the IFrame Player API code asynchronously.
  $('#play-prev').hide();
  $('#play-prev-button').hide();
  $('#play').hide();
  $('#play-button').hide();

  loadScript();

  vid_id = videos[parseInt(vid_index)]["id"];

  console.log("Load Video");
  console.log(vid_id);
  ytplayer = new YT.Player('player', {
    height: '390',
    width: '640',
    playerVars: { 'autoplay': 1, 'loop': 1, 'rel': 0, 'fs': 1, 
    'modestbranding' : 1, 'iv_load_policy': 3, 'controls': 0 },

    videoId: vid_id,
    events: {
      'onReady': onPlayerReady
    }
  });
  console.log(ytplayer);
  console.log("Finished Loading");

  $('#play-next-button').click(function(){
    $('#play-prev').show();
    $('#play-prev-button').show();
    count = count + 2;
    $('#step-title').html("Step ".concat(parseInt((count/2)+1)).concat(" of ").concat(parseInt(videos[vid_array_idx]['times'].length/2)));
    loop();
    if (count == videos[vid_array_idx]['times'].length - 2){
      $('#play-next').hide();
      $('#play-next-button').hide();
    }
    if (faves[vid_array_idx]){
      if (faves[vid_array_idx].indexOf(count) != -1){
        $('#add-fave-button').hide();
        $('#add-fave').hide();
        $('#remove-fave-button').show();
        $('#remove-fave').show();
      }
      else {
        $('#add-fave-button').show();
        $('#add-fave').show();
        $('#remove-fave-button').hide();
        $('#remove-fave').hide();
      }
    } else {
      $('#add-fave-button').show();
      $('#add-fave').show();
      $('#remove-fave-button').hide();
      $('#remove-fave').hide();
    }
  })

  $('#play-prev-button').click(function(){
    $('#play-next').show();
    $('#play-next-button').show();
    count = count - 2;
    $('#step-title').html("Step ".concat(parseInt((count/2)+1)).concat(" of ").concat(parseInt(videos[vid_array_idx]['times'].length/2)));
    loop();
    if (count == 0){
      $('#play-prev').hide();
      $('#play-prev-button').hide();
    }
    if (faves[vid_array_idx]){
      if (faves[vid_array_idx].indexOf(count) != -1){
        $('#add-fave-button').hide();
        $('#add-fave').hide();
        $('#remove-fave-button').show();
        $('#remove-fave').show();
      }
      else {
        $('#add-fave-button').show();
        $('#add-fave').show();
        $('#remove-fave-button').hide();
        $('#remove-fave').hide();
      }
    } else {
      $('#add-fave-button').show();
      $('#add-fave').show();
      $('#remove-fave-button').hide();
      $('#remove-fave').hide();
    }
  })

  $('#skip-step-drop').on('change', function () {
    console.log("SKIP STEP");
    var num = $(this).val(); // get selected value

    count = (num - 1)*2;
    $('#step-title').html("Step ".concat(parseInt(num)).concat(" of ").concat(parseInt(videos[vid_array_idx]['times'].length/2)));
    $('#play-next').show();
    $('#play-next-button').show();
    $('#play-prev').show();
    $('#play-prev-button').show();
    if (count == videos[vid_array_idx]['times'].length - 2){
      $('#play-next').hide();
      $('#play-next-button').hide();
    }
    if (count == 0){
      $('#play-prev').hide();
      $('#play-prev-button').hide();
    }
    $('#skip-step-drop').val(0);
    if (faves[vid_array_idx]){
      if (faves[vid_array_idx].indexOf(count) != -1){
        $('#add-fave-button').hide();
        $('#add-fave').hide();
        $('#remove-fave-button').show();
        $('#remove-fave').show();
      }
      else {
        $('#add-fave-button').show();
        $('#add-fave').show();
        $('#remove-fave-button').hide();
        $('#remove-fave').hide();
      }
    } else {
      $('#add-fave-button').show();
      $('#add-fave').show();
      $('#remove-fave-button').hide();
      $('#remove-fave').hide();
    }
    loop();
  
  });

  $('#pause-button').click(function(){
    pauseVideo();
    $('#play').show();
    $('#play-button').show();
    $('#pause').hide();
    $('#pause-button').hide();
  })

  $('#play-button').click(function(){
    playVideo();
    $('#pause').show();
    $('#pause-button').show();
    $('#play').hide();
    $('#play-button').hide();
  })

  $('#play-slower-button').click(function(){
    speed -= 0.25;
    setPlaybackRate(speed);
  })

  $('#play-faster-button').click(function(){
    speed += 0.25;
    setPlaybackRate(speed);
  })
}


function createFavesUI() {
  console.log("making list");
  $('#vid-faves-body').empty();
  console.log(faves);
  for (var key in faves) {
    console.log(key);
    var new_vid_fave = '<div class="row"><div class="col-md-6 offset-md-3"><div class="row fave-title">'
      + '<h6>' + videos[parseInt(key)]['name'] + '</h6>'
      + '</div>';
    faves[key].sort();
    faves[key].forEach ((element, index, array) => {
      step = (element/2)+1;
      new_vid_fave += '<div class="row menu-item-row">'
      + '<button type="button" class="btn btn-light watch-fave-vid" id="'+element+'"" value="'+ parseInt(key) +'">Step '
      + step + '</button>'
      + '</div>';
      console.log(element);
    });
    new_vid_fave += '</div></div>';
    $('#vid-faves-body').append(new_vid_fave);
  }

  $('.watch-fave-vid').on("click", function(event){
    console.log("fave video clicked");
    vid_array_idx = parseInt(event['target']['value']);
    ytplayer.loadVideoById(videos[vid_array_idx]["id"]);

    count = parseInt(event['target']['id']);
    loadVideoPage();
  });
  
}


function createHomeUI() {
  videos.forEach((element, index, array) => {
    var new_row = $('<div class="row menu-item-row">' 
      + '<div class="col-md-6 offset-md-3">'
      + '<button type="button" class="btn btn-light watch-vid" value="'+index+'">'
      + element.name + '</button></div>'
      + '</div>');
    $("#vid-menu-body").append(new_row);
  });

  $('.watch-vid').on("click", function(event){
    console.log("video clicked");
    vid_array_idx = parseInt(event['target']['value']);
    if (ytplayer) {
      ytplayer.loadVideoById(videos[vid_array_idx]["id"]);
    }
    else{
      createVidUI(vid_array_idx);
    }

    count = 0;
    $('#play-prev').hide();
    $('#play-prev-button').hide();
    $('#play-next').show();
    $('#play-next-button').show();
    loadVideoPage();
  });

}
  
function loadVideoPage() {
  step_list = [];
  for (var i = 0; i <= videos[vid_array_idx]["times"].length - 2; i = i + 2) {
    step_list.push(i/2 + 1);
  }

  var option = '';
  $('#skip-step-drop').empty();
  for (var i=0;i<step_list.length;i++){
     option += '<option value="'+ step_list[i] + '">' + step_list[i] + '</option>';
  }
  $('#skip-step-drop').append(option);
  $('#skip-step-drop').val(0);

  $('#recipe-title').html(videos[vid_array_idx]["name"]);
  $('#step-title').html("Step ".concat(parseInt((count/2)+1)).concat(" of ").concat(parseInt(videos[vid_array_idx]['times'].length/2)));

  $('#watch-nav').show();
  $('#watch-nav').addClass('active');
  $('#fave-nav').removeClass('active');
  $('#home-nav').removeClass('active');

  $('#vid-menu-body').hide();
  $('#vid-body').show();
  $('#vid-faves-body').hide();

  if (faves[vid_array_idx]){
    if (faves[vid_array_idx].indexOf(count) != -1){
      $('#add-fave-button').hide();
      $('#add-fave').hide();
      $('#remove-fave-button').show();
      $('#remove-fave').show();
    }
    else {
      $('#add-fave-button').show();
      $('#add-fave').show();
      $('#remove-fave-button').hide();
      $('#remove-fave').hide();
    }
  } else {
    $('#add-fave-button').show();
    $('#add-fave').show();
    $('#remove-fave-button').hide();
    $('#remove-fave').hide();
  }
}


