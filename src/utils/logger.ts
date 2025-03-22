import winston from "winston";
import appInsights from "applicationinsights";
import dotenv from "dotenv";

dotenv.config();

const aiConnectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
if (aiConnectionString) {
  appInsights.setup(aiConnectionString).start();
  winston.info("Application Insights connected");
} else {
  winston.warn("Application Insights connection string not found.");
}

const telemetryClient = appInsights.defaultClient;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

logger.on("data", (log) => {
  if (telemetryClient) {
    telemetryClient.trackTrace({ message: log.message });
  }
});

export default logger;
