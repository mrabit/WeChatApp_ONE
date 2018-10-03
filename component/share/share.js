// component/share/share.js
let defaultTextY = 180;
let {
  requestData
} = require('../../utils/util.js');
let dayjs = require('dayjs');
Component({
  properties: {
    oneInfo: {
      type: Object,
      value: {}
    },
    articleInfo: {
      type: Object,
      value: {}
    },
    category: {
      type: String,
      value: "one"
    },
  },
  data: {
    one: {},
    article: {},
    bg: "",
    qrcode: ""
  },
  ready() {
    let {
      oneInfo,
      articleInfo,
      category
    } = this.properties;
    // 生成渲染canvas数据
    if (category === "one") {
      return this.setData({
        one: {
          volume: {
            text: oneInfo.volume,
            x: 30,
            marginTop: 15,
            align: "left"
          },
          title: {
            text: `${oneInfo.title} | ${oneInfo.pic_info}`,
            x: 30,
            y: defaultTextY,
            align: "right"
          },
          day: {
            text: oneInfo.day,
            y: defaultTextY + 20 + 50,
            fontSize: 50,
            marginTop: 20,
            align: "center"
          },
          date: {
            text: oneInfo.date,
            fontSize: 18,
            marginTop: 20,
            align: "center"
          },
          forward: {
            text: oneInfo.forward,
            marginTop: 30,
            maxWidth: 325,
            fontSize: 14,
            align: "center"
          },
          words_info: {
            text: oneInfo.words_info,
            marginTop: 10,
            fontSize: 14,
            align: "center"
          }
        },
        bg: oneInfo.img_url,
        qrcode: oneInfo.qrcode
      })
    }

    this.setData({
      article: {
        title: {
          text: articleInfo.title,
          x: 30,
          marginTop: 15,
          fontSize: 16,
          align: "center"
        },
        day: {
          text: dayjs(articleInfo.post_date).format('DD'),
          y: defaultTextY + 20 + 30,
          fontSize: 30,
          marginTop: 20,
          align: "center"
        },
        date: {
          text: dayjs(articleInfo.post_date).format('MMM.YYYY'),
          fontSize: 18,
          marginTop: 20,
          align: "center"
        },
        guide_word: {
          text: articleInfo.guide_word,
          marginTop: 30,
          maxWidth: 325,
          fontSize: 16,
          align: "center"
        },
        author: {
          text: (articleInfo.author_list || []).map(function(v) {
            return v.user_name;
          }).join(','),
          marginTop: 30,
          fontSize: 12,
          align: "center"
        },
        author_introduce: {
          text: articleInfo.author_introduce,
          marginTop: 10,
          fontSize: 12,
          align: "center"
        }
      },
      bg: articleInfo.img_url,
      qrcode: articleInfo.qrcode
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 下载网络图片到本地资源
    downFile(url) {
      return new Promise(resolve => {
        wx.getImageInfo({
          src: "https:" + url,
          success({
            path
          }) {
            resolve(path)
          }
        })
      })
    },
    // 点击分享到朋友圈
    handleClickGenerateShareImg() {
      let {
        category
      } = this.properties;
      wx.showLoading({
        title: '生成中,请稍后...',
      })
      let bg = this.data.bg;
      let qrcode = Promise.resolve(this.data.qrcode);
      let ctx = wx.createCanvasContext("myCanvas", this);
      // 当前不存在二维码,在线生成
      if (!this.data.qrcode) {
        qrcode = this.getQRCode(this.properties[category + "Info"].id);
      }
      qrcode.then(qrcode => {
        this.setData({
          qrcode
        });
        return Promise.all([this.downFile(this.data.bg), this.downFile(qrcode)])
      }).then(([bg, qrcode]) => {
        // 填充背景颜色
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 375, 600);
        // 设置阴影
        ctx.setShadow(0, 1, 10, "rgba(127,127,127,0.4)");
        // 渲染bg
        ctx.drawImage(bg, 0, 0, 375, 265);
        // 渲染圆角矩形
        roundRect(ctx, 15, 180, 345, 441 - 180 + 20, 10);

        // 设置填充颜色
        ctx.setFillStyle('rgba(127,127,127,1)');
        // 取消阴影
        ctx.setShadow(0, 0, 0, "black");
        // 渲染qrcode
        // 小程序码
        ctx.drawImage(qrcode, 375 / 2 - 50, 600 - 138 + (138 - 100) / 2, 100, 100);
        //二维码
        // ctx.drawImage(qrcode, 375 / 2 - 50, 600 - 138 + (138 - 113) / 2, 100, 113);

        // 文字渲染
        let arr = [];
        for (var i in this.data[category]) {
          arr.push(this.data[category][i]);
        }
        // 441
        arr.reduce((prevY, next) => {
          let y = next.marginTop ? prevY + (next.fontSize || 12) + 2 + next.marginTop : prevY;
          return writeText({
            ctx,
            text: next.text,
            x: next.x,
            y,
            align: next.align,
            fontSize: next.fontSize,
            maxWidth: next.maxWidth
          });
        }, defaultTextY);
        ctx.draw(true, _ => {
          console.log('draw done');
          // 保存canvas到本地资源
          wx.canvasToTempFilePath({
            canvasId: "myCanvas",
            success(res) {
              // 隐藏loading
              wx.hideLoading();
              wx.showToast({
                title: '长按保存图片后分享到朋友圈.',
                icon: 'none',
                duration: 2000,
                success() {
                  setTimeout(_ => {
                    // 图片预览
                    wx.previewImage({
                      urls: [res.tempFilePath, 'https://one.img.mrabit.com/appreciate.png'],
                    });
                    // 保存到相册
                    // wx.saveImageToPhotosAlbum({
                    //   filePath: res.tempFilePath,
                    //   success: _ => {
                    //     wx.showToast({
                    //       title: '保存到系统相册成功.',
                    //       icon: 'none',
                    //       duration: 1000
                    //     });
                    //   },
                    //   fail: _ => {
                    //     wx.showToast({
                    //       title: '请查看是否允许保存到系统相册.',
                    //       icon: 'none',
                    //       duration: 1000,
                    //       success: _ => {
                    //         wx.openSetting();
                    //       }
                    //     });
                    //   }
                    // });
                  }, 2000);
                }
              })
            },
            fail(e) {
              console.log(e)
            }
          }, this);
        });
      })
    },
    // 当前数据无qrcode,在线获取
    getQRCode(id) {
      let {
        category
      } = this.properties;
      let path = (category === "one" ? 'pages/oneDetails/oneDetails' : 'pages/articleDetails/articleDetails') + "?id=" + id;
      return requestData(`/api/wx/get_qrcode`, {
        'type': category,
        id,
        path
      });
    }
  }
})


function roundRect(ctx, x, y, w, h, r) {
  // 开始绘制
  ctx.beginPath()
  // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
  // 这里是使用 fill 还是 stroke都可以，二选一即可
  ctx.setFillStyle('rgba(255, 255, 255, 0.8)')
  // 左上角
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

  // border-top
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.lineTo(x + w, y + r)
  // 右上角
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

  // border-right
  ctx.lineTo(x + w, y + h - r)
  ctx.lineTo(x + w - r, y + h)
  // 右下角
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

  // border-bottom
  ctx.lineTo(x + r, y + h)
  ctx.lineTo(x, y + h - r)
  // 左下角
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

  // border-left
  ctx.lineTo(x, y + r)
  ctx.lineTo(x + r, y)

  // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
  ctx.fill()
  // ctx.stroke()
  ctx.closePath()
  ctx.draw(true)
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
    return;
  }

  var context = ctx;
  if (typeof maxWidth == 'undefined') {
    maxWidth = 375 - 30;
  }
  if (typeof lineHeight == 'undefined') {
    lineHeight = context.measureText("测").width + 2;
  }

  // 字符分隔为数组
  var arrText = text.split('');
  var line = '';
  var num = 0;
  for (var n = 0; n < arrText.length; n++) {
    var testLine = line + arrText[n];
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    // 文字大于三行,丢弃
    if (num >= 3) break;
    // 当前行文字超出预定宽度,或者当前行为第三行
    if ((testWidth > maxWidth || (num === 2 && (testWidth + 16) > maxWidth)) && n > 0) {
      context.fillText(num === 2 ? line + "...." : line, x, y);
      line = arrText[n];
      y += lineHeight;
      num++;
    } else {
      line = testLine;
    }
  }
  if (num < 3) {
    // 当前行数小于三,剩下文字渲染
    context.fillText(line, x, y);
  }
  return y;
}

function writeText({
  ctx,
  text,
  x,
  y,
  align = "left",
  fontSize = "12",
  maxWidth
}) {
  ctx.textAlign = align;
  ctx.font = `${fontSize}px PingFangSC-Light sans-serif`;
  if (align == "right") {
    x = 375 - x;
  }
  if (align == "center") {
    x = 375 / 2;
  }
  return wrapText(ctx, text, x, y, maxWidth);
}