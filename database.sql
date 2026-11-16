-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: actionflow_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `sender_name` varchar(100) NOT NULL,
  `sender_email` varchar(100) NOT NULL,
  `recipient` varchar(100) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL,
  `content` text NOT NULL,
  `attachments` json DEFAULT NULL,
  `ai_summary` text,
  `ai_category` varchar(100) DEFAULT NULL,
  `ai_intent` varchar(100) DEFAULT NULL,
  `ai_priority` varchar(20) DEFAULT NULL,
  `requires_response` tinyint(1) DEFAULT NULL,
  `suggested_reply` text,
  `is_analyzed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_messages_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('MSG001','email','Rahul Sharma','rahul@example.com','team@example.com','Website Launch','2026-11-02 10:30:00','Please complete the payment gateway integration and share the staging URL before Thursday.','[]','The sender requests the completion of the payment gateway integration and sharing of the staging URL before Thursday.','Client Request','Requesting Action','High',1,'Hello,\n\nThank you for reaching out. We are actively working on the payment gateway integration and will share the staging URL with you as requested before Thursday.\n\nBest regards,',1),('MSG0010','email','User 10','user10@example.com','team@example.com','General Inquiry 10','2026-11-16 14:46:37','This is a sample message 10 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0011','email','User 11','user11@example.com','team@example.com','General Inquiry 11','2026-11-16 14:46:37','This is a sample message 11 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0012','email','User 12','user12@example.com','team@example.com','General Inquiry 12','2026-11-16 14:46:37','This is a sample message 12 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0013','email','User 13','user13@example.com','team@example.com','General Inquiry 13','2026-11-16 14:46:37','This is a sample message 13 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0014','email','User 14','user14@example.com','team@example.com','General Inquiry 14','2026-11-16 14:46:37','This is a sample message 14 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0015','email','User 15','user15@example.com','team@example.com','General Inquiry 15','2026-11-16 14:46:37','This is a sample message 15 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0016','email','User 16','user16@example.com','team@example.com','General Inquiry 16','2026-11-16 14:46:37','This is a sample message 16 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0017','email','User 17','user17@example.com','team@example.com','General Inquiry 17','2026-11-16 14:46:37','This is a sample message 17 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0018','email','User 18','user18@example.com','team@example.com','General Inquiry 18','2026-11-16 14:46:37','This is a sample message 18 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0019','email','User 19','user19@example.com','team@example.com','General Inquiry 19','2026-11-16 14:46:37','This is a sample message 19 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG002','email','Priya Patel','priya@client.com','support@example.com','Server Down','2026-11-02 11:15:00','URGENT! Our production server is completely down. Clients cannot log in. Fix this immediately.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0020','email','User 20','user20@example.com','team@example.com','General Inquiry 20','2026-11-16 14:46:37','This is a sample message 20 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0021','email','User 21','user21@example.com','team@example.com','General Inquiry 21','2026-11-16 14:46:37','This is a sample message 21 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0022','email','User 22','user22@example.com','team@example.com','General Inquiry 22','2026-11-16 14:46:37','This is a sample message 22 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0023','email','User 23','user23@example.com','team@example.com','General Inquiry 23','2026-11-16 14:46:37','This is a sample message 23 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0024','email','User 24','user24@example.com','team@example.com','General Inquiry 24','2026-11-16 14:46:37','This is a sample message 24 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG0025','email','User 25','user25@example.com','team@example.com','General Inquiry 25','2026-11-16 14:46:37','This is a sample message 25 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG003','message','Amit Kumar','amit@example.com','hr@example.com','Leave Request','2026-11-02 12:00:00','Hi, I would like to request leave for next Monday and Tuesday due to a family emergency.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG004','email','Neha Gupta','neha@example.com','team@example.com','Weekly Newsletter','2026-11-02 14:00:00','Here is the weekly newsletter highlighting our top articles on AI and web development. Enjoy reading!','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG005','email','Vikram Singh','vikram@client.com','sales@example.com','Invoice Discrepancy','2026-11-02 15:30:00','I noticed a discrepancy in invoice #4512. You charged us for 10 licenses but we only ordered 5. Please resolve this by tomorrow.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG006','email','User 6','user6@example.com','team@example.com','General Inquiry 6','2026-11-16 14:46:37','This is a sample message 6 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG007','email','User 7','user7@example.com','team@example.com','General Inquiry 7','2026-11-16 14:46:37','This is a sample message 7 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG008','email','User 8','user8@example.com','team@example.com','General Inquiry 8','2026-11-16 14:46:37','This is a sample message 8 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0),('MSG009','email','User 9','user9@example.com','team@example.com','General Inquiry 9','2026-11-16 14:46:37','This is a sample message 9 for testing. Please review the attached document and let me know if you have any questions.','[]',NULL,NULL,NULL,NULL,0,NULL,0);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `priority` varchar(20) NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `message_id` (`message_id`),
  KEY `ix_tasks_id` (`id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (6,'MSG001','Complete payment gateway integration','Finish integrating the payment gateway for the website launch.','High',NULL,'Pending','2026-11-16 15:04:43','2026-11-16 15:04:43'),(7,'MSG001','Share staging URL','Send the staging URL to the stakeholder once integration is completed.','High',NULL,'Pending','2026-11-16 15:04:43','2026-11-16 15:04:43');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-16 20:50:04
