-- phpMyAdmin SQL Dump
-- JAB LAB Database
-- Database: `jablab`

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8;

-- --------------------------------------------------------
-- Struttura della tabella `users`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=2;

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password_hash`, `created_at`) VALUES
(1, 'Demo', 'User', 'demo@jablab.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVxHeTJSEa', '2026-04-13 10:52:02');

-- --------------------------------------------------------
-- Struttura della tabella `favorites`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `fighter_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_favorites_user_fighter` (`user_id`,`fighter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=4;

INSERT INTO `favorites` (`id`, `user_id`, `fighter_id`) VALUES
(3, 1, 170),
(1, 1, 252),
(2, 1, 313);

-- --------------------------------------------------------
-- Relazioni
-- --------------------------------------------------------

ALTER TABLE `favorites`
  ADD CONSTRAINT `fk_favorites_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
