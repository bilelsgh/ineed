-- MySQL dump 10.16  Distrib 10.1.44-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ineed
-- ------------------------------------------------------
-- Server version	10.1.44-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
  `content` varchar(200) DEFAULT NULL,
  `viewNumber` int(11) NOT NULL,
  `price` decimal(10,2) unsigned DEFAULT NULL,
  `idUser` int(10) unsigned NOT NULL,
  `finished` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idAnnounce`),
  UNIQUE KEY `idAnnounce_UNIQUE` (`idAnnounce`),
  KEY `fk_Announce_1_idx` (`idUser`),
  CONSTRAINT `fk_Announce_1` FOREIGN KEY (`idUser`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announce`
--

LOCK TABLES `Announce` WRITE;
/*!40000 ALTER TABLE `Announce` DISABLE KEYS */;
INSERT INTO `Announce` VALUES (1,'2020-03-26','',0,100.00,11,NULL),(2,'2020-03-26','',4,100.00,11,NULL),(3,'2020-03-26','',10,103.30,11,NULL);
/*!40000 ALTER TABLE `Announce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Answer`
--

DROP TABLE IF EXISTS `Answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Answer` (
  `userID` int(10) unsigned DEFAULT NULL,
  `announceid` int(10) unsigned DEFAULT NULL,
  `time` date NOT NULL,
  `accepted` tinyint(4) DEFAULT NULL,
  KEY `fk_Answer_announce_idx` (`announceid`),
  KEY `fk_Answer_user_idx` (`userID`),
  CONSTRAINT `fk_Answer_announce` FOREIGN KEY (`announceid`) REFERENCES `Announce` (`idAnnounce`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Answer_user` FOREIGN KEY (`userID`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Answer`
--

LOCK TABLES `Answer` WRITE;
/*!40000 ALTER TABLE `Answer` DISABLE KEYS */;
INSERT INTO `Answer` VALUES (10,2,'2020-05-05',0),(10,2,'2020-05-05',0);
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
INSERT INTO `Comment` VALUES (1,11,'Si Frumusica il iubeste pe Misha ;*','2020-04-01',2),(2,10,'ggggg, eus vrednaia :PP','2020-04-01',2);
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
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
  PRIMARY KEY (`idReview`),
  UNIQUE KEY `idReview_UNIQUE` (`idReview`),
  KEY `fk_Review_1_idx` (`author`),
  KEY `fk_Review_announce_idx` (`announce`),
  CONSTRAINT `fk_Review_announce` FOREIGN KEY (`announce`) REFERENCES `Announce` (`idAnnounce`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_author` FOREIGN KEY (`author`) REFERENCES `Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
INSERT INTO `Review` VALUES (1,11,3,'2020-04-04','Frumusica ii iubita de Misha si invers',10);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Romina','Trololo',NULL,NULL,NULL,NULL,NULL,NULL),(2,'Misha','Frumusica',NULL,NULL,NULL,NULL,NULL,NULL),(3,'Misha2','$2b$12$Dnkt0pUpxjHYSJf3i2YqiuVIKoTja4QeYBy8xt',NULL,NULL,NULL,NULL,NULL,NULL),(4,'Misha3','$2b$12$w8lAavjMRG/B6OyjtKQX9OA5.1YN7dtDyEAsQ5',NULL,NULL,NULL,NULL,NULL,NULL),(5,'Misha4','$2b$12$V/AToYtAFACu5PTDLPoYsOqX8sjtAo.JweYmNK',NULL,NULL,NULL,NULL,NULL,NULL),(6,'Misha5','$2b$12$v/rjmafNiktdKg8SKpw48OvwIctL7EnPCTmL54',NULL,NULL,NULL,NULL,NULL,NULL),(7,'Misha6','$2b$12$E.IFV20zzyCq2v.RwxqbPOOE.rZvhjJ0kuHrRd',NULL,NULL,NULL,NULL,NULL,NULL),(8,'Misha7','$2b$12$AP7zxXZ2F.1jWU1tMQLJr.GZCnN10anIfnUei3',NULL,NULL,NULL,NULL,NULL,NULL),(9,'Misha8','$2b$12$XZHr2/jvgIrhUKFLZBYY3O7fVUFQM5vncAN3XHTOQVmBsk7ay7mQS',NULL,NULL,NULL,NULL,NULL,NULL),(10,'Misha9','$2b$12$MniXVm5lABI3jl3i5yPorugBVPOf5jpbfU1PuiRUkyGRGie01BHZy',NULL,NULL,NULL,NULL,NULL,NULL),(11,'Misha10','$2b$12$D5wHnpUDIHjWLrQWdyHAQOp1nHBSfAdZatD7DOX4zfNAVKvQE/ZNi','frumusica@misha_liubimii_pfr',NULL,'Tomy_motan_yo',NULL,'hello.h',NULL);
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

-- Dump completed on 2020-05-07 17:36:42
