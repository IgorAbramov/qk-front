import fs, { promises } from "fs"

import { parse } from "csv-parse"
import { IncomingForm } from "formidable"
import XLSX from "xlsx"

export const config = { api: { bodyParser: false } }

/**
 * File upload to front-end server processing.
 **/
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
         const filePrefix = Date.now()
         const pathToWriteFile = `uploads/${filePrefix}-${file.originalFilename}`
         const fileWrite = await promises.readFile(temporaryPath)
         await promises.writeFile(pathToWriteFile, fileWrite)

         if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "application/vnd.ms-excel") {
            const workbook = XLSX.readFile(pathToWriteFile)
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })
            res.status(200).json({
               file: data[0],
               prefix: filePrefix
            })
         } else if (file.mimetype === "text/csv") {
            const parsedData = []
            fs.createReadStream(pathToWriteFile)
               .pipe(parse({ delimiter: ",", relax_column_count: true }))
               .on("data", response => {
                  parsedData.push(response)
               })
               .on("end", () => {
                  res.status(200).json({
                     file: parsedData[0],
                     prefix: filePrefix
                  })
               })
         }
      } catch (error) {
         res.status(500).json({ message: error.message })
      }
   }
}