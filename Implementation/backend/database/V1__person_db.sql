USE `mydb`;

CREATE TABLE IF NOT EXISTS `mydb`.`person` (
  `personId`   INT          NOT NULL AUTO_INCREMENT,
  `firstname`  VARCHAR(100) NOT NULL,
  `lastname`   VARCHAR(100) NOT NULL,
  `birthday`   DATE         NOT NULL,
  `addressXML` TEXT         NOT NULL,
  PRIMARY KEY (`personId`)
)
  ENGINE = InnoDB;

START TRANSACTION;
INSERT INTO `mydb`.`person` (`firstname`, `lastname`, `birthday`, `addressXML`)
VALUES ('Jonathan', 'Rial', '1995-08-05',
        '<address><street>Vers la Chapelle</street><building>40</building><postalCode>1643</postalCode><city>Gumefens</city></address>');
INSERT INTO `mydb`.`person` (`firstname`, `lastname`, `birthday`, `addressXML`)
VALUES ('Joé', 'Butty', '1995-11-23',
        '<address><street>Route St-Pierre</street><building>3</building><postalCode>1470</postalCode><city>Estavayer-le-Lac</city></address>'
);
INSERT INTO `mydb`.`person` (`firstname`, `lastname`, `birthday`, `addressXML`)
VALUES ('Nicolas', 'Fuchs', '1995-07-17',
        '<address><street>Chemin des Pontets</street><building>3</building><postalCode>1699</postalCode><city>Porsel</city></address>');
COMMIT;