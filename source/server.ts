import express, { Express } from "express";
import http from 'http';
import morgan from "morgan";
import routes from "./routes/index";

const router: Express = express();
const swapperJSDoc = require("swagger-jsdoc");
const swaggerUi= require("swagger-ui-express");

// logging
router.use(morgan('dev'));
// parse the request
router.use(express.urlencoded({ extended: false }));
// takes care of JSON data
router.use(express.json());

const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : "Built rest api with typescript, node, mongodb",
            version: "1.0.0"
        },
        servers: [
            {
                url:  "http://localhost:3000"
            }
        ]
    },
    apis: ['./source/server.ts']
};

const swaggerSpec = swapperJSDoc(options);
router.use("/api-documents", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---- base url document ----
/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if it is working or not.
 *      description: This api is used to check if it is working or not.
 *      responses:
 *          200:
 *              description: To test Get method
 */

// ---- schema for documents ----
/**
 * @swagger
 *  components:
 *      schema:
 *          Book:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  title:
 *                      type: string
 *                  body:
 *                      type: string
 *                  userId:
 *                      type: integer 
 *          Post:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  body:
 *                      type: string       
 */

// ---- get api document ----
/**
 * @swagger
 * /posts:
 *  get:
 *      summary: This is the api to get the list of post.
 *      description: This is the api to get all the details about posts.
 *      responses:
 *          200:
 *              description: This api is being used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                                  $ref: '#components/schema/Book'
 */

// ---- get post by id document ----
/**
 * @swagger
 * /post/{id}:
 *  get:
 *      summary: Get the post by id.
 *      description: To get the particular post by Id.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Numeric ID required
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: This api is being used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                                  $ref: '#components/schema/Book'
 */

// ---- create post document ----
/**
 * @swagger
 * /posts/add:
 *  post:
 *      summary: Create Post.
 *      description: Create Post.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/Book'                     
 *      responses:
 *          200:
 *              description: Added successfully
 */

// ---- update post by id ----
/**
 * @swagger
 * /post/{id}:
 *  put:
 *      summary: Update Post.
 *      description: Update Post by giving id.
 *      parameters:
 *          -  in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *              type: integer
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/Post'                     
 *      responses:
 *          200:
 *              description: Updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                                  $ref: '#components/schema/Book'
 */

// ---- delete by id document ----
/**
 * @swagger
 * /posts/{id}:
 *  delete:
 *      summary: Delete the post by id.
 *      description: To delete the particular post by Id.
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Numeric ID required
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Deleted successfully
 */

// roules of our api    
router.use((req, res, next)=>{
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS header
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');
    // set the CORS method headers
    if(req.method === 'options'){
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE PUT POST');
        return res.status(200).json({});
    }
    next();
})

// Routes -------
router.use("/", routes);

router.get('/', (req, res) => {
    res.send("Server is started!")
})

// Error handling
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    })
})

// server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
