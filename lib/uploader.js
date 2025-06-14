const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const { downloadMediaMessage } = require('baileys-pro')

async function CatBox(path) {
  const data = new FormData()
  data.append('reqtype', 'fileupload')
  data.append('userhash', '')
  data.append('fileToUpload', fs.createReadStream(path))

  const config = {
    method: 'POST',
    url: 'https://catbox.moe/user/api.php',
    headers: {
      ...data.getHeaders(),
      'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
    },
    data
  }

  const api = await axios.request(config)
  return api.data
}

async function downloadAndSaveMedia(message) {
  const buffer = await downloadMediaMessage(message, 'buffer', {}, { logger: console })
  const ext = message.mtype.includes('image') ? 'jpg' :
              message.mtype.includes('video') ? 'mp4' :
              message.mtype.includes('audio') ? 'mp3' : 'bin'
  const filename = `./temp/${Date.now()}.${ext}`
  fs.writeFileSync(filename, buffer)
  return filename
}

module.exports = { CatBox, downloadAndSaveMedia }