-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: exam_reg_db
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','STUDENT') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'aqn@vnu.edu.vn','$2a$10$hbO/XhnkW882CEsexCWncOncFQd7EYNX5/S2WMm/axWRoEtka0W/a','ADMIN');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `exam_code` varchar(255) DEFAULT NULL,
  `exam_name` varchar(255) DEFAULT NULL,
  `exam_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (1,'SY2025-2026','Final','Computer_base');
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_registration`
--

DROP TABLE IF EXISTS `exam_registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_registration` (
  `exam_session_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `registered_at` datetime(6) DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK84crck9wnajy69vh8qop9v39u` (`exam_session_id`),
  KEY `FKb5p9qj59e46m5nptnofeh61ii` (`student_id`),
  CONSTRAINT `FK84crck9wnajy69vh8qop9v39u` FOREIGN KEY (`exam_session_id`) REFERENCES `exam_session` (`id`),
  CONSTRAINT `FKb5p9qj59e46m5nptnofeh61ii` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_registration`
--

LOCK TABLES `exam_registration` WRITE;
/*!40000 ALTER TABLE `exam_registration` DISABLE KEYS */;
INSERT INTO `exam_registration` VALUES (6,14,'2025-11-20 18:30:07.344991',2),(2,15,'2025-11-20 18:30:40.333191',2);
/*!40000 ALTER TABLE `exam_registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_session`
--

DROP TABLE IF EXISTS `exam_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_session` (
  `capacity` int NOT NULL,
  `date` date DEFAULT NULL,
  `star_time` time(6) DEFAULT NULL,
  `exam_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `room_id` bigint DEFAULT NULL,
  `subject_id` bigint DEFAULT NULL,
  `exam_session_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1tl2mgliut7u8m44empslp6ie` (`exam_id`),
  KEY `FK83ifmftdinn90m408uw3fjavb` (`room_id`),
  KEY `FKajgts42053ciol79at2q9lasj` (`subject_id`),
  CONSTRAINT `FK1tl2mgliut7u8m44empslp6ie` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`),
  CONSTRAINT `FK83ifmftdinn90m408uw3fjavb` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `FKajgts42053ciol79at2q9lasj` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_session`
--

LOCK TABLES `exam_session` WRITE;
/*!40000 ALTER TABLE `exam_session` DISABLE KEYS */;
INSERT INTO `exam_session` VALUES (40,'2025-11-25','07:00:00.000000',1,1,1,1,'CKTG2015'),(40,'2025-11-25','07:00:00.000000',1,2,2,1,'KTGB2025'),(30,'2025-11-27','09:30:00.000000',1,3,4,2,'HIGB9827'),(30,'2025-11-27','09:30:00.000000',1,4,5,2,'HIGF1234'),(30,'2025-11-30','13:30:00.000000',1,5,6,3,'HSKF1234'),(30,'2025-11-30','13:30:00.000000',1,6,7,3,'HIVF1234');
/*!40000 ALTER TABLE `exam_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_log`
--

DROP TABLE IF EXISTS `import_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_log` (
  `admin_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `imported_at` datetime(6) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `import_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9c1ml4bu920ui1mwka0nvoe1g` (`admin_id`),
  CONSTRAINT `FK9c1ml4bu920ui1mwka0nvoe1g` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_log`
--

LOCK TABLES `import_log` WRITE;
/*!40000 ALTER TABLE `import_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `import_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Xuân Thủy, Cầu Giấy','Giảng đường 2'),(2,'Tôn Thất Thuyết, Nam Từ Liêm','Giảng đường 3'),(3,'Kiều Mai, Phú Diễn','Giảng đường 4'),(4,'Xuân Thủy, Cầu Giấy','Giảng đường 2'),(5,'Tôn Thất Thuyết, Nam Từ Liêm','Giảng đường 3'),(6,'Kiều Mai, Phú Diễn','Giảng đường 4');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `admin_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1ba0xmnpirxklxp7ggdnmhs3y` (`admin_id`),
  CONSTRAINT `FK1ba0xmnpirxklxp7ggdnmhs3y` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `period_number` int NOT NULL,
  `start_time` time(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `period`
--

LOCK TABLES `period` WRITE;
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
/*!40000 ALTER TABLE `period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_session`
--

DROP TABLE IF EXISTS `registration_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_session` (
  `expire_time` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `re_entry_deadline` datetime(6) DEFAULT NULL,
  `star_time` datetime(6) DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1occaofdvv18jqps1prbnxsbs` (`student_id`),
  CONSTRAINT `FK1occaofdvv18jqps1prbnxsbs` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_session`
--

LOCK TABLES `registration_session` WRITE;
/*!40000 ALTER TABLE `registration_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` enum('ADMIN','STUDENT') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `location_id` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrqejnp96gs9ldf7o6fciylxkt` (`location_id`),
  CONSTRAINT `FKrqejnp96gs9ldf7o6fciylxkt` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1,'102'),(2,1,'103'),(3,1,'104'),(4,3,'206'),(5,3,'207'),(6,3,'404A'),(7,3,'404B');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `faculty` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `major` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `student_code` varchar(255) NOT NULL,
  `gender` enum('FEMALE','MALE') DEFAULT NULL,
  `role` enum('ADMIN','STUDENT') NOT NULL,
  `first_login` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (2,NULL,'23021651@vnu.edu.vn',NULL,'Trần Thành Nguyên',NULL,'$2a$10$30LAFgsjOGwoI5rSEEd4mupFj0lM4/NguVOSFtMKvyX7aEMzldtbu','23021651','MALE','STUDENT',_binary '\0');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_subject`
--

DROP TABLE IF EXISTS `student_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_subject` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint DEFAULT NULL,
  `subject_id` bigint DEFAULT NULL,
  `status` enum('ELIGIBLE','INELIGIBLE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnhw926s5os3ei5wqfaq94j0mh` (`student_id`),
  KEY `FK5cvx0kd792xhvd99s3bsbygfq` (`subject_id`),
  CONSTRAINT `FK5cvx0kd792xhvd99s3bsbygfq` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
  CONSTRAINT `FKnhw926s5os3ei5wqfaq94j0mh` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_subject`
--

LOCK TABLES `student_subject` WRITE;
/*!40000 ALTER TABLE `student_subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_subject_status`
--

DROP TABLE IF EXISTS `student_subject_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_subject_status` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` enum('ELIGIBLE','INELIGIBLE') DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  `subject_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdvhxc03oy1798kpjwbp4rb6es` (`student_id`),
  KEY `FKkhq41b2hbsmhe5mleg3v2pata` (`subject_id`),
  CONSTRAINT `FKdvhxc03oy1798kpjwbp4rb6es` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  CONSTRAINT `FKkhq41b2hbsmhe5mleg3v2pata` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_subject_status`
--

LOCK TABLES `student_subject_status` WRITE;
/*!40000 ALTER TABLE `student_subject_status` DISABLE KEYS */;
INSERT INTO `student_subject_status` VALUES (1,'ELIGIBLE',2,1),(2,'INELIGIBLE',2,2),(3,'ELIGIBLE',2,3),(4,'ELIGIBLE',2,4);
/*!40000 ALTER TABLE `student_subject_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `credit_hour` int NOT NULL,
  `duration` int NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `subject_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (3,60,1,'Cơ sở dữ liệu','PHI1001'),(3,60,2,'Trí tuệ nhân tạo','PHI1002'),(4,90,3,'Kiến trúc máy tính','PHI1003'),(4,90,4,'Nhập môn lập trình','PHI2302'),(2,45,5,'Lịch sử Đảng','NTQ4324'),(2,45,6,'Triết học','MSI2025');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 18:45:20
