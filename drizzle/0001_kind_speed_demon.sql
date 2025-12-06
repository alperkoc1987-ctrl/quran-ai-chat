CREATE TABLE `surah_bookmarks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`surahNumber` int NOT NULL,
	`surahName` varchar(255) NOT NULL,
	`surahNameArabic` varchar(255) NOT NULL,
	`verseCount` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `surah_bookmarks_id` PRIMARY KEY(`id`)
);
