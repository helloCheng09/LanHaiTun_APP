var player = new Aliplayer({
  "id": "player-con",
  "source": "http://lhttp.qingting.fm/live/4804/64k.mp3",
  "width": "100%",
  "height": "100px",
  "autoplay": true,
  "isLive": true,
  "rePlay": true,
  "playsinline": true,
  "preload": true,
  "liveStartTime": "2019-02-28T16:00:00.000Z",
  "liveOverTime": "2025-05-31T08:28:28.000Z",
  "controlBarVisibility": "always",
  "useH5Prism": true,
  "skinLayout": [
    {
      "name": "bigPlayButton",
      "align": "blabs",
      "x": 30,
      "y": 80
    },
    {
      "name": "errorDisplay",
      "align": "tlabs",
      "x": 0,
      "y": 0
    },
    {
      "name": "infoDisplay"
    },
    {
      "name": "controlBar",
      "align": "blabs",
      "x": 0,
      "y": 0,
      "children": [
        {
          "name": "liveDisplay",
          "align": "tlabs",
          "x": 15,
          "y": 6
        }
      ]
    }
  ]
}, function (player) {
    player._switchLevel = 0;
    console.log("播放器创建了。");
  }
);