const fs = require('fs')
const chalk = require('chalk')
// EDIT DISINI
global.owner = ['16196268188''] // no own
global.packname = '© HARDZ HOSTING' // nama pack sticker
global.author = 'ঔৣ⃕᭝𝐇𝚫𝐑𝐃𝐙𝐌𝚯𝐃͢𝐙᭄'// nama author 
global.domain = 'https://ranzzkon.panellstore.xyz' // Isi Domain Lu
global.apikey = 'ptla_0wwiQHKVvrqDiDJVKQUK7HdhgMJteTebG1tTvtnlazt' // Isi Apikey Plta Lu
global.capikey = 'ptlc_t85TvU0NSIPhBUFJSUoWVq32NCvGHMbDXSThYGjQaFC' // Isi Apikey Pltc Lu
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location

global.qrisdana = { url: 'https://telegra.ph/file/a84e6c97a0593a1cf5130.jpg'}
global.qrisgopay = { url: 'https://telegra.ph/file/a84e6c97a0593a1cf5130.jpg'}
global.jasapanel = { url: 'https://telegra.ph/file/a84e6c97a0593a1cf5130.jpg'}
global.menu = { url: 'https://telegra.ph/file/a84e6c97a0593a1cf5130.jpg'}
global.anjay = { url: 'https://telegra.ph/file/a84e6c97a0593a1cf5130.jpg'}
global.qrisallpay = { url: 'https://telegra.ph/file/a84e6c97a0593a1cf5130.jpg' } //Gak Usah Di Ganti

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})