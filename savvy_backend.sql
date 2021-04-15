-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2021 at 10:12 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `savvy_backend`
--
CREATE DATABASE IF NOT EXISTS `savvy_backend` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `savvy_backend`;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `isLast` int(11) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `recipient_id`, `message`, `isLast`, `createdAt`) VALUES
(948, 86, 87, 'aku dimas', 0, '2021-04-15 06:24:18'),
(949, 87, 86, 'oke', 1, '2021-04-15 06:25:23'),
(950, 87, 101, ' aaa', 1, '2021-04-15 06:36:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(100) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `phoneNumber`, `picture`, `email`, `password`, `createdAt`) VALUES
(86, 'Dimas', NULL, 'picture-1618472996782.png', 'dimas@gmail.com', '$2b$10$kVAP/3uHiU6zecA.x71jr.nPJOcLyPu1qwAEzXLa7YTmLuZJS5Zde', '2021-04-08 07:54:47'),
(87, 'Shafa Naura', '0895387755454', 'picture-1617895307099.jpg', 'shafa@gmail.com', '$2b$10$ItkszgUcrXYLsyF3M3pR2emm2mjKfabh4RSjsCjKyP9j.m1Jeh4A6', '2021-04-08 08:20:58'),
(88, 'Andin Dhiya', NULL, NULL, 'andin@gmail.com', '$2b$10$xR.RIUfsnjLmYjdd5KlJ/.tYCL1LKvnjzjWlE6.qC4tuNeRBLJtkq', '2021-04-08 08:51:44'),
(89, 'Rifki Syahreza', NULL, NULL, 'rifki@gmail.com', '$2b$10$FgvSb65tFwlyvO.q1/5IGeDCVoKVS9f49k73jqPfMlW/yhLznjGIu', '2021-04-08 08:52:08'),
(90, 'Ryan Putra', NULL, NULL, 'ryan@gmail.com', '$2b$10$SXVCXKaRXsTojUXz.K4oLOX1PmriS.NFiW9pvvhgzcxMovqv./dvq', '2021-04-08 08:52:22'),
(91, 'Putri', NULL, NULL, 'putri@gmail.com', '$2b$10$DllD6WW.iF0S2pNh2xP29uAXWhZfJu28W6.4TOEjaDt557tthHlta', '2021-04-08 08:52:39'),
(92, 'Fabian', NULL, NULL, 'fabian@gmail.com', '$2b$10$p5FsLj3m6txh.eLz38w7ve1xf1h8/nTy/jjTAPh4wYAvaJEvfwXv.', '2021-04-08 08:52:55'),
(93, 'Tasya', NULL, NULL, 'tasya@gmail.com', '$2b$10$CrVLxFXe28EKFJfdrEnG6O4u00S5SRL5GsnXO.th5uMhkaFjQalbG', '2021-04-08 08:53:09'),
(94, 'Amanda Eka', NULL, NULL, 'amanda@gmail.com', '$2b$10$PHvsz/Ul.9pFlhyPTjRM0ePwDzZ/cqXCTyMFEp6NvqNmeGz8un.R2', '2021-04-08 08:53:33'),
(96, 'Wisnu Adi', NULL, NULL, 'wisnu@gmail.com', '$2b$10$GFC2srMYrd4.xYArL2NFDeaaXawExLSPWLAryxaMxr9bpxLqo6EfS', '2021-04-08 08:54:41'),
(97, 'Widya Agustina', NULL, NULL, 'widya@gmail.com', '$2b$10$qxHC/8n6Srm4gvu8nSLV.u1c/dwEgOxMMdD7wotiOY4eMpn8ap./2', '2021-04-08 08:55:01'),
(98, 'Tesya Adinda', NULL, NULL, 'tesya@gmail.com', '$2b$10$jzosT/6jerZ2d1zW/iK6Cu8wHf/TkBYc0bFocDAw6hQ.wXLF47AEe', '2021-04-08 08:55:11'),
(99, 'Tiana', NULL, NULL, 'tiana@gmail.com', '$2b$10$Z98TV9bXC17s9SvWZo4L7uX8L9DJKGywfDkPAEJNDQthJEmWZ08Ya', '2021-04-08 08:55:22'),
(100, 'Mayank Satrisna', NULL, NULL, 'mayank@gmail.com', '$2b$10$5NRmSxrHzTxPY/BPUxYN0eNavSFBUsUn5GpetFE9OVPgvQ9UDzXoW', '2021-04-08 08:55:34'),
(101, 'Cinthia Triya', NULL, NULL, 'cinthia@gmail.com', '$2b$10$0z5TrcJ1kM6PwkgNz.mtLuhAlSBHBaEnxlQeFVBHZaH0jIxC7mkmq', '2021-04-08 08:55:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`,`recipient_id`),
  ADD KEY `recipient_id` (`recipient_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=951;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
