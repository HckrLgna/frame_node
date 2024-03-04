const express = require('express');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }
    middlewares(){
        //directory public 
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.get('/ ', (req, res) => {
            res.send('Hello World');
            console.log('send from api');
        });
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Server is running on port',this.port);
        });
    }
}

module.exports = Server;