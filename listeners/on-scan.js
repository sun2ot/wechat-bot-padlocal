/**
 * @digest 二维码模块
 * @author Hilbert Yi
 * @time 2022-01-10
 */
async function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode, {small: true})

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(status, qrcodeImageUrl)
}

module.exports = onScan