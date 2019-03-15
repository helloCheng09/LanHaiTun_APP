var player = new Aliplayer({
  "id": "player-con",
  "source": "http://lhttp.qingting.fm/live/4804/64k.mp3",
  // "source": "http://ls.qingting.fm/live/20211612/64k.m3u8",
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
  "skinLayout": [{
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
      "children": [{
        "name": "liveDisplay",
        "align": "tlabs",
        "x": 15,
        "y": 6
      }]
    }
  ]
}, function (player) {
  player._switchLevel = 0;
});


setTimeout(() => {
  // 滚动到最底部
  var my_scroll = document.getElementsByClassName('chat_title')[0]
  my_scroll.scrollTop = 20000000
  // 获取rid
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  var timer = setInterval(() => {
    // 获取rid
    var rid = GetQueryString('rid')
    // 获取最后一条留言时间
    var lastTime = $('.chat_title li:last .char_name span').text()
    // 请求最新留言 发送最近留言时间
    var huifuUrl = "/app/index.php?i=2&c=entry&m=wxz_wzb&do=GetComment"
    var huifuData = {
      rid: rid,
      last_time: lastTime
    }
    $.ajax({
      url: huifuUrl,
      type: 'POST',
      data: huifuData,
      dataType: 'JSON',
      success(res) {
        var newData = res.data
        // console.log(res)
        if (newData) {
          // 清除定时器
          var htmlLt = ''
          newData.forEach(item => {
            if (item.ispic == 0) {
              // 如果是图片评论
              htmlLt += `
              <li data-id=${item.id}>
                <div class="chat_left">
                  <div class="head_portrait">
                    <img src="${item.headimgurl}">
                  </div>
                  </div>
                  <div class="chat_right">
                  <div class="char_name">${item.nickname}
                    <span style="display:block;color:gray;font-size:12px;">${item.time}</span>
                  </div>
                  <div class="char_message">${item.content}
                    <img src="" style="CURSOR: hand" id="215" bigimgurl="http://lanhaitun.zanhf.com/attachment/images/2/2019/03/X3AgFggxqy0vU3vLQrzLZ0Ax6VVrqF.jpg" onclick="imageClick(this)">
                    <div class="send">
                    </div>
                  </div>
                </div>
              </li>`
            } else {
              // 非图片评论
              htmlLt += `
              <li data-id=${item.id}>
                <div class="chat_left">
                  <div class="head_portrait">
                    <img src="${item.headimgurl}">
                  </div>
                  </div>
                  <div class="chat_right">
                  <div class="char_name">${item.nickname}
                    <span style="display:block;color:gray;font-size:12px;">${item.time}</span>
                  </div>
                  <div class="char_message">
                    <img src="${item.content}" style="CURSOR: hand" id="215" bigimgurl="http://lanhaitun.zanhf.com/attachment/images/2/2019/03/X3AgFggxqy0vU3vLQrzLZ0Ax6VVrqF.jpg" onclick="imageClick(this)">
                    <div class="send">
                    </div>
                  </div>
                </div>
              </li>`
            }
          });
          $('.chat_title').append(htmlLt)
          setTimeout(() => {
            my_scroll.scrollTop = 2000000000
          },200);
        } else {
          return
        }
      },
      error(res) {
        clearInterval(timer)
        layer.msg("链接超时，重新刷新尝试！")
      }
    })
  }, 1000);

}, 100);

// 点赞数增加
$('.zan-box').click(function () {
  var curNum =Number($(this).find('.zan-num').text())  + 1
  $(this).find('.zan-num').text(curNum) 
})