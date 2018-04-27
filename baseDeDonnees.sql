-- Création de  la base de données pour l'application
CREATE DATABASE IF NOT EXISTS hashcodedb;
USE `hashcodedb`;

CREATE TABLE IF NOT EXISTS `hashcodedb`.role (
  id_role   INT          NOT NULL AUTO_INCREMENT,
  name      VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_role),
  CHECK (name IN ('Admin', 'validated_organizer', 'waiting_organizer', 'validated_user', 'waiting_user')) -- Contrainte relationnelles CR1
);

INSERT INTO role (name) VALUES ("Admin");
INSERT INTO role (name) VALUES ("validated_organizer");
INSERT INTO role (name) VALUES ("waiting_organizer");
INSERT INTO role (name) VALUES ("validated_user");
INSERT INTO role (name) VALUES ("waiting_user");


CREATE TABLE IF NOT EXISTS `hashcodedb`.account (
  id_account   INT          NOT NULL AUTO_INCREMENT,
  firstname    VARCHAR(100) NOT NULL,
  lastname     VARCHAR(100) NOT NULL,
  email        VARCHAR(100) NOT NULL,
  pseudo       VARCHAR(100) NOT NULL UNIQUE, --  UNIQUE : Contrainte intégrité C1
  password     VARCHAR(100) NOT NULL,
  token        VARCHAR(100) NULL UNIQUE, -- NULL : Contrainte relationnel CR3  + UNIQUE : Contrainte intégrité C2
  image        VARCHAR(100) NULL, -- NULL : Contrainte relationnel CR3
  fk_role INT,
  PRIMARY KEY (id_account),
  constraint fk_role FOREIGN KEY (fk_role) REFERENCES role(id_role)
);


CREATE TABLE IF NOT EXISTS `hashcodedb`.challenge (
  id_challenge      INT          NOT NULL AUTO_INCREMENT,
  c_name            VARCHAR(100) NOT NULL,
  nb_teams          INT          NOT NULL,
  date_inscription  DATETIME     NOT NULL,
  date_begin        DATETIME     NOT NULL,
  date_end          DATETIME     NOT NULL,
  mediaXML          TEXT         NOT NULL,
  PRIMARY KEY (id_challenge)
);


CREATE TABLE IF NOT EXISTS `hashcodedb`.team (
  id_team      INT          NOT NULL AUTO_INCREMENT,
  t_name       VARCHAR(100) NOT NULL,
  fk_challenge INT,
  fk_leader INT,
  PRIMARY KEY (id_team),
  constraint fk_challenge FOREIGN KEY (fk_challenge) REFERENCES challenge(id_challenge),
  constraint fk_leader FOREIGN KEY (fk_leader)    REFERENCES account(id_account)
);


CREATE TABLE IF NOT EXISTS `hashcodedb`.account_team (
  fk_account INT,
  fk_team INT,
  constraint fk_account FOREIGN KEY (fk_account) REFERENCES account(id_account),
  constraint fk_team FOREIGN KEY (fk_team)    REFERENCES team(id_team),
  PRIMARY KEY (fk_account,fk_team)
 );


 CREATE TABLE IF NOT EXISTS `hashcodedb`.challenge_organizer(
   fk_challenge2 INT,
   fk_organizer INT,
    PRIMARY KEY (fk_challenge2,fk_organizer),
    constraint fk_challenge2 FOREIGN KEY (fk_challenge2) REFERENCES challenge(id_challenge),
	constraint fk_organizer FOREIGN KEY (fk_organizer) REFERENCES account(id_account)
    );

  CREATE TABLE IF NOT EXISTS `hashcodedb`.solution (
    id_solution INT          NOT NULL AUTO_INCREMENT,
    s_name      VARCHAR(100) NOT NULL,
    language    VARCHAR(100) NOT NULL,
    solution    VARCHAR(100) NOT NULL,
    version     FLOAT        NOT NULL,
    ranking     FLOAT        NOT NULL,
    submit_date DATETIME     NOT NULL,
    fka_account_team INT,
    fkt_account_team INT,
    PRIMARY KEY (id_solution),
	constraint fk_account_team FOREIGN KEY (fka_account_team,fkt_account_team) REFERENCES account_team(fk_account, fk_team)
  );



  /*
  -- Remplissage de la base de donnée pour avoir des exemples
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Joé", "Butty","joe@email.ch","jojobutty","emf123",NULL,1);

  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Jonathan", "Rial","jonathan@email.ch","riri","emf123",NULL,2);
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Nicolas", "Fuchs","nicolas@email.ch","nico","emf123",NULL,2);

  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Cristiano", "Ronaldo","cr7@email.ch","cr7","emf123",NULL,4);
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Karim", "Benzema","kb9@email.ch","kb9","emf123",NULL,4);
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Valdimir", "Meier","valdm@email.ch","valdm","emf123",NULL,4);
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Justin", "Koestinger","jk@email.ch","juju","emf123",NULL,4);
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Lucas", "Alborghetto","ghetto@email.ch","albo","emf123",NULL,4);
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Karim", "Lemarchand","kl@email.ch","mirak","emf123",NULL,4);
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Donald", "Trump","dodo@email.ch","trump","emf123",NULL,4);
  INSERT INTO account (firstname,lastname,email,pseudo,password,token, fk_role)
      VALUES ("Raphi", "Burgunder","rb@email.ch","sfl","emf123",NULL,4);

  INSERT INTO challenge (c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
      VALUES ("Java Challenge #1", 2,"2018-03-01 16:00:00","2018-04-01 08:00:00","2018-04-15 16:00:00","provisoire");

  INSERT INTO challenge (c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
      VALUES ("Java Challenge #2", 4,"2018-04-18 16:00:00","2018-04-23 10:00:00","2018-05-15 18:00:00","provisoire");

  INSERT INTO challenge (c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
      VALUES ("PHP Challenge #1", 4,"2018-05-18 10:00:00","2018-05-20 16:00:00","2018-05-30 16:00:00","provisoire");

  INSERT INTO challenge (c_name,nb_teams,date_inscription,date_begin,date_end,mediaXML)
      VALUES ("Optimisation Challenge", 8,"2018-06-04 23:00:00","2018-06-07 10:30:00","2018-06-16 16:30:00","provisoire");

  */
