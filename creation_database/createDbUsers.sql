DROP DATABASE IF EXISTS `ydiscovery_users`;

CREATE DATABASE `ydiscovery_users`;

USE `ydiscovery_users`;

CREATE TABLE `users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    PRIMARY KEY(`userId`)
);