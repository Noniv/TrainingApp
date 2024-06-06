CREATE USER 'trainingapp'@'localhost' IDENTIFIED BY 'trainingapp';

GRANT ALL PRIVILEGES ON * . * TO 'trainingapp'@'localhost';

ALTER USER 'trainingapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'trainingapp';

DROP SCHEMA IF EXISTS `training-app`;

CREATE SCHEMA `training-app`;

USE `training-app` ;

CREATE TABLE IF NOT EXISTS `training-app`.`training` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) DEFAULT NULL,
  `date` DATETIME DEFAULT NULL,
  `duration` INT DEFAULT NULL,
  `calories` INT DEFAULT NULL,
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;