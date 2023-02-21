

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import app from "./src/index.js"


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Alexandre brand API',
        description: ' About my-brand projects(Alexandre-pro)  api',
        version: '1.0.0',
      },

      contact: {
        name: "Nkurunziza Alexandre",
        email: "Alexendre.Nkurunziza@gmail.com",
        url: "http://alex-brand.netlify.app",
      },

      servers:[
        {
         url:'http://localhost:5000/'   
        },
        {
          url: 'https://sparkling-petticoat-bull.cyclic.app/'
        }

      ],

      
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      
  },
  apis:['./src/routes/*.js']
    }

    const swaggerSpec = swaggerJSDoc(options)

    function swaggerDocs(api, port){
        // swagger page
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

        //document in json format
        app.get('/docs.json', (req, res)=>{
         res.setHeader('Content-type', 'application/json')
         res.send(swaggerSpec)
        })
    }

    export default swaggerDocs
    