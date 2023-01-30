-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2023 at 10:04 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `device_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `device_details`
--

CREATE TABLE `device_details` (
  `serial_number` int(7) NOT NULL,
  `customer` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `project` varchar(20) NOT NULL,
  `site` varchar(20) NOT NULL,
  `model` varchar(20) NOT NULL,
  `shiped_on` varchar(22) NOT NULL,
  `installed_on` varchar(22) NOT NULL,
  `warranty_valid` varchar(22) NOT NULL,
  `unit_price` int(4) NOT NULL,
  `min_temp_a` int(4) NOT NULL,
  `max_temp_a` int(4) NOT NULL,
  `min_temp_b` int(4) NOT NULL,
  `max_temp_b` int(4) NOT NULL,
  `spiral_a_max_qty` int(4) NOT NULL,
  `spiral_b_max_qty` int(4) NOT NULL,
  `max_door_count` int(4) NOT NULL,
  `max_burn_time` int(3) NOT NULL,
  `forced_burn_time` time NOT NULL,
  `createdAt` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `updatedAt` varchar(255) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `device_details`
--

INSERT INTO `device_details` (`serial_number`, `customer`, `name`, `state`, `city`, `project`, `site`, `model`, `shiped_on`, `installed_on`, `warranty_valid`, `unit_price`, `min_temp_a`, `max_temp_a`, `min_temp_b`, `max_temp_b`, `spiral_a_max_qty`, `spiral_b_max_qty`, `max_door_count`, `max_burn_time`, `forced_burn_time`, `createdAt`, `updatedAt`) VALUES
(3, 'sdfsdf', 'g', 'fjhf', 'jh', 'jhgjhbgjhgb', 'gbjjhbgjhbg', 'jgbjhgjhbg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 647671, 681768, 714684, 68174, 6817, 0, 0, 1768, 17, '838:59:59', '2023-01-08 11:26:27', '2023-01-08 11:26:27'),
(4, 'sdfsdf', 'g', 'fjhf', 'jh', 'jhgjhbgjhgb', 'gbjjhbgjhbg', 'jgbjhgjhbg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 647671, 681768, 714684, 68174, 6817, 0, 0, 1768, 17, '838:59:59', '2023-01-08 11:27:30', '2023-01-08 11:27:30'),
(6, 'qweqwehgyhgy', 'yhugy', 'hgju', 'guyghgy', 'tgy', 'ghuy', 'guy', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 426, 46, 6, 6, 6, 90, 75, 624623, 4, '03:15:34', '2023-01-08 11:41:54', '2023-01-13 18:55:14'),
(7, 'qweqwehgyhgy', 'yhugy', 'hgju', 'guyghgy', 'tgy', 'ghuy', 'guy', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 426, 46, 6, 6, 6, 0, 0, 624623, 4, '03:15:34', '2023-01-08 13:36:15', '2023-01-08 13:36:15'),
(8, 'dfsdfsdf', 'sdgsdgsdg', 'sdgsdg', 'sdgsdg', 'sdgsdg', 'sdfs', 'sdgsdg', '2023-01-05', '2023-01-19', '2023-01-25', 54, 4545, 4545, 4545, 0, 454, 4, 4, 4, '00:00:00', '2023-01-11 18:02:30', '2023-01-14 16:50:54'),
(11, 'etewtwet', 'Rajendra singh', 'Madhya Pradesh', 'rewa', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:04:45', '2023-01-11 18:04:45'),
(12, 'dfsdfsdf', 'Rajendra singh', 'Madhya Pradesh', 'rewa', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:05:37', '2023-01-11 18:05:37'),
(13, 'dfsdfsdf', 'Shivendra singh', 'Madhya Pradesh', 'Rewa', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:07:12', '2023-01-11 18:07:12'),
(14, 'dfsdfsdf', 'Shivendra singh', 'Madhya Pradesh', 'Rewa', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:12:58', '2023-01-11 18:12:58'),
(15, 'dfsdfsdf', 'Shivendra singh', 'Madhya Pradesh', 'Rewa', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:13:08', '2023-01-11 18:13:08'),
(16, '', '', '', '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:13:15', '2023-01-11 18:13:15'),
(17, 'dfsdfsdf', 'Shivendra singh', 'Madhya Pradesh', 'Rewa', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:15:39', '2023-01-11 18:15:39'),
(18, 'etewtwet', 'Shivendra singh', 'Madhya Pradesh', 'Rewa', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:16:33', '2023-01-11 18:16:33'),
(19, 'abhisjek singh', 'Shivendra singh', 'Madhya Pradesh', 'Rewa', 'wqeqwerqwr', 'qwqwr', 'qwrqwrqwr', 'wqrqwr', 'qwrqwr', 'qwrqwrqw', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:19:37', '2023-01-13 08:34:59'),
(20, 'dfsdfsdf', 'Shivendra singh', 'Madhya Pradesh', 'Rewa', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, '00:00:00', '2023-01-11 18:25:07', '2023-01-11 18:25:07'),
(21, 'neelam singh', 'eddsd', 'ada', 'ytfv', 'ytf', 'ty', 'fvty', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 5134542, 6426464, 64646, 6464, 0, 0, 0, 64646, 4666, '426:46:46', '2023-01-12 17:46:44', '2023-01-13 08:05:07');

-- --------------------------------------------------------

--
-- Table structure for table `device_transaction`
--

CREATE TABLE `device_transaction` (
  `id` int(10) NOT NULL,
  `current_temp_a` int(4) NOT NULL,
  `current_temp_b` int(4) NOT NULL,
  `current_door_count` int(4) NOT NULL,
  `life_door_count` int(7) NOT NULL,
  `current_qty` int(4) NOT NULL,
  `life_qty` int(7) NOT NULL,
  `current_burn_cycle` int(4) NOT NULL,
  `life_burn_cycle` int(7) NOT NULL,
  `last_on_time` datetime NOT NULL,
  `last_of_time` datetime NOT NULL,
  `last_status` datetime NOT NULL,
  `status` varchar(20) NOT NULL,
  `status_type` int(1) NOT NULL,
  `spiral_a_status` int(1) NOT NULL,
  `spiral_b_status` int(1) NOT NULL,
  `current_cash` int(20) NOT NULL,
  `life_cash` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device_details`
--
ALTER TABLE `device_details`
  ADD PRIMARY KEY (`serial_number`);

--
-- Indexes for table `device_transaction`
--
ALTER TABLE `device_transaction`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device_details`
--
ALTER TABLE `device_details`
  MODIFY `serial_number` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `device_transaction`
--
ALTER TABLE `device_transaction`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
