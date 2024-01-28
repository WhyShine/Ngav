require('../config/settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const cheerio = require("cheerio");
const chalk = require("chalk");
const crypto = require("crypto");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const Jimp = require("jimp");
const util = require("util");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const { color, bgcolor, mycolor } = require('./lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, parseMention, getRandom } = require('./lib/functions')

module.exports = xd = async (xd, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await xd.decodeJid(xd.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const { chats } = m
const owner = JSON.parse(fs.readFileSync('./config/seller.json').toString())
const isSeler = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const isGroup = m.key.remoteJid.endsWith('@g.us')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await xd.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const pler = JSON.parse(fs.readFileSync('./js/db/idgrup.json').toString())
const jangan = m.isGroup ? pler.includes(m.chat) : false	
if (!xd.public) {
if (!m.key.fromMe) return
}
// auto read
if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
		
try {
ppuser = await xd.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

const generateProfilePicture = async(buffer) => {
const jimp_1 = await Jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}
}
		//WAKTU
			var ase = new Date();
                        var jamss = ase.getHours();
                         switch(jamss){
                case 0: jamss = "Malam"; break;
                case 1: jamss = "Malam"; break;
                case 2: jamss = "Malam"; break;
                case 3: jamss = "Pagi 🌔"; break;
                case 4: jamss = "Pagi🌔"; break;
                case 5: jamss = "Pagi 🌄"; break;
                case 6: jamss = "Pagi 🌄"; break;
                case 7: jamss = "Pagi 🌄"; break;
                case 8: jamss = "Pagi ☀️"; break;
                case 9: jamss = "Pagi ☀️"; break;
                case 10: jamss = "Pagi ☀️"; break;
                case 11: jamss = "Siang 🌞"; break;
                case 12: jamss = "Siang 🌞"; break;
                case 13: jamss = "Siang 🌞"; break;
                case 14: jamss = "Siang 🌞"; break;
                case 15: jamss = "Siang🌞"; break;
                case 16: jamss = "Sore ☀️"; break;
                case 17: jamss = "Sore 🌄"; break;
                case 18: jamss = "Sore 🌄"; break;
                case 19: jamss = "Malam 🌙"; break;
                case 20: jamss = "Malam 🌙"; break;
                case 21: jamss = "Malam 🌙"; break;
                case 22: jamss = "Malam 🌙"; break;
                case 23: jamss = "Malam 🌚"; break;
            }
            var tampilUcapan = "" + jamss;
            const jmn = moment.tz('Asia/Jakarta').format('HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 januari 2021').getTime()
				const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				const week = d.toLocaleDateString(locale, { weekday: 'long' })
				const calender = d.toLocaleDateString(locale, {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
		       })
		const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(time2 < "23:59:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/27/ee/27/27ee271709bdb24d555b2dd3de796f93.jpg')
                                        }
if(time2 < "19:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/27/ee/27/27ee271709bdb24d555b2dd3de796f93.jpg')
                                         }
if(time2 < "18:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/81/08/7b/81087b2e732dc0e25d8875b135d579b9.jpg')
                                         }
if(time2 < "15:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/81/98/aa/8198aaf07083fc9939deb0c3c5c3716c.jpg')
                                         }
if(time2 < "11:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/81/98/aa/8198aaf07083fc9939deb0c3c5c3716c.jpg')
                                         }
if(time2 < "06:00:00"){
var imageTime = await getBuffer('https://i.pinimg.com/736x/15/8e/ea/158eea299c01433aae6744599d2fdc3a.jpg')
}
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN: Shendy\n' // full name
            + 'ORG:Shendy;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=62858709665804:+62 858 7096 65804\n' // WhatsApp ID + phone number
            + 'END:VCARD'
             prit = [
                {buttonId: 'daftar', buttonText: {displayText: 'DAFTAR RESELLER'}, type: 2}
              ]
              
               pritprit = {
                  text: 'sepertinya kamu belum daftar resseler',
                  footer: '©SETYABOT',
                  buttons: prit,
                  headerType: 1
              }
            
switch (command) {
 case 'menu':{
menu =`*──────❲ SHINZUBOTZ - MD ❳──────*

╭─⬣「 USER INFO 」⬣
│• Nama : ${m.pushName}
│• Bot Version : 5
╰─⬣

GROUP PANNEL MURAH : 


╭─⬣「 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨 」⬣
│➥⬣.addseller @
│➥⬣.delseller @
│➥⬣.public
│➥⬣.join
│➥⬣.idgroup
│➥⬣.self
│➥⬣.pushkontak
│➥⬣.share
╰─⬣
╭─⬣「 𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨 」⬣
│➥⬣.lgc
│➥⬣.open
│➥⬣.close
│➥⬣.kick
│➥⬣.rl
│➥⬣.promote
│➥⬣.demote
│➥⬣.hidetag
╰─⬣
╭─⬣「 𝗙𝗨𝗡 𝗠𝗘𝗡𝗨 」⬣
│➥⬣.panel
│➥⬣.ramlist
│➥⬣.Admin (𝙊𝙒𝙉𝙀𝙍) 
│➥⬣.daftarresellerpanel
╰─⬣
╭─⬣「 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗠𝗘𝗡𝗨 」⬣
│➥⬣.tiktok(𝙋𝙐𝘽𝙇𝙄𝘾) 
│➥⬣.instagram(𝙋𝙐𝘽𝙇𝙄𝘾) 
╰─⬣
╭─⬣「 𝗣𝗘𝗠𝗕𝗔𝗬𝗔𝗥𝗔𝗡 」⬣
│➥⬣.qris
│➥⬣.gopay
│➥⬣.dana
│➥⬣.sedekah
╰─⬣

RULES : 
1. Dilarang Spam Bot
2. Dilarang Call/Vc Bot
╰─⬣
`
m.reply(menu)
}
break
case 'share': {

    if (!isCreator) return m.reply(`khusus owner`)
      if (!isGroup) return m.reply(`Harus Di Group Masbro`)
    if (!q) return m.reply(`Text?`)
    let mem = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    m.reply(`succes get member`)
    for (let pler of mem) {
    xd.sendMessage(pler, { text: q})
     }
    
     m.reply(`succes get member`)
      }
break
case 'tt':
case 'tiktok':
case 'tiktoknowm':{
               if (args.length < 1) return m.reply(`Gunakan Format : ${command} https://vt.tiktok.com/ZS8HAjYq9/`)
               if (!isUrl(args[0]) && !args[0].includes('vt.tiktok') && !args[0].includes('tiktok.com')) return m.reply('Maaf Link Tidak Valid')
               m.reply(`Harap Tunggu Sebentar`)
               a = await require('../js/lib/tiktok')(args[0])
               try {
               texp = `*Nickname :* ${a.autor.nickname}\n*Username :* ${a.autor.username}\n*Comment :* ${a.details.comment_count}\n*Share :* ${a.details.share_count}\n*Like :* ${a.details.like_count}\n*Description :* ${a.details.desc}`
               xd.sendVideo(m.chat, a.download.video.no_wm.url, texp, m)
               } catch (err) {
               console.log(err)
               await xd.sendMessage(m.chat, { image : { url:  global.erorurl }, caption: '💔️ Maaf, Data tidak ditemukan'}, { quoted: m })
               }
               }
               break

               case "ig":
               case "instagram":{
if (!text) return m.reply(`Link Nya?`)
try{
var { data } = await axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=BrunoSobrino&url=https://www.instagram.com/p/CU0MhPjBZO2`)
               m.reply(`_Tunggu Sebentar..._`)
} catch {
return xd.sendButMessage(m.chat, mess.error.fitur, copyrightnya, [{ buttonId: `${prefix}devoloper`, buttonText: { displayText: "devoloper" }, type: 1 }], m)
}
try{
xd.sendMessage(m.chat, { video: { url: data.result.url }, mimetype: "video/mp4", fileName: `${data.result.title}.mp4` }, { quoted: m })
} catch {
xd.sendMessage(m.chat, { image: { url: data.result.url }, mimetype: "image/jpeg", fileName: `${data.result.title}.jpeg` }, { quoted: m })
}}
break
case "daftarresellerpanel":
lrm = `SILAHKAN CONTACT ADMIN :
https://wa.me/16196268188`
xd.sendMessage(from, {text : lrm}, {quoted : m})
break
case "panel":

txh = `*SHINZU MD*
BY SHINZUBOTZ

CARA ADD USER PANEL :
ram user,nomer

contoh : 1gb udin,62858709665804
`
xd.sendMessage(from, {text :txh}, {quoted:m})
break
case "ramlist":
lrm = `RAM YANG TERSEDIA :
1GB ✅(𝙎𝙀𝙇𝙇𝙀𝙍) 
2GB ✅(𝙎𝙀𝙇𝙇𝙀𝙍) 
3GB ✅(𝙎𝙀𝙇𝙇𝙀𝙍) 
4GB ✅(𝙎𝙀𝙇𝙇𝙀𝙍) 
5GB ✅(𝙎𝙀𝙇𝙇𝙀𝙍) 
6GB ✅(𝙎𝙀𝙇𝙇𝙀𝙍) 
7GB ✅(𝙎𝙀𝙇𝙇𝙀𝙍) 
8GB ✅(𝙎𝙀𝙇𝙇𝙀𝙍) 
𝙐𝙉𝙇𝙄 ✅ (𝙎𝙀𝙇𝙇𝙀𝙍) `
xd.sendMessage(from, {text : lrm}, {quoted : m})
break
break
case "join": {
if (!isCreator) return m.reply(`Ngapain?`)
if (!text) return m.reply(`Contoh ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await xd.groupAcceptInvite(result).then((res) => m.reply(util.format(res))).catch((err) => m.reply(util.format(err)))
}
break
break
case "panelmurah":
lrm = `PANEL MURAH BY HARDZ:
1GB ✅
2GB ✅
3GB ✅
4GB ✅
5GB ✅
6GB ✅
7GB ✅
8GB ✅
BAYAR SEIKHLASNYA NO PERAK`
xd.sendMessage(from, {text : lrm}, {quoted : m})
break
case 'qris': {
let papa = `Silahkan Scan Qris Allpayment Di Atas Untuk Melakukan Pembayaran Terimakasih Dan Jangan Lupa Kirim Bukti Ke Owner *HARDZMODS*
`
					xd.sendMessage(from,{image:qrisallpay, caption: papa })
					} 
				break
break
case 'sedekah': {
if (!isCreator) return m.reply(`khusus Creator`)
let papa = `Sedekah Silahkan scan barcode di atas *HARDZ- MD*
`
					xd.sendMessage(from,{image:qrisay, caption: papa })
					} 
				break
				case 'dana': {
let da = ` *PEMBAYARAN DANA*

╭─❏ *『 PAYMENT 』*
║ ➪ NO DANA : 082192773770
║ ➪ A/N Tf Aja Belum Prem
┗⬣

Silahkan Transfer Lewat Nomor Tercantum Di Atas Atau Scan Qr Dana Di Atas Terimakasih
`
					xd.sendMessage(from,{image:qrisdana, caption: da })
					} 
				break		
				case 'gopay': {
let oo = ` *PEMBAYARAN GOPAY*

╭─❏ *『 PAYMENT 』*
║ ➪ NO GOPAY : 082192773770
║ ➪ A/N Tf Aja Belum Prem Juga 
┗⬣

Silahkan Transfer Lewat Nomor Tercantum Di Atas Atau Scan Qr Gopay Di Atas Terimakasih
`
					xd.sendMessage(from,{image:qrisgopay, caption: oo })
					} 
				break
break
case 'admin':
case 'createadmin': {
if (!isCreator) return m.reply(`Ngapain Pengen🗿?`)
  const [email, username] = q.split(',');
  if (!email || !username) {
    return m.reply(`Ex: ${prefix+command} email,username\n\nContoh:\n${prefix+command} lorenzoqeladoqqq@gmail.com,lorenzo`);
  }

  const userData = {
    email,
    username,
    first_name: username,
    last_name: "Memb",
    language: "en",
    password: generateRandomPassword()
  };

  const url = `${domain}/api/application/users`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${global.apikey}`,
      "cAPI-Key": global.capikey
    },
    body: JSON.stringify({
      ...userData,
      root_admin: true
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.errors) {
      return m.reply(`Gagal membuat akun admin: ${JSON.stringify(result.errors, null, 2)}`);
    }

    m.reply(`Akun admin telah berhasil dibuat dengan detail sebagai berikut:\n✉️Email: ${email}\n📦Username: ${username}\n🔒Password: ${userData.password}\n⌛Login: ${domain}`);
  } catch (err) {
    return m.reply(`Terjadi kesalahan saat membuat akun admin: ${err}`);
  }
}

function generateRandomPassword() {
  // Generate a 10-character random password
  return Array(10).fill(null).map(() => (Math.random() * 16 | 0).toString(16)).join('');
}
break
case 'demote': {
if (!isCreator) return m.reply('Khusus creator bot')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
if (!isAdmins) return m.reply('Lah Dikira Admin Group Kali')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(from, [users], 'demote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'lgc': case 'linkgc': {
if (!isCreator) return m.reply('Khusus creator bot')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
let response = await xd.groupInviteCode(from)
xd.sendText(from, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
}
break
case 'runtime':
m.reply(`*Runtime :* ${runtime(process.uptime())}`)
break
case 'rl':
if (!isCreator) return m.reply('Khusus creator bot')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
xd.groupRevokeInvite(from)
break
case 'h':
case 'hidetag': {
if (!isCreator) return m.reply('Khusus creator bot')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
xd.sendMessage(from, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted:m })
}

break
case "pushkontak":
if (!isCreator) return m.reply(`Ngapain?`)
if (!q) return m.reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} idgroup|tekspushkontak\nUntuk Liat Id Group Silahkan Ketik .idgroup`)
await m.reply("Otw Boskuuu")
const hay = q.split("|")[1]
const groupMetadataa = !isGroup? await xd.groupMetadata(`${q.split("|")[0]}`).catch(e => {}) : ""
const participantss = !isGroup? await groupMetadataa.participants : ""
const halls = await participantss.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let mem of halls) {
xd.sendMessage(mem, { text: hay })
await sleep(2000)
}
m.reply("Succes Boss!")
break
case "idgroup": {
if (!isCreator) return m.reply(`Ngapain?`)
let getGroups = await xd.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP DI BAWAH*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await xd.groupMetadata(x)
teks += `◉ Nama : ${metadata2.subject}\n◉ ID : ${metadata2.id}\n◉ Member : ${metadata2.participants.length}\n\n────────────────────────\n\n`
}
m.reply(teks + `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontak idgroup|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`)
}

break
case 'promote': {
if (!isCreator) return m.reply('Khusus creator bot')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
if (!isAdmins) return m.reply('Lah Dikira Admin Group Kali')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(from, [users], 'promote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'public': {
if (!isCreator) return m.reply('Khusus creator bot')
xd.public = true
m.reply('Sukse Change To Public')
}
break
case 'self': {
if (!isCreator) return m.reply('Khusus creator bot')
xd.public = false
m.reply('Sukses Change To Self')
}
break
case 'k':
case 'kick': {
if (!isCreator) return m.reply('Khusus creator bot')
if (!m.isGroup) return m.reply('Buat Di Group Bodoh')
if (!isBotAdmins) return m.reply('Bot Bukan Admin Cuy')
if (!isAdmins) return m.reply('Lah Dikira Admin Group Kali')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(from, [users], 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}

break
case "delsrv": {
if (!isCreator) return m.reply(`Ngapain?`)

let srv = args[0]
if (!srv) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*SERVER NOT FOUND*')
m.reply('*SUCCESSFULLY DELETE THE SERVER*')
}
break

case 'addseller':
if (!isCreator) return m.reply(`khusus Creator`)
        
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 0`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await xd.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknye.length == 0) return m.reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
owner.push(bnnd)
fs.writeFileSync('./config/seller.json', JSON.stringify(owner))
m.reply(`Nomor ${bnnd} Sudah Bisa Akses!!!`)
break
case 'delseller':
if (!isCreator) return m.reply(`khusus Creator`)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 0`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./config/seller.json', JSON.stringify(owner))
m.reply(`Nomor ${ya} Sudah Tidak Bisa Add Server`)
break

        case "1gb": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/628387857207 ( RANZZY )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 1gb"
let egg = global.eggsnya
let loc = global.location
let memo = "1200"
let cpu = "30"
let disk = "1200"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()

})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`*SUKSES CREATE PANNEL✅*\n_Username & Password Telah Di Kirim Ke Buyer Tersebut_`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*INFO USER :*

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "2gb": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/62858709665804 ( RANZZY )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 2gb"
let egg = global.eggsnya
let loc = global.location
let memo = "2200"
let cpu = "60"
let disk = "2200"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`*SUKSES CREATE PANNEL✅*\n_Username & Password Telah Di Kirim Ke Buyer Tersebut_`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*INFO USER :*

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "3gb": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/62858709665804 ( RANZZY )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 3gb"
let egg = global.eggsnya
let loc = global.location
let memo = "3200"
let cpu = "80"
let disk = "3200"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`*SUKSES CREATE PANNEL✅*\n_Username & Password Telah Di Kirim Ke Buyer Tersebut_`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*INFO USER :*

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "4gb": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/62858709665804 ( SETYABOT MD )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 4gb"
let egg = global.eggsnya
let loc = global.location
let memo = "4200"
let cpu = "110"
let disk = "4200"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`*SUKSES CREATE PANNEL✅*\n_Username & Password Telah Di Kirim Ke Buyer Tersebut_`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*INFO USER :*

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "5gb": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/62858709665804 ( RANZZNMD )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 5gb"
let egg = global.eggsnya
let loc = global.location
let memo = "5200"
let cpu = "140"
let disk = "5200"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*INFO USER :*

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "unli": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/62858709665804 ( SETYABOT MD )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " unli"
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`*SUKSES CREATE PANNEL✅*\n_Username & Password Telah Di Kirim Ke Buyer Tersebut_`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"tent-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*INFO USER :*

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "6gb": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/62858709665804 ( SETYABOT MD )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 6gb"
let egg = global.eggsnya
let loc = global.location
let memo = "6200"
let cpu = "170"
let disk = "6200"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`*SUKSES CREATE PANNEL✅*\n_Username & Password Telah Di Kirim Ke Buyer Tersebut_`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*

TYPE: user

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "7gb": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/62858709665804 ( SETYABOT MD )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 7gb"
let egg = global.eggsnya
let loc = global.location
let memo = "7200"
let cpu = "180"
let disk = "7200"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`*SUKSES CREATE PANNEL✅*\n_Username & Password Telah Di Kirim Ke Buyer Tersebut_`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*INFO USER :*

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}

break
case "8gb": {
if (!isSeler) return m.reply(`Fitur Ini Khusus Pengguna Premium,, Buy Prem? Chat Whatsapp Owner Wa.me/62858709665804 ( SETYABOT MD )\n\nHarga Premium? *15K / Bulan*`)

let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 8gb"
let egg = global.eggsnya
let loc = global.location
let memo = "8200"
let cpu = "190"
let disk = "8200"
let email = username + "1234@gmail.com"
akunlo = "https://static.vecteezy.com/system/resources/previews/006/732/119/original/account-icon-sign-symbol-logo-design-free-vector.jpg" 
if (!u) return
let d = (await xd.onWhatsApp(u.split`@`[0]))[0] || {}
let password = generateRandomPassword()
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": generateRandomPassword()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`*SUKSES CREATE PANNEL✅*\n_Username & Password Telah Di Kirim Ke Buyer Tersebut_`)
ctf = `Hai @${u.split`@`[0]}
Ini Adalah Data Akun Mu

TUTORIAL GANTI PASSWORD AKUN : https://bit.ly/3ZBkHV6

[USER ID: ${user.id}]
👤USERNAME: ${user.username}
🔐PASSWORD: ${password}
🌐LOGIN: ${domain}

TUTORIAL PAKAI PANEL SILAHKAN CEK
https://youtu.be/7SrgQ23Qu1c
`
xd.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: xd.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`*INFO USER :*

ID: ${user.id}
USERNAME: ${user.username}
EMAIL: ${user.email}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)

}


break

default:
}
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
} catch (err) {
m.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})