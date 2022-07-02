import app from "./config/express.config.js";
import radios from "./route/radios.route.js";

app.use("/api", radios);

export default app;