import multer from "multer"
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})

export const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024
    },
    fileFilter: (req, file, cb) =>{
        if (!file.mimetype.startsWith('image/')){
            return cb(new Error('Apenas arquivos de imagem são permitidos.'))
        }

        cb(null, true)
    }

})