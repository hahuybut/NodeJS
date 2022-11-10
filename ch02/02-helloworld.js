import { createServer } from 'http'
import { readFile } from 'fs'
const port = process.env.PORT || 3000

function serverStaticfile(res, path ,contentType, responseCode = 200){
    readFile(__dirname+path,(err,data)=>{
        if(err){
            res.writeHead(500,{'Content-Type': 'text/plain'})
            return res.end('500 - Internal Errol')
        }
        res.writeHead(responseCode, {'Contenttype':
    contentType })
    res.end(data)
    })
}
const server = createServer((req,res)=>{
    const path = req.url.replace(/\/?:\?.*)?$/,
    '').toLowerCase()
    switch(path){
        case '' :
            serverStaticfile(res, '/public/home.html','text/html')
            break
        case '/about':
            serverStaticfile(res, '/public/img/logo.png','image/html')    
            break
        case '/img/logo.png':
            serverStaticfile(res, '/public/img/logo.png','image/png')    
            break
        default :
        serverStaticfile(res,'/public/404.html','text/html',404)    
        break
    }
})
server.listen(port, () => console.log(`server started on port ${port};`+'press Crtl-C to terminate....'))