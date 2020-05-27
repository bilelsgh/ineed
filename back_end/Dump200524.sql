-- MySQL dump 10.16  Distrib 10.1.44-MariaDB, for debian-linux-gnueabihf (armv7l)
--
-- Host: localhost    Database: ineed
-- ------------------------------------------------------
-- Server version	10.1.44-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Announce`
--

DROP TABLE IF EXISTS `Announce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Announce` (
  `idAnnounce` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `creationDate` date NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `viewNumber` int(11) NOT NULL,
  `price` decimal(10,2) unsigned DEFAULT NULL,
  `idUser` int(10) unsigned NOT NULL,
  `status` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`idAnnounce`),
  UNIQUE KEY `idAnnounce_UNIQUE` (`idAnnounce`),
  KEY `fk_Announce_1_idx` (`idUser`),
  CONSTRAINT `fk_Announce_1` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announce`
--

LOCK TABLES `Announce` WRITE;
/*!40000 ALTER TABLE `Announce` DISABLE KEYS */;
INSERT INTO `Announce` VALUES (21,'2020-05-13','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"Bilel\",\"description\":\"\",\"lieu\":\"\",\"sur_place\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"type_de_plat\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\"}',48,0.00,13,2),(22,'2020-05-13','{\"id\":5,\"type\":\"service4\",\"name\":\"Accompagner quelqu\'un\",\"user\":\"Tommy\",\"description\":\"\",\"kind\":\"\",\"quand1\":\"\",\"quand2\":\"\",\"local\":\"\",\"datejour\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/accompagner.png\"}',14,0.00,12,2),(23,'2020-05-13','{\"id\":5,\"type\":\"service4\",\"name\":\"Accompagner quelqu\'un\",\"user\":\"Bilel\",\"description\":\"\",\"kind\":\"\",\"quand1\":\"\",\"quand2\":\"\",\"local\":\"\",\"datejour\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/accompagner.png\"}',6,0.00,13,2),(24,'2020-05-16','{\"getlocal\":\"\",\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\"}',4,0.00,15,0),(25,'2020-05-16','{\"getlocal\":\"\",\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\"}',1,0.00,15,0),(26,'2020-05-16','{\"getlocal\":\"\",\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\"}',0,0.00,15,0),(27,'2020-05-16','{\"getlocal\":\"\",\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\"}',3,0.00,15,0),(28,'2020-05-16','{\"getlocal\":\"\",\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\"}',0,0.00,15,0),(29,'2020-05-16','{\"getlocal\":\"\",\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\"}',1,0.00,15,0),(30,'2020-05-16','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"\",\"description\":\"\",\"lieu\":\"\",\"sur_place\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"type_de_plat\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\"}',2,0.00,15,0),(31,'2020-05-16','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Thomas\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',1,0.00,12,2),(32,'2020-05-16','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"TommasTestActivite\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',5,0.00,12,2),(33,'2020-05-18','{\"datejour\":\"\",\"dateheure\":\"\",\"accompagner\":\"\",\"budget\":\"\",\"liste\":[],\"name\":\"Faire les courses\",\"description\":\"\",\"type\":\"service1\",\"user\":\"BILEL\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"id\":2}',8,0.00,13,2),(34,'2020-05-18','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Bilel\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',6,0.00,13,2),(35,'2020-05-18','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',2,0.00,16,2),(36,'2020-05-18','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"Test\",\"description\":\"\",\"lieu\":\"\",\"sur_place\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"type_de_plat\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\"}',6,0.00,16,2),(37,'2020-05-19','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Gabriel\",\"description\":\"coucou\",\"salle\":\"cuisine\",\"surface\":\"2121\",\"datejour\":\"2020-05-20\",\"dateheure\":\"14:22\",\"materiel\":[\"Balaie\",\"eponge\"],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":45.7289652,\"longitude\":4.9846398}',13,0.00,15,0),(38,'2020-05-19','{\"datejour\":\"\",\"dateheure\":\"\",\"accompagner\":\"\",\"budget\":\"\",\"liste\":[],\"name\":\"Faire les courses\",\"description\":\"test merge\",\"type\":\"service1\",\"user\":\"BILEL\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"id\":2}',2,0.00,13,2),(39,'2020-05-20','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"BILou\",\"description\":\"\",\"lieu\":\"\",\"sur_place\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"type_de_plat\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\"}',2,0.00,13,2),(40,'2020-05-20','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"biiiilel\",\"description\":\"df\",\"lieu\":\"d\",\"sur_place\":\"\",\"datejour\":\"2020-05-28\",\"dateheure\":\"\",\"type_de_plat\":\"entree\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\"}',3,0.00,13,2),(41,'2020-05-21','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',10,0.00,16,2),(42,'2020-05-22','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Hortense\",\"description\":\"coucou toi\\n\",\"salle\":\"cuisine\",\"surface\":\"2121\",\"datejour\":\"2020-05-27\",\"dateheure\":\"14:22\",\"materiel\":[\"Balaie\"],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"Chaptuzat\",\"adress\":\"1 rue de Tressat\",\"latitude\":0,\"longitude\":0}',7,0.00,15,0),(43,'2020-05-22','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Gabriel\",\"description\":\"PIanos\",\"salle\":\"cuisine\",\"surface\":\"2121\",\"datejour\":\"2020-05-27\",\"dateheure\":\"14:22\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\",\"latitude\":46.0296058,\"longitude\":3.1850171}',0,0.00,15,0),(44,'2020-05-22','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Bilel\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',1,0.00,13,2),(45,'2020-05-22','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Thomas1\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',2,0.00,12,1),(46,'2020-05-22','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Thomas1\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',1,0.00,12,0),(47,'2020-05-22','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":46.03191500000001,\"longitude\":3.177695}',0,0.00,15,0),(48,'2020-05-22','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"2020-05-20\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\",\"latitude\":0,\"longitude\":0}',0,0.00,15,0),(49,'2020-05-22','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"Gabriel\",\"description\":\"coucou\",\"lieu\":\"\",\"sur_place\":\"Oui\",\"datejour\":\"2020-05-28\",\"dateheure\":\"\",\"type_de_plat\":\"desser\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\",\"contry\":\"France\",\"city\":\"Chaptuzat\",\"adress\":\"1 rue de Tressat\",\"latitude\":46.03191500000001,\"longitude\":3.177695}',4,0.00,15,0),(50,'2020-05-22','{\"datejour\":\"14:22\",\"dateheure\":\"\",\"accompagner\":\"Oui\",\"budget\":\"100\",\"liste\":[{\"produit\":\"coca\",\"quantite\":\"2L\"}],\"name\":\"Faire les courses\",\"description\":\"J\'\' adore manger\",\"type\":\"service1\",\"user\":\"Gabriel\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"latitude\":0,\"longitude\":0,\"id\":2}',1,0.00,15,0),(51,'2020-05-22','{\"datejour\":\"14:22\",\"dateheure\":\"\",\"accompagner\":\"Oui\",\"budget\":\"1000\",\"liste\":[{\"produit\":\"coca\",\"quantite\":\"2L\"}],\"name\":\"Faire les courses\",\"description\":\"coucou\",\"type\":\"service1\",\"user\":\"Gabriel2\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":0,\"longitude\":0,\"id\":2}',1,0.00,15,0),(52,'2020-05-22','{\"datejour\":\"14:22\",\"dateheure\":\"\",\"accompagner\":\"Oui\",\"budget\":\"2300\",\"liste\":[{\"produit\":\"coca\",\"quantite\":\"2L\"}],\"name\":\"Faire les courses\",\"description\":\"coucou ca va\",\"type\":\"service1\",\"user\":\"Gabriel\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":0,\"longitude\":0,\"id\":2}',3,0.00,15,0),(53,'2020-05-23','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"Bilel\",\"description\":\"\",\"lieu\":\"\",\"sur_place\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"type_de_plat\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\"}',14,0.00,13,2),(54,'2020-05-23','{\"datejour\":\"14:22\",\"dateheure\":\"\",\"accompagner\":\"Oui\",\"budget\":\"100\",\"liste\":[{\"produit\":\"coca\",\"quantite\":\"2L\"}],\"name\":\"Faire les courses\",\"description\":\"coucou\",\"type\":\"service1\",\"user\":\"Gabriel\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"\",\"adress\":\"\",\"id\":2}',0,0.00,15,0),(55,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Gabriel\",\"description\":\"coucou\",\"salle\":\"cuisine\",\"surface\":\"2121\",\"datejour\":\"2020-05-25\",\"dateheure\":\"14:22\",\"materiel\":[\"Balaie\"],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":0,\"longitude\":0}',1,0.00,15,0),(56,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"26/05/2020\",\"dateheure\":\"14:22\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\",\"latitude\":0,\"longitude\":0}',1,0.00,15,0),(57,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Jean Bon\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"27/05/2020\",\"dateheure\":\"14:22\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\",\"latitude\":0,\"longitude\":0}',8,0.00,15,0),(58,'2020-05-23','{\"datejour\":\"14:22\",\"dateheure\":\"\",\"accompagner\":\"Oui\",\"budget\":\"2300\",\"liste\":[{\"produit\":\"coca\",\"quantite\":\"2L\"}],\"name\":\"Faire les courses\",\"description\":\"Coucou\",\"type\":\"service1\",\"user\":\"Gabriel Jean\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":0,\"longitude\":0,\"id\":2}',7,0.00,15,0),(59,'2020-05-23','{\"datejour\":\"27/05/2020\",\"dateheure\":\"14:22\",\"accompagner\":\"\",\"budget\":\"\",\"liste\":[{\"produit\":\"coca\",\"quantite\":\"2L\"}],\"name\":\"Faire les courses\",\"description\":\"1234\",\"type\":\"service1\",\"user\":\"Test loca X date\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":0,\"longitude\":0,\"id\":2}',2,0.00,15,0),(60,'2020-05-23','{\"datejour\":\"//\",\"dateheure\":\"\",\"accompagner\":\"\",\"budget\":\"\",\"liste\":[],\"name\":\"Faire les courses\",\"description\":\"\",\"type\":\"service1\",\"user\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":0,\"longitude\":0,\"id\":2}',1,0.00,15,0),(61,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Gabriel le vacancier\",\"description\":\"coucou le vaca\\n\",\"salle\":\"cuisine\",\"surface\":\"14\",\"datejour\":\"27/05/2020\",\"dateheure\":\"14:22\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"contry\":\"France\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":0,\"longitude\":0}',2,0.00,15,0),(62,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',2,0.00,13,2),(63,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test loca witout button\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":0,\"longitude\":0}',7,0.00,15,0),(64,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test loca witout button 2\",\"description\":\"coucou 1234\",\"salle\":\"cuisine\",\"surface\":\"2121\",\"datejour\":\"27/05/2020\",\"dateheure\":\"14:22\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":0,\"longitude\":0}',5,0.00,15,0),(65,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"ThomasTestHisto\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',1,0.00,12,2),(66,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test loca witout button x3\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\"}',3,0.00,15,0),(67,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test loca  button\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"\"}',0,0.00,15,0),(68,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test loca witout button number 2\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"\",\"latitude\":46.021648,\"longitude\":3.1837237}',0,0.00,15,0),(69,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"\",\"latitude\":46.021648,\"longitude\":3.1837237}',0,0.00,15,0),(70,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test loca whit button\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"\",\"latitude\":46.021648,\"longitude\":3.1837237}',0,0.00,15,0),(71,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"Test loca with adress number xxx\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":0,\"longitude\":0}',3,0.00,15,0),(72,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"test location with the button\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"\",\"latitude\":46.021648,\"longitude\":3.1837237}',0,0.00,15,0),(73,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"asking menage with adress numb 5\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":0,\"longitude\":0}',1,0.00,15,0),(74,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"ok billy\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":0,\"longitude\":0}',1,0.00,15,0),(75,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"test console\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":45.7381929,\"longitude\":4.9794016}',0,0.00,15,0),(76,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"try one more time bro\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":0,\"longitude\":0}',2,0.00,15,0),(77,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"give me a clue\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":0,\"longitude\":0}',3,0.00,15,0),(78,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"commmmoooonnnn\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\"}',0,0.00,15,0),(79,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"peut etre maintenant\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":0,\"longitude\":0}',1,0.00,15,0),(80,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":45.7381929,\"longitude\":4.9794016}',0,0.00,15,0),(81,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":45.7381929,\"longitude\":4.9794016}',0,0.00,15,0),(82,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"last one\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"\",\"latitude\":45.7381929,\"longitude\":4.9794016}',0,0.00,15,0),(83,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"last one\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"\",\"latitude\":45.7381929,\"longitude\":4.9794016}',0,0.00,15,0),(84,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"last one two\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":45.7381929,\"longitude\":4.9794016}',1,0.00,15,0),(85,'2020-05-23','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"last one two\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":45.7381929,\"longitude\":4.9794016}',0,0.00,15,0),(86,'2020-05-23','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"test cuisine with bouton\",\"description\":\"\",\"lieu\":\"\",\"sur_place\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"type_de_plat\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\",\"contry\":\"France\",\"city\":\"\",\"adress\":\"\",\"latitude\":46.021648,\"longitude\":3.1837237}',0,0.00,15,0),(87,'2020-05-23','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"Test loca witout button for cuisine\",\"description\":\"\",\"lieu\":\"\",\"sur_place\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"type_de_plat\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\",\"contry\":\"France\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":46.021648,\"longitude\":3.1837237}',0,0.00,15,0),(88,'2020-05-23','{\"id\":5,\"type\":\"service3\",\"name\":\"Faire la cuisine\",\"user\":\"Test loca witout button for cuisine\",\"description\":\"\",\"lieu\":\"\",\"sur_place\":\"\",\"datejour\":\"\",\"dateheure\":\"\",\"type_de_plat\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/cuisine.png\",\"contry\":\"France\",\"city\":\"Chassieu\",\"adress\":\"16 rue Paul Eluard\",\"latitude\":45.7381929,\"longitude\":4.9794016}',1,0.00,15,0),(89,'2020-05-23','{\"datejour\":\"//\",\"dateheure\":\"\",\"accompagner\":\"\",\"budget\":\"\",\"liste\":[],\"name\":\"Faire les courses\",\"description\":\"\",\"type\":\"service1\",\"user\":\"Courses test no button\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"Chassieu\",\"adress\":\"\",\"latitude\":0,\"longitude\":0,\"id\":2}',0,0.00,15,0),(90,'2020-05-23','{\"datejour\":\"//\",\"dateheure\":\"\",\"accompagner\":\"\",\"budget\":\"\",\"liste\":[],\"name\":\"Faire les courses\",\"description\":\"\",\"type\":\"service1\",\"user\":\"Courses test no button\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"Chassieu\",\"adress\":\"\",\"latitude\":45.7381929,\"longitude\":4.9794016,\"id\":6}',0,0.00,15,0),(91,'2020-05-23','{\"datejour\":\"//\",\"dateheure\":\"\",\"accompagner\":\"\",\"budget\":\"\",\"liste\":[],\"name\":\"Faire les courses\",\"description\":\"\",\"type\":\"service1\",\"user\":\"courses with bouton\",\"viewNumber\":0,\"image\":\"../../assets/data/courses.png\",\"contry\":\"\",\"city\":\"\",\"adress\":\"\",\"latitude\":46.021648,\"longitude\":3.1837237,\"id\":2}',0,0.00,15,0),(92,'2020-05-24','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"bug du double service ?\",\"description\":\"\",\"salle\":\"\",\"surface\":\"\",\"datejour\":\"//\",\"dateheure\":\"\",\"materiel\":[],\"image\":\"../../assets/data/menage.png\",\"city\":\"Chassieu\",\"latitude\":45.7381929,\"longitude\":4.9794016}',6,0.00,15,0),(93,'2020-05-24','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"REVIEW_TEST1\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',40,0.00,12,2),(94,'2020-05-24','{\"type\":\"service2\",\"name\":\"Faire le menage\",\"user\":\"THOMAS\",\"description\":\"\",\"localisation\":\"\",\"surface\":\"\",\"dateheure\":\"\",\"materiel\":[],\"viewNumber\":0,\"image\":\"../../assets/data/menage.png\"}',1,0.00,12,0),(95,'2020-05-24','{\"id\":5,\"type\":\"service4\",\"name\":\"Accompagner quelqu\'un\",\"user\":\"THOMAS\",\"description\":\"\",\"kind\":\"\",\"quand1\":\"\",\"quand2\":\"\",\"local\":\"\",\"datejour\":\"\",\"viewNumber\":0,\"image\":\"../../assets/data/accompagner.png\"}',1,0.00,12,1);
/*!40000 ALTER TABLE `Announce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Answer`
--

DROP TABLE IF EXISTS `Answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Answer` (
  `userID` int(10) unsigned NOT NULL,
  `announceid` int(10) unsigned NOT NULL,
  `time` date NOT NULL,
  `accepted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`announceid`,`userID`),
  KEY `fk_Answer_iduser_idx` (`userID`),
  CONSTRAINT `fk_Answer_idannounce` FOREIGN KEY (`announceid`) REFERENCES `Announce` (`idAnnounce`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Answer_iduser` FOREIGN KEY (`userID`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answer`
--

LOCK TABLES `Answer` WRITE;
/*!40000 ALTER TABLE `Answer` DISABLE KEYS */;
INSERT INTO `Answer` VALUES (12,21,'2020-05-13',1),(16,21,'2020-05-18',1),(13,22,'2020-05-21',1),(12,23,'2020-05-13',1),(16,23,'2020-05-18',0),(13,24,'2020-05-22',0),(16,30,'2020-05-18',0),(13,31,'2020-05-16',1),(13,32,'2020-05-21',1),(16,33,'2020-05-18',1),(16,34,'2020-05-18',1),(13,35,'2020-05-18',1),(12,36,'2020-05-21',1),(13,36,'2020-05-18',1),(12,38,'2020-05-22',1),(12,39,'2020-05-21',1),(12,40,'2020-05-21',0),(16,40,'2020-05-21',1),(12,41,'2020-05-21',1),(13,41,'2020-05-21',1),(12,44,'2020-05-22',1),(13,45,'2020-05-22',1),(12,53,'2020-05-23',1),(12,62,'2020-05-24',1),(15,65,'2020-05-23',1),(13,93,'2020-05-24',1),(15,93,'2020-05-24',1),(12,94,'2020-05-24',1),(13,95,'2020-05-24',1);
/*!40000 ALTER TABLE `Answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment` (
  `idComment` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `author` int(10) unsigned NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `creationDate` date NOT NULL,
  `idAnnounce` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idComment`),
  UNIQUE KEY `idComment_UNIQUE` (`idComment`),
  KEY `fk_Comment_User_idx` (`author`),
  KEY `fk_Comment_Announce_idx` (`idAnnounce`),
  CONSTRAINT `fk_Comment_Announce` FOREIGN KEY (`idAnnounce`) REFERENCES `Announce` (`idAnnounce`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comment_User` FOREIGN KEY (`author`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Notification` (
  `idNotification` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `creationDate` date NOT NULL,
  `content` varchar(600) DEFAULT NULL,
  `context` varchar(100) DEFAULT NULL,
  `treated` tinyint(4) DEFAULT '0',
  `updater` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idNotification`),
  UNIQUE KEY `idNotification_UNIQUE` (`idNotification`),
  KEY `fk_Notification_userId_idx` (`userId`),
  CONSTRAINT `fk_Notification_userId` FOREIGN KEY (`userId`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Review` (
  `idReview` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `author` int(10) unsigned NOT NULL,
  `announce` int(10) unsigned NOT NULL,
  `creationDate` date NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `note` int(11) NOT NULL,
  `receiver` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idReview`),
  UNIQUE KEY `idReview_UNIQUE` (`idReview`),
  UNIQUE KEY `announce_author_receiver_unique` (`author`,`announce`,`receiver`),
  KEY `fk_Review_1_idx` (`author`),
  KEY `fk_Review_announce_idx` (`announce`),
  KEY `fk_Review_receiver_idx` (`receiver`),
  CONSTRAINT `fk_Review_announce` FOREIGN KEY (`announce`) REFERENCES `Announce` (`idAnnounce`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_author` FOREIGN KEY (`author`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_receiver` FOREIGN KEY (`receiver`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `idUser` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `passwordHash` varchar(100) NOT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `bio` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `idUsers_UNIQUE` (`idUser`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Romina','Trololo',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(2,'Misha','Frumusica',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(3,'Misha2','$2b$12$Dnkt0pUpxjHYSJf3i2YqiuVIKoTja4QeYBy8xt',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(4,'Misha3','$2b$12$w8lAavjMRG/B6OyjtKQX9OA5.1YN7dtDyEAsQ5',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(5,'Misha4','$2b$12$V/AToYtAFACu5PTDLPoYsOqX8sjtAo.JweYmNK',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(6,'Misha5','$2b$12$v/rjmafNiktdKg8SKpw48OvwIctL7EnPCTmL54',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(7,'Misha6','$2b$12$E.IFV20zzyCq2v.RwxqbPOOE.rZvhjJ0kuHrRd',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(8,'Misha7','$2b$12$AP7zxXZ2F.1jWU1tMQLJr.GZCnN10anIfnUei3',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(9,'Misha8','$2b$12$XZHr2/jvgIrhUKFLZBYY3O7fVUFQM5vncAN3XHTOQVmBsk7ay7mQS',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(10,'Misha9','$2b$12$MniXVm5lABI3jl3i5yPorugBVPOf5jpbfU1PuiRUkyGRGie01BHZy',NULL,NULL,NULL,NULL,'photo_undefined.png',NULL),(11,'Misha10','$2b$12$D5wHnpUDIHjWLrQWdyHAQOp1nHBSfAdZatD7DOX4zfNAVKvQE/ZNi','frumusica@misha_liubimii_pfr',NULL,'Tomy_motan_yo',NULL,'photo_undefined.png',NULL),(12,'thomas@thomas','$2b$12$tpDLcBq2IbnxbDbQ42jpPuJdOfD8ehuLVNYovmCrgoxJ9W/S3Clq.','thomas@thomas','man','Thomas','T','uenvdypdsx.jpg','MA BIO'),(13,'bilel@bilel','$2b$12$WzEiNaxgecKfc1S2fnhGdO8/K0Hcckq27CfyEF/fDQz0JRJvfjage','bilel@bilel','man','Bilel','SAGHROUCHNI','kzeaytrujg.jpg','20 ans - qlf'),(14,'tommy@tommy','$2b$12$hWBC8GlCMmb4Io89UZ/eqeU.X0G4HOjvCznWr2By.Rl2j4.7VotWa','tommy@tommy','man','Tommy','T','eimezgcnlx.jpg',NULL),(15,'gabriel@gabriel','$2b$12$Alanjdm95f006Rx3TdrY5OG0HXhnSByMLcF8PVDHniQJB.b30hDuW','gabriel@gabriel','man','Gabriel','Fournier','photo_undefined.png',NULL),(16,'test@test','$2b$12$z856QIvKS2lVp2qWpkatp.hx18T8iSNA0ge.mfe64XcgNAZGnaaxS','test@test','man','Test','Test','photo_undefined.png',NULL),(17,'test@notif','$2b$12$5vBM.11tY9MlUtYaaWMlr.GWkvN2YjPrrEQlQtn8bglr23ZejEiye','test@notif','other','Test','Notif','photo_undefined.png',NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-24 22:30:31
