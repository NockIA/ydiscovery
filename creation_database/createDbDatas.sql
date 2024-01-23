DROP DATABASE IF EXISTS `ydiscovery_datas`;

CREATE DATABASE `ydiscovery_datas`;

USE `ydiscovery_datas`;

CREATE TABLE `authors` (
    `authorId` INTEGER NOT NULL AUTO_INCREMENT,
    `authorName` VARCHAR(50),
    PRIMARY KEY(`authorId`)
);

CREATE TABLE `articles` (
    `articleId` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `title` VARCHAR(20) NOT NULL,
    `subtitle` VARCHAR(50),
    `publicationDate` DATE NOT NULL,
    `illustrationLink` VARCHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    FOREIGN KEY (`authorId`) REFERENCES authors(`authorId`),
    PRIMARY KEY (`articleId`)
);

CREATE TABLE `accounts` (
    `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,
    PRIMARY KEY(`accountId`),
    FOREIGN KEY (`authorId`) REFERENCES authors(`authorId`)
);