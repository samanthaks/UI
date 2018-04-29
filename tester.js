videos = [
    {
      "name": "Gyoza Dumplings",
      "times": [
          59, 61,
          62, 69, 
          70, 73,
          74, 85,
          86, 87,
          88, 91,
          92, 93,
          94, 98,
          99, 103
        ],
      "id": "8JXyDtsVGQ0",
      "img": "gyo1za.jpg",
      "steps": [
        {
          "name": "Step 1",
          "description": "Put pork, sake, salt, and sugar in a bowl. Mix until meat is sticky."
        },
        {
          "name": "Step 2",
          "description": "Combine garlic, ginger, soy sauce, sesame oil, potato starch, cabbage, and chive. Mix them very well in a bowl."
        },
        {
          "name": "Step 3",
          "description": "Scoop a spoonful of filling onto the middle of the gyoza skin. Apply water for skin edge with your finger."
        },
        {
          "name": "Step 4",
          "description": "Fold in half and pinch pleats into the edges, then wrap up."
        },
        {
          "name": "Step 5",
          "description": "Heat sesame oil in the pan and lay gyoza in single layer. Keep on medium heat for 2 minutes."
        },
        {
          "name": "Step 6",
          "description": "When gyoza turns brown, pour in slurry and put the lid on. Steam for 3 minutes."
        },
        {
          "name": "Step 7",
          "description": "Take off the lid, put more sesame oil and cook over low heat."
        },
        {
          "name": "Step 8",
          "description": "Cover a pan with a plate, turn over a pan."
        },
        {
          "name": "Step 9",
          "description": "Enjoy!"
        }]
    },
    {
      "name": "Rose Dumplings",
      "times": [
          59, 61,
          62, 69, 
          70, 73,
          74, 85,
          86, 87,
          88, 91,
          92, 93,
          94, 98,
          99, 103
        ],
      "id": "8JXyDtsVGQ0", // after gyoza dumpling
      "img": "rosedumpling.png"
    },
    // {
    //   "name": "Vegetarian Potstickers",
    //   "times": [
    //       59, 61,
    //       62, 69, 
    //       70, 73,
    //       74, 85,
    //       86, 87,
    //       88, 91,
    //       92, 93,
    //       94, 98,
    //       99, 103
    //     ],
    //   "id": "K2UieyGTHOw",
    //   "img": "vegpotsticker.png"
    // },
    {
      "name": "Pan-Fried Soup Dumplings",
      "times": [
          59, 61,
          62, 69, 
          70, 73,
          74, 85,
          86, 87,
          88, 91,
          92, 93,
          94, 98,
          99, 103
        ],
      "id": "pEdMpRuFGEk", 
      "img": "panfriedsoupdumpling.png"
    }
  ];



var step_list = [];
var count = 0;
var vid_array_idx = 0;
var loop_on = false;

