
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema Questsystem
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Questsystem
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Questsystem` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `Questsystem` ;

-- -----------------------------------------------------
-- Table `Questsystem`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`User` (
  `idUser` VARCHAR(25) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`Circle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`Circle` (
  `idCircle` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idCircle`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`Project` (
  `idProject` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Circle_idCircle` INT NOT NULL,
  `User_idMgrUser` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`idProject`),
  INDEX `fk_Project_Group_idx` (`Circle_idCircle` ASC),
  INDEX `fk_Project_User1_idx` (`User_idMgrUser` ASC),
  CONSTRAINT `fk_Project_Group`
    FOREIGN KEY (`Circle_idCircle`)
    REFERENCES `Questsystem`.`Circle` (`idCircle`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Project_User1`
    FOREIGN KEY (`User_idMgrUser`)
    REFERENCES `Questsystem`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`Topic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`Topic` (
  `idTopic` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NOT NULL,
  `Content` BLOB NOT NULL,
  `Project_idProject` INT NOT NULL,
  PRIMARY KEY (`idTopic`),
  INDEX `fk_Topic_Project1_idx` (`Project_idProject` ASC),
  CONSTRAINT `fk_Topic_Project1`
    FOREIGN KEY (`Project_idProject`)
    REFERENCES `Questsystem`.`Project` (`idProject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`Question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`Question` (
  `idQuestion` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(45) NOT NULL,
  `Content` BLOB NOT NULL,
  `DueDate` DATE NULL DEFAULT NULL,
  `Like` INT NOT NULL DEFAULT 0,
  `User_idReqUser` VARCHAR(25) NOT NULL,
  `Topic_idTopic` INT NOT NULL,
  PRIMARY KEY (`idQuestion`),
  INDEX `fk_Question_User1_idx` (`User_idReqUser` ASC),
  INDEX `fk_Question_Topic1_idx` (`Topic_idTopic` ASC),
  CONSTRAINT `fk_Question_User1`
    FOREIGN KEY (`User_idReqUser`)
    REFERENCES `Questsystem`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Question_Topic1`
    FOREIGN KEY (`Topic_idTopic`)
    REFERENCES `Questsystem`.`Topic` (`idTopic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`Answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`Answer` (
  `idAnswer` INT NOT NULL AUTO_INCREMENT,
  `Content` BLOB NOT NULL,
  `DueDate` DATE NULL DEFAULT NULL,
  `Like` INT NOT NULL,
  `Status` VARCHAR(1) NOT NULL,
  `Question_idQuestion` INT NOT NULL,
  PRIMARY KEY (`idAnswer`),
  INDEX `fk_Answer_Question1_idx` (`Question_idQuestion` ASC),
  CONSTRAINT `fk_Answer_Question1`
    FOREIGN KEY (`Question_idQuestion`)
    REFERENCES `Questsystem`.`Question` (`idQuestion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`Project_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`Project_has_User` (
  `Project_idProject` INT NOT NULL,
  `User_idUser` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`Project_idProject`, `User_idUser`),
  INDEX `fk_Project_has_User_User1_idx` (`User_idUser` ASC),
  INDEX `fk_Project_has_User_Project1_idx` (`Project_idProject` ASC),
  CONSTRAINT `fk_Project_has_User_Project1`
    FOREIGN KEY (`Project_idProject`)
    REFERENCES `Questsystem`.`Project` (`idProject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Project_has_User_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `Questsystem`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`Circle_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`Circle_has_User` (
  `User_idUser` VARCHAR(25) NOT NULL,
  `Circle_idCircle` INT NOT NULL,
  PRIMARY KEY (`Circle_idCircle`, `User_idUser`),
  INDEX `fk_User_has_Group_Group1_idx` (`Circle_idCircle` ASC),
  INDEX `fk_User_has_Group_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_User_has_Group_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `Questsystem`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Group_Group1`
    FOREIGN KEY (`Circle_idCircle`)
    REFERENCES `Questsystem`.`Circle` (`idCircle`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`User_has_Question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`User_has_Question` (
  `User_idUser` VARCHAR(25) NOT NULL,
  `Question_idQuestion` INT NOT NULL,
  `Status` VARCHAR(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`User_idUser`, `Question_idQuestion`),
  INDEX `fk_Question_has_User_User2_idx` (`User_idUser` ASC),
  INDEX `fk_Question_has_User_Question2_idx` (`Question_idQuestion` ASC),
  CONSTRAINT `fk_Question_has_User_Question2`
    FOREIGN KEY (`Question_idQuestion`)
    REFERENCES `Questsystem`.`Question` (`idQuestion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Question_has_User_User2`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `Questsystem`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Questsystem`.`User_has_Answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Questsystem`.`User_has_Answer` (
  `User_idUser` VARCHAR(25) NOT NULL,
  `Answer_idAnswer` INT NOT NULL,
  `Status` VARCHAR(1) NOT NULL DEFAULT '1' COMMENT '1: 응답요망\n2: 응답완료\n3: 답변도착\n\n',
  PRIMARY KEY (`User_idUser`, `Answer_idAnswer`),
  INDEX `fk_User_has_Answer_Answer1_idx` (`Answer_idAnswer` ASC),
  INDEX `fk_User_has_Answer_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_User_has_Answer_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `Questsystem`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Answer_Answer1`
    FOREIGN KEY (`Answer_idAnswer`)
    REFERENCES `Questsystem`.`Answer` (`idAnswer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


ALTER TABLE Circle ADD description varchar(255) AFTER name;

use mysql;
insert into user(host,user,password,ssl_cipher,x509_issuer,x509_subject)
     values ('%','ourUsers',password('tomntoms'),'','','');
     
insert into user(host,user,password,ssl_cipher,x509_issuer,x509_subject)
     values ('%','owners',password('tomntoms'),'','','');
     

     
USE Questsystem;
CREATE USER 'ourUsers'@'%' IDENTIFIED BY 'tomntoms';
GRANT SELECT, INSERT, TRIGGER ON TABLE `Questsystem`.* TO 'ourUsers'@'%';

GRANT SELECT, INSERT, TRIGGER ON TABLE `Questsystem`.* TO 'ourUsers'@'localhost';

CREATE USER 'owners'@'%' IDENTIFIED BY 'tomntoms';
GRANT ALL ON `Questsystem`.* TO 'owners'@'%';

FLUSH PRIVILEGES;
SHOW GRANTS FOR ourUsers;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
