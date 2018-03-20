USE `mydb`;

CREATE TABLE IF NOT EXISTS `mydb`.`person` (
  `personId`  INT          NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname`  VARCHAR(100) NOT NULL,
  `birthday`  DATE         NOT NULL,
  PRIMARY KEY (`personId`)
)
  ENGINE = InnoDB;

START TRANSACTION;
INSERT INTO `mydb`.`person` (`firstname`, `lastname`, `birthday`)
VALUES ('Jonathan', 'Rial', '1995-08-05');
INSERT INTO `mydb`.`person` (`firstname`, `lastname`, `birthday`)
VALUES ('Joé', 'Butty', '1995-11-23');
INSERT INTO `mydb`.`person` (`firstname`, `lastname`, `birthday`)
VALUES ('Nicolas', 'Fuchs', '1995-07-17');
COMMIT;