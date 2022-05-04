import { promises as fs } from "fs"

import { IncomingForm } from "formidable"

export const config = { api: { bodyParser: false } }

export default async (req, res) => {
   if (req.method === "POST") {
      const data = await new Promise((resolve, reject) => {
         const form = new IncomingForm()
         form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
         })
      })

      try {
         const file = data.files.uploadedFile
         const temporaryPath = file.filepath
         const pathToWriteFile = `uploads/${Date.now()}-${file.originalFilename}`
         const fileWrite = await fs.readFile(temporaryPath)
         await fs.writeFile(pathToWriteFile, fileWrite)
         res.status(200).json({ message: "seems ok" })

      } catch (error) {
         res.status(500).json({ message: error.message })
      }
   }
}