$(document).ready(function(){
  loadScript();

  $('#home-nav').addClass('active');
  $('#vid-area').hide();
  $('#watch-nav').hide();

  $('#watch-nav').click(function(){
    $('#watch-nav').addClass('active');
    $('#home-nav').removeClass('active');

    $('#vid-menu-body').hide();
    $('#vid-area').show();
  })
  $('#home-nav').click(function(){
    $('#watch-nav').removeClass('active');
    $('#home-nav').addClass('active');

    $('#vid-menu-body').show();
    $('#vid-area').hide();
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
  repeatInt = setInterval('play_steps()', 1000);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    ytplayer.seekTo(parseInt(4), true);
    ytplayer.playVideo();
  }
}

function stopVideo() {
  player.stopVideo();
}

function pauseVideo(){
  ytplayer.pauseVideo();
  $('#play').show();
  $('#play-button').show();
  $('#pause').hide();
  $('#pause-button').hide();
}

function playVideo(){
  ytplayer.playVideo();
  $('#pause').show();
  $('#pause-button').show();
  $('#play').hide();
  $('#play-button').hide();
}

function setPlaybackRate(speed){
  ytplayer.setPlaybackRate(speed);
}

function play_steps() {
  if (loop_on){
    if (parseInt(videos[vid_array_idx]['times'][count+1]) < ytplayer.getCurrentTime()) {
    	console.log("LOOP");
    	console.log(ytplayer.getCurrentTime());
      ytplayer.seekTo(parseInt(videos[vid_array_idx]['times'][count]), true);
    }
    if (parseInt(videos[vid_array_idx]['times'][count]) > ytplayer.getCurrentTime()) {
      ytplayer.seekTo(videos[vid_array_idx]['times'][count], true);
    }
  }
  else {
    if (parseInt(videos[vid_array_idx]['times'][count+1]) < ytplayer.getCurrentTime()) {
      ytplayer.seekTo(parseInt(videos[vid_array_idx]['times'][count]), true);
      pauseVideo();
    }
    if (parseInt(videos[vid_array_idx]['times'][count]) > ytplayer.getCurrentTime()) {
      ytplayer.seekTo(videos[vid_array_idx]['times'][count], true);
    }
  }
}

function createVidUI(vid_index) {
  // 2. This code loads the IFrame Player API code asynchronously.
  $('#play').hide();
  $('#play-button').hide();

  loadScript();

  vid_id = videos[parseInt(vid_index)]["id"];

  console.log("Load Video");
  console.log(vid_id);
  ytplayer = new YT.Player('player', {
    height: '390',
    width: '100%',
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
    $('#step-num').html("Step ".concat(parseInt((count/2)+1)).concat(" of ").concat(parseInt(videos[vid_array_idx]['times'].length/2)));
    $('#step-title').html(videos[parseInt(vid_index)]["steps"][parseInt((count/2)+1)-1]["description"]);

    ytplayer.seekTo(parseInt(videos[vid_array_idx]['times'][count]), true);
    playVideo();

    if (count == videos[vid_array_idx]['times'].length - 2){
      $('#play-next').hide();
      $('#play-next-button').hide();
      $('#finished').show();
    }
  })

  $('#play-prev-button').click(function(){
    $('#play-next').show();
    $('#play-next-button').show();
    $('#finished').hide();
    if (count != 0){
      count = count - 2;
      $('#step-num').html("Step ".concat(parseInt((count/2)+1)).concat(" of ").concat(parseInt(videos[vid_array_idx]['times'].length/2)));
      $('#step-title').html(videos[parseInt(vid_index)]["steps"][parseInt((count/2)+1)-1]["description"]);
      ytplayer.seekTo(parseInt(videos[vid_array_idx]['times'][count]), true);
      playVideo();
    }
    else {
      ytplayer.seekTo(parseInt(videos[vid_array_idx]['times'][count]), true);
      playVideo();
    }
  })


  $('#speed-list a').click(function(e) {
    $('#speed-list a.active').removeClass('active');
    var speed = $(this).text();
    speed = parseFloat(speed.substring(0, speed.length-1));
    $(this).addClass('active');
    console.log("set speed to ", speed);
    e.stopPropagation();
    setPlaybackRate(speed);
  });


  $('#pause-button').click(function(){
    pauseVideo();
  })

  $('#play-button').click(function(){
    playVideo();
  })

  $('#finished').click(function(){
    alert("Congrats you've learnt how to make " + videos[vid_array_idx]["name"] + "!! Watch more videos to learn more recipes!");
    $('#watch-nav').removeClass('active');
    $('#home-nav').addClass('active');

    $('#vid-menu-body').show();
    $('#vid-area').hide();
  })

  $('#unloop-button').click(function(){
    console.log('unloop');
    $('#loop-button').show();
    $('#unloop-button').hide();
    loop_on = false;
  })

  $('#loop-button').click(function(){
    console.log('loop');
    $('#loop-button').hide();
    $('#unloop-button').show();
    loop_on = true;
  })

}



function createHomeUI() {
  // videos.forEach((element, index, array) => {
  //   var new_row = $('<div class="row menu-item-row">' 
  //     + '<div class="col-md-6 offset-md-3">'
  //     + '<button type="button" class="btn btn-light watch-vid" value="'+index+'">'
  //     + element.name + '</button></div>'
  //     + '</div>');
  //   $("#vid-menu-body").append(new_row);
  // });

  var new_row = $('<div class="row menu-item-row">' 
    + '<div class="col-md-6 offset-md-3">'
    + '<button type="button" class="btn btn-light watch-vid" value="0">'
    + videos[0].name + '</button></div>'
    + '</div>');
  $("#vid-menu-body").append(new_row);

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
    $('#play-next').show();
    $('#play-next-button').show();
    loadVideoPage();
  });

}
  
function loadVideoPage() {
  $('#finished').hide();
  step_list = [];
  for (var i = 0; i <= videos[vid_array_idx]["times"].length - 2; i = i + 2) {
    step_list.push(i/2 + 1);
  }

  console.log(step_list);

  $('#unloop-button').hide();


  $('#recipe-icon').html('<img src="'.concat(videos[vid_array_idx]["img"]).concat('" id="vid-icon">'));
  $('#recipe-title').html(videos[vid_array_idx]["name"])
  $('#step-num').html("Step ".concat(parseInt((count/2)+1)).concat(" of ").concat(parseInt(videos[vid_array_idx]['times'].length/2)));
  $('#step-title').html(videos[vid_array_idx]["steps"][parseInt((count/2)+1)-1]["description"]);
  // $('#recipe-title').html(videos[vid_array_idx]["name"]);

  $('#watch-nav').show();
  $('#watch-nav').addClass('active');
  $('#home-nav').removeClass('active');

  $('#vid-menu-body').hide();
  $('#vid-area').show();

  videos[vid_array_idx]["steps"].forEach((element, index, array) => {
    console.log(index+1);
    var new_row = $('<div class="playlist-item dropdown-item" value="'+ (index+1) +'"><strong>'
      + element['name'] + ':</strong> ' + videos[vid_array_idx]["steps"][index]["description"]
      + '</div>');
    if (index == 0){
      new_row.addClass('active');
    }
    $("#playlist-body").append(new_row);

  });

  $('#playlist-body div').click(function(e) {
    console.log('hello');
    $('#playlist-body div.active').removeClass('active');
    $(this).addClass('active');

    var num = parseInt(e['target']['attributes']['value']['nodeValue']);
    count = (num - 1)*2;
    $('#step-num').html("Step ".concat(parseInt(num)).concat(" of ").concat(parseInt(videos[vid_array_idx]['times'].length/2)));
    $('#step-title').html(videos[vid_array_idx]["steps"][parseInt((count/2)+1)-1]["description"]);

    ytplayer.seekTo(parseInt(videos[vid_array_idx]['times'][count]), true);
    if (count == videos[vid_array_idx]['times'].length - 2){
      $('#play-next').hide();
      $('#play-next-button').hide();
      $('#finished').show();
    }
    else{
      $('#play-next').show();
      $('#play-next-button').show();
      $('#finished').hide();
    }
    playVideo();

    e.stopPropagation();
  });

}


