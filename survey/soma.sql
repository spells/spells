-- phpMyAdmin SQL Dump
-- version 3.2.3
-- http://www.phpmyadmin.net
--
-- 호스트: localhost
-- 처리한 시간: 14-08-27 03:45 
-- 서버 버전: 5.1.41
-- PHP 버전: 5.2.12

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 데이터베이스: `soma`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `question_list`
--

CREATE TABLE IF NOT EXISTS `question_list` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `text` varchar(255) CHARACTER SET utf8 NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=61 ;

--
-- 테이블의 덤프 데이터 `question_list`
--

INSERT INTO `question_list` (`idx`, `type`, `text`, `count`) VALUES
(1, 1, '감시 카메라로 집안을 촬영한 영상을 집 밖에서 보도록 해주는 시스템', 0),
(2, 1, '창문 열리면 핸드폰으로 알림을 주는 시스템', 1),
(3, 1, '스마트폰으로 도어락을 제어할 수 있게 해주는 시스템', 1),
(4, 1, '집에 모르는 사람이 접근하면 사람 목소리를 재생하는 시스템', 0),
(5, 1, '집에 모르는 사람이 접근하면 조명과 텔레비젼을 켜는 시스템', 0),
(6, 1, '도어락에 혼자만 볼 수 있는 출입 기록을 남기는 시스템', 1),
(7, 1, '위급할 때 누를 수 있는 비상벨을 제공하는 시스템', 0),
(8, 1, '잠이 들면 모든 보안 장치를 잠그는 시스템', 1),
(9, 1, '잠이 들면 실내 조명을 자동으로 끄는 시스템', 1),
(10, 1, '열쇠를 집에 두고 나가지 않도록 알리는 시스템', 2),
(11, 1, '집에서 나가면 모든 출입구를 잠그는 시스템', 1),
(12, 1, '범죄 위험 지역 근처에서 알려 주는 시스템', 0),
(13, 2, '집에 도착하기 전 냉난방 장치를 자동으로 켜는 시스템', 1),
(14, 2, '집에 도착하기 전 조명을 자동으로 켜는 시스템', 1),
(15, 2, '집에서 나가면 냉난방 장치를 자동으로 끄는 시스템', 0),
(16, 2, '집에서 나가면 조명을 자동으로 끄는 시스템', 0),
(17, 2, '실내 공기가 오염되면 사람이 없어도 자동으로 환기를 수행하는 시스템', 2),
(18, 2, '실내에 빨래를 널면 제습기나 에어컨을 자동으로 켜는 시스템', 0),
(19, 2, '실내 온도가 설정온도 이상으로 올라가면 자동으로 냉난방 장치를 켜고 끄는 시스템', 1),
(20, 2, '취침 시간에 맞춰서 천천히 방안의 조도 소리 등을 서서히 낮춰주는 시스템', 1),
(21, 2, '날씨를 자동으로 알려 주는 시스템', 1),
(22, 2, '겨울이 되기 전 월동 준비를 권유하는 시스템', 0),
(23, 2, '집 도착 시간에 맞추어 빨래를 돌려줘서 바로 널 수 있게 해주는 시스템', 1),
(24, 2, '집 도착 시간에 맞추어 밥을 짓는 시스템', 1),
(25, 2, '세탁이 종료되면 스마트폰으로 알려 주는 시스템', 1),
(26, 2, '자연 재해가 발생하면 대처 방법을 알려 주는 시스템', 0),
(27, 2, '음악을 들을 때 외부 소음이 안들릴 정도까지만 불륨을 올려주는 시스템', 0),
(28, 2, '벽에 아두이노를 압력센서와 스피커를 붙혀서 옆방 음파에 의한 소음 인식시 비슷한 소음을 발생시키는 시스템', 0),
(29, 3, '내 기분에 따라 음악을 들려 주는 시스템', 1),
(30, 3, '내 기분에 따라 방의 밝기를 조절하는 시스템', 1),
(31, 3, '힘든 일이 있을 때 나를 걱정해 주는 시스템', 1),
(32, 3, '좋은 일이 있을 때 자랑할 수 있는 시스템', 1),
(33, 3, '지쳐있을 때 나를 방해하지 않는 시스템', 1),
(34, 3, '지루한 수업에 들어가기 전 나를 응원해 주는 시스템', 1),
(35, 3, '내 기념일을 알아서 챙겨 주는 시스템', 1),
(36, 3, '기분이 좋지 않은 이유를 물어보고 일기처럼 기록해 주는 시스템', 0),
(37, 3, '내 기분을 이해하는 시스템', 1),
(38, 3, '내 기분에 따라 음악을 들려 주는 시스템', 1),
(39, 3, '내 기분에 따라 방의 밝기를 조절하는 시스템', 0),
(40, 3, '내 기분에 따라 식단을 추천해 주는 시스템', 1),
(41, 3, '충동 구매를 억제할 수 있게 하는 시스템', 1),
(42, 3, '매일 어울리는 옷을 추천해 주는 시스템', 1),
(43, 3, '야식을 못먹게 해주는 시스템', 1),
(44, 4, '오전 뉴스를 정리하여 아침에 알려 주는 시스템', 1),
(45, 4, '불필요한 모임에 참여하지 않게 하는 시스템', 1),
(46, 4, '가끔 별이 보이는 날에는 나와 같이 밤하늘을 바라보는 시스템', 0),
(47, 4, '메모에 지정된 날짜와 시간이 되면 알려 주는 시스템', 1),
(48, 4, '음성을 인식하고 자동으로 메모로 등록하는 시스템', 0),
(49, 4, '메모할 일이 있는지 가끔 물어봐 주는 시스템', 1),
(50, 4, '메모를 분석하여 구입할 물건을 자동으로 쇼핑 목록에 추가하는 시스템', 1),
(51, 4, '메모를 분석하여 각 주의 주요 사건을 알려 주는 시스템', 1),
(52, 4, '메모를 분석하여 다음 할 일을 알려 주는 시스템', 1),
(53, 4, '정신없을 때 에로사항 발생시 간단한 조작으로 메모할 것이 있음을 체크하고 나중에 알려주는 시스템', 0),
(54, 4, '샤워 중에도 메모를 할 수 있도록 하는 시스템', 0),
(55, 4, '메모를 보관했다가 정말로 필요할 때 메모를 보여 주는 시스템', 0),
(56, 4, '과제를 두고 학교로 가지 않도록 하는 시스템', 0),
(57, 4, '교과서를 두고 학교로 가지 않도록 하는 시스템', 1),
(58, 4, '열쇠를 잃어버리지 않도록 하는 시스템', 0),
(59, 4, '열쇠를 둔 장소를 잊어버리지 않도록 하는 시스템', 0),
(60, 4, '에어컨 TV 리모콘이나 휴대폰의 위치를 알려주는 시스템', 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `response_data`
--

CREATE TABLE IF NOT EXISTS `response_data` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `session` varchar(255) CHARACTER SET utf8 NOT NULL,
  `order` int(11) NOT NULL,
  `question_1_idx` int(11) NOT NULL,
  `question_2_idx` int(11) NOT NULL,
  `selected` int(11) NOT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=218 ;

--
-- 테이블의 덤프 데이터 `response_data`
--

INSERT INTO `response_data` (`idx`, `session`, `order`, `question_1_idx`, `question_2_idx`, `selected`) VALUES
(198, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 1, 9, 29, 9),
(199, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 2, 21, 35, 21),
(200, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 3, 3, 40, 3),
(201, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 4, 49, 34, 49),
(202, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 5, 13, 37, 13),
(203, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 6, 2, 17, 2),
(204, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 7, 11, 41, 11),
(205, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 8, 44, 23, 44),
(206, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 9, 25, 10, 25),
(207, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 10, 14, 51, 14),
(208, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 11, 20, 31, 20),
(209, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 12, 38, 24, 38),
(210, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 13, 33, 52, 33),
(211, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 14, 6, 42, 6),
(212, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 15, 19, 57, 19),
(213, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 16, 17, 45, 17),
(214, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 17, 60, 32, 60),
(215, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 18, 10, 50, 10),
(216, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 19, 47, 43, 47),
(217, 'uA_28dlDKWyxfSVGBfnUGRq-NKsD7q6-', 20, 30, 8, 30);
