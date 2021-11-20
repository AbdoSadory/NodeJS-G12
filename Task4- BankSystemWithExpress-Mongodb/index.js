const app = require('./app/app');
port = process.env.port || 3000
app.listen(port, ()=> console.log(`we ar live on http://localhost:${port}`))


// sudo kill -9 `sudo lsof -t -i:3000`