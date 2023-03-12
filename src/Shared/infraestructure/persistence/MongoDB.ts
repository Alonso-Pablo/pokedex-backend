import mongoose from 'mongoose'

export class MongoDB {
  static connect() {
      const mongoURI = process.env.MONGO_URI as string;
      const connection = mongoose.connect(mongoURI, { maxPoolSize: 5 })
        .catch(err => console.log('[Mongo Error]: ', err))
      return connection
  }
}
