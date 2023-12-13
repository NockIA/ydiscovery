DROP DATABASE IF EXISTS `ydiscovery_datas`;

CREATE DATABASE `ydiscovery_datas`;

USE `ydiscovery_datas`;

CREATE TABLE `authors` (
    `authorId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(20) NOT NULL,
    `lastname` VARCHAR(20) NOT NULL,
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
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    PRIMARY KEY(`accountId`),
    FOREIGN KEY (`authorId`) REFERENCES authors(`authorId`)
);