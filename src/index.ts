import app from './app'

import db from './config/mongo'

function main() {
  db().then(() => console.log('Database is conected'))
  app.listen(app.get('port'))
  console.log(`Server on port ${app.get('port')}`)
}

main()
