// 导入 CryptoJS
import CryptoJS from 'crypto-js'

// 设置密钥
const secretKey = 'the-key'

// 加密函数
function encrypt(data) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
  return ciphertext
}

// 解密函数
function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

export {
  encrypt,
  decrypt
}