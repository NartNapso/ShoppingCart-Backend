import winston from "winston";
import * as appInsights from "applicationinsights";
import { KnownSeverityLevel } from "applicationinsights";

const aiConnectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

let telemetryClient: appInsights.TelemetryClient | null = null;

if (aiConnectionString) {
  try {
    appInsights.setup(aiConnectionString).start();
    telemetryClient = appInsights.defaultClient;
    console.log("Application Insights connected");
  } catch (err) {
    console.warn("Failed to connect Application Insights", err);
  }
} else {
  console.warn("Application Insights connection string not found.");
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export const logWithTelemetry = (
  message: string,
  severity: "info" | "error" | "warning" = "info"
) => {
  logger.log({ level: severity, message });

  if (telemetryClient) {
    const mappedSeverity =
      severity === "error"
        ? KnownSeverityLevel.Error
        : severity === "warning"
        ? KnownSeverityLevel.Warning
        : KnownSeverityLevel.Information;

    telemetryClient.trackTrace({ message, severity: mappedSeverity });
  }
};

export default logger;
