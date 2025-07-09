import { api } from "encore.dev/api"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { graphql } from "graphql"
import { typeDefs } from "./schema"
import { resolvers } from "./resolvers"

// Build GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers })

// GraphQL endpoint
export const graphqlEndpoint = api.raw({ expose: true, path: "/graphql", method: "*" }, async (req, res) => {
  // CORS headers for GraphQL
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")

  if (req.method === "OPTIONS") {
    res.statusCode = 200
    res.end()
    return
  }

  try {
    let query: string
    let variables: any = {}
    let operationName: string | undefined

    // Parse request
    if (req.method === "GET") {
      const url = new URL(req.url!, `http://${req.headers.host}`)
      query = url.searchParams.get("query") || ""
      const varsParam = url.searchParams.get("variables")
      if (varsParam) {
        variables = JSON.parse(varsParam)
      }
      operationName = url.searchParams.get("operationName") || undefined
    } else {
      // POST request
      const chunks: Buffer[] = []
      for await (const chunk of req) {
        chunks.push(chunk)
      }
      const body = Buffer.concat(chunks).toString()

      if (req.headers["content-type"]?.includes("application/json")) {
        const parsedBody = JSON.parse(body)
        query = parsedBody.query
        variables = parsedBody.variables || {}
        operationName = parsedBody.operationName
      } else {
        // Form data or query string
        const params = new URLSearchParams(body)
        query = params.get("query") || ""
        const varsParam = params.get("variables")
        if (varsParam) {
          variables = JSON.parse(varsParam)
        }
        operationName = params.get("operationName") || undefined
      }
    }

    // Execute GraphQL query
    const result = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      contextValue: { req },
      variableValues: variables,
      operationName,
    })

    // Send response
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(result))
  } catch (error: any) {
    console.error("GraphQL error:", error)
    res.statusCode = 500
    res.setHeader("Content-Type", "application/json")
    res.end(
      JSON.stringify({
        errors: [{ message: error.message }],
      }),
    )
  }
})

// GraphQL Playground/Explorer endpoint
export const graphqlPlayground = api.raw(
  { expose: true, path: "/graphql/playground", method: "GET" },
  async (req, res) => {
    const playgroundHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>GraphQL Playground</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css" />
  <link rel="shortcut icon" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/favicon.png" />
  <script src="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js"></script>
</head>
<body>
  <div id="root">
    <style>
      body { margin: 0; }
      #root { height: 100vh; }
    </style>
  </div>
  <script>
    window.addEventListener('load', function (event) {
      GraphQLPlayground.init(document.getElementById('root'), {
        endpoint: '/graphql',
        settings: {
          'request.credentials': 'include'
        }
      })
    })
  </script>
</body>
</html>`

    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end(playgroundHTML)
  },
)
