import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static async getStatus(request, response) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    response.set('Content-Type', 'application/json');
    response.status(200).json({ redis: redisStatus, db: dbStatus }).end();
  }

  static async getStats(request, response) {
    const files = await dbClient.nbFiles();
    const users = await dbClient.nbUsers();
    response.set('Content-Type', 'application/json');
    response.status(200).json({ users, files }).end();
  }
}

export default AppController;
