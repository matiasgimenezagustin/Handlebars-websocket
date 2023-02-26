import exphbs from "express-handlebars"
import  express  from "express";
import {routerProducts, routerCarts} from "./router/index.js"
import {Server} from "socket.io"
import path from "path"


const app = express()
const PORT = 8080

app.engine("handlebars", exphbs.engine() )
app.set('views', "./src/views");
app.set("view engine", "handlebars")



const __dirname = path.dirname(new URL(import.meta.url).pathname);
const publicPath = path.join(__dirname, 'src/public');
console.log(__dirname)
const staticMiddleware = express.static(publicPath);

app.use('public', staticMiddleware);
/* Handlebars middleware */ 


/* Configs Middlewares */
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* Router Middlewares */
/* app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts ) */

app.get("/", (req, res) =>{
    res.render("formulario", {title:"carga tus productos aqui"})
})

const server = app.listen(PORT, () => console.log(`EXITO: el servidor se esta escuchando en el puerto ${PORT}`))
const io = new Server(server)


io.on("connection", (socket) =>{
    console.log("user connect")
})