CREATE TABLE `chat_rate_limits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`dailyCount` int NOT NULL DEFAULT 0,
	`dailyResetAt` timestamp NOT NULL DEFAULT (now()),
	`minuteCount` int NOT NULL DEFAULT 0,
	`minuteResetAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chat_rate_limits_id` PRIMARY KEY(`id`)
);
