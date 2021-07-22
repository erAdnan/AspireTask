import { createServer } from "miragejs"

if (window.server) {
  server.shutdown()
}

window.server = createServer({
  routes() {
    this.get("/api/data", () => {
      return {
        data: {
            balance: 3000,
        },
      }
    })
  },
})