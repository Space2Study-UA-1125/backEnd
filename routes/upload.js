const express = require('express')
const router = express.Router()
const { firebaseCredentials } = require('../configs/config')
const admin = require('firebase-admin')
const multer = require('multer')
const fs = require('fs')

const tempDir = './uploads'

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  storageBucket: 'gs://space2study-97f8d.appspot.com'
})

const bucket = admin.storage().bucket()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir(tempDir, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating temporary directory:', err)
        return cb(err)
      }
      cb(null, tempDir)
    })
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

function createBlobFromRequest({ body, file, params }) {
  const isAvatar = body.isAvatar === 'true'

  const originalname = file.originalname
  const ext = originalname.split('.').pop()

  const filename = isAvatar ? `avatar.${ext}` : originalname
  const userID = params.userID
  const filePath = `${userID}/${filename}`
  const blob = bucket.file(filePath)

  return blob
}

router.post('/:userID', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }
  if (!req.params.userID) {
    return res.status(400).send('UserID is missing.')
  }

  const blob = createBlobFromRequest(req)
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('error', () => {
    return res.status(500).json({ error: 'Unable to upload image.' })
  })

  blobStream.on('finish', async () => {
    try {
      const [url] = await blob.getSignedUrl({
        action: 'read',
        expires: '01-01-3000'
      })

      fs.rm(tempDir, { recursive: true }, (err) => {
        if (err) {
          console.error('Error removing temporary directory:', err)
        }
      })

      return res.status(201).json({ imageUrl: url })
    } catch (error) {
      console.error('Error getting signed URL:', error)
      return res.status(500).json({ error: 'Unable to get signed URL.' })
    }
  })

  fs.createReadStream(req.file.path).pipe(blobStream)
})

module.exports = router
