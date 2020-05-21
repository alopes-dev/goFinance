import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'tmp'),
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

export default multer({ storage });
