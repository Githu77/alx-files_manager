import { Router } from 'express';

import AppController from '../controllers/AppController';
import UtilController from '../controllers/UtilController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

router.use((request, response, next) => {
  const paths = ['/connect'];
  if (!paths.includes(request.path)) {
    next();
  } else if (!request.headers.authorization) {
    response.status(401).json({ error: 'Unauthorized' }).end();
  } else {
    next();
  }
});

router.use((request, response, next) => {
  const paths = ['/disconnect', '/users/me', '/files'];
  if (!paths.includes(request.path)) {
    next();
  } else if (!request.headers['x-token']) {
    response.status(401).json({ error: 'Unauthorized' }).end();
  } else {
    next();
  }
});

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.post('/files', FilesController.postUpload);
router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);


router.put('/files/:id/publish', UtilController.token, FilesController.putPublish);
router.put('/files/:id/unpublish', UtilController.token, FilesController.putUnpublish);
module.exports = router;
