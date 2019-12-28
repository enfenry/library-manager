-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema library
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema library
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `library` ;
USE `library` ;

-- -----------------------------------------------------
-- Table `library`.`tbl_author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_author` (
  `authorId` INT(11) NOT NULL,
  `authorName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`authorId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `library`.`tbl_publisher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_publisher` (
  `publisherId` INT(11) NOT NULL,
  `publisherName` VARCHAR(45) NOT NULL,
  `publisherAddress` VARCHAR(45) NULL DEFAULT NULL,
  `publisherPhone` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`publisherId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `library`.`tbl_book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_book` (
  `bookId` INT(11) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `pubId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`bookId`),
  INDEX `fk_publisher` (`pubId` ASC) VISIBLE,
  CONSTRAINT `fk_publisher`
    FOREIGN KEY (`pubId`)
    REFERENCES `library`.`tbl_publisher` (`publisherId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `library`.`tbl_library_branch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_library_branch` (
  `branchId` INT(11) NOT NULL,
  `branchName` VARCHAR(45) NULL DEFAULT NULL,
  `branchAddress` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`branchId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `library`.`tbl_book_copies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_book_copies` (
  `bookId` INT(11) NOT NULL,
  `branchId` INT(11) NOT NULL,
  `noOfCopies` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`bookId`, `branchId`),
  INDEX `fk_bc_book` (`bookId` ASC) VISIBLE,
  INDEX `fk_bc_branch` (`branchId` ASC) VISIBLE,
  CONSTRAINT `fk_bc_branch`
    FOREIGN KEY (`branchId`)
    REFERENCES `library`.`tbl_library_branch` (`branchId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bc_book`
    FOREIGN KEY (`bookId`)
    REFERENCES `library`.`tbl_book` (`bookId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `library`.`tbl_borrower`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_borrower` (
  `cardNo` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`cardNo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `library`.`tbl_book_loans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_book_loans` (
  `bookId` INT(11) NOT NULL,
  `branchId` INT(11) NOT NULL,
  `cardNo` INT(11) NOT NULL,
  `dateOut` DATETIME NULL DEFAULT NULL,
  `dueDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`bookId`, `branchId`, `cardNo`),
  INDEX `fk_bl_book` (`bookId` ASC) VISIBLE,
  INDEX `fk_bl_branch` (`branchId` ASC) VISIBLE,
  INDEX `fk_bl_borrower` (`cardNo` ASC) VISIBLE,
  CONSTRAINT `fk_bl_branch`
    FOREIGN KEY (`branchId`)
    REFERENCES `library`.`tbl_library_branch` (`branchId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bl_book`
    FOREIGN KEY (`bookId`)
    REFERENCES `library`.`tbl_book` (`bookId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bl_borrower`
    FOREIGN KEY (`cardNo`)
    REFERENCES `library`.`tbl_borrower` (`cardNo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `library`.`tbl_book_authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_book_authors` (
  `bookId` INT(11) NOT NULL,
  `authorId` INT(11) NOT NULL,
  PRIMARY KEY (`bookId`, `authorId`),
  INDEX `fk_tbl_book_authors_tbl_author1_idx` (`authorId` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_book_authors_tbl_book1`
    FOREIGN KEY (`bookId`)
    REFERENCES `library`.`tbl_book` (`bookId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_book_authors_tbl_author1`
    FOREIGN KEY (`authorId`)
    REFERENCES `library`.`tbl_author` (`authorId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`tbl_genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_genre` (
  `genre_id` INT NOT NULL,
  `genre_name` VARCHAR(45) NULL,
  PRIMARY KEY (`genre_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `library`.`tbl_book_genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `library`.`tbl_book_genres` (
  `genre_id` INT NOT NULL,
  `bookId` INT(11) NOT NULL,
  PRIMARY KEY (`genre_id`, `bookId`),
  INDEX `fk_tbl_book_genres_tbl_book1_idx` (`bookId` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_book_genres_tbl_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `library`.`tbl_genre` (`genre_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_book_genres_tbl_book1`
    FOREIGN KEY (`bookId`)
    REFERENCES `library`.`tbl_book` (`bookId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
