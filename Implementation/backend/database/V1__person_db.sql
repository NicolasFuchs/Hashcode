USE `mydb`;

CREATE TABLE IF NOT EXISTS `mydb`.`person` (
  `personId`  INT          NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname`  VARCHAR(100) NOT NULL,
  PRIMARY KEY (`personId`)
)
  ENGINE = InnoDB;

START TRANSACTION;
INSERT INTO `mydb`.`person` (`firstname`, `lastname`)
VALUES ('Jonathan', 'Rial');
INSERT INTO `mydb`.`person` (`firstname`, `lastname`)
VALUES ('Joé', 'Butty');
INSERT INTO `mydb`.`person` (`firstname`, `lastname`)
VALUES ('Nicolas', 'Fuchs');
COMMIT;