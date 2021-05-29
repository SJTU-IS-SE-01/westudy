create table SeatStatus( 
	Btime DATETIME,
	Etime DATETIME,
	Snum char(5),
    Seatcheck int, #0没有签到 1签到 2签退
    Id varchar(20),
	foreign key(Snum) REFERENCES Seat(Snum),
    foreign key(Id) REFERENCES Student(Id)
 );

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-09 20:59:30', '2021-04-10 20:59:30', '001', 0, '519021911113');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-09 20:59:30', '2021-04-10 20:59:30', '001', 0, '519021911114');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-20 21:00:00', '2021-04-20 22:00:00', '01401', 0, '519021910614');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-05-24 20:00:00', '2021-05-24 21:00:00', '01301', 0, '519021910614');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-05-25 20:00:00', '2021-05-25 21:00:00', '01301', 0, '519021910614');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-06-20 21:00:00', '2021-06-20 22:00:00', '01401', 0, '519021910614');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-29 08:00:00', '2021-04-29 09:00:00', '01301', 0, '519021910319');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-05-29 16:00:00', '2021-05-29 18:00:00', '01301', 0, '519021910319');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 13:00:00', '2021-04-23 15:00:00', '01301', 0, '319021910000');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 14:00:00', '2021-04-23 16:00:00', '01302', 0, '319021910001');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 15:00:00', '2021-04-23 17:00:00', '01303', 0, '319021910002');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 16:00:00', '2021-04-23 18:00:00', '01304', 0, '319021910003');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 17:00:00', '2021-04-23 19:00:00', '01305', 0, '319021910004');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 18:00:00', '2021-04-23 20:00:00', '01306', 0, '319021910005');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 19:00:00', '2021-04-23 21:00:00', '01307', 0, '319021910006');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 20:00:00', '2021-04-23 22:00:00', '01308', 0, '319021910007');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 21:00:00', '2021-04-23 23:00:00', '01309', 0, '319021910008');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 22:00:00', '2021-04-24 00:00:00', '01310', 0, '319021910009');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-23 23:00:00', '2021-04-24 01:00:00', '01311', 0, '319021910010');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 00:00:00', '2021-04-24 02:00:00', '01312', 0, '319021910011');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 01:00:00', '2021-04-24 03:00:00', '01313', 0, '319021910012');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 02:00:00', '2021-04-24 04:00:00', '01314', 0, '319021910013');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 03:00:00', '2021-04-24 05:00:00', '01315', 0, '319021910014');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 04:00:00', '2021-04-24 06:00:00', '01316', 0, '319021910015');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 05:00:00', '2021-04-24 07:00:00', '01317', 0, '319021910016');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 06:00:00', '2021-04-24 08:00:00', '01318', 0, '319021910017');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 07:00:00', '2021-04-24 09:00:00', '01401', 0, '319021910018');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 08:00:00', '2021-04-24 10:00:00', '01402', 0, '319021910019');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 09:00:00', '2021-04-24 11:00:00', '01403', 0, '319021910020');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 10:00:00', '2021-04-24 12:00:00', '01404', 0, '319021910021');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 11:00:00', '2021-04-24 13:00:00', '01405', 0, '319021910022');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 12:00:00', '2021-04-24 14:00:00', '01406', 0, '319021910023');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 13:00:00', '2021-04-24 15:00:00', '01407', 0, '319021910024');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 14:00:00', '2021-04-24 16:00:00', '01408', 0, '319021910025');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 15:00:00', '2021-04-24 17:00:00', '01409', 0, '319021910026');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 16:00:00', '2021-04-24 18:00:00', '01410', 0, '319021910027');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 17:00:00', '2021-04-24 19:00:00', '01411', 0, '319021910028');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 18:00:00', '2021-04-24 20:00:00', '01412', 0, '319021910029');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 19:00:00', '2021-04-24 21:00:00', '01413', 0, '319021910030');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 20:00:00', '2021-04-24 22:00:00', '01414', 0, '319021910031');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 21:00:00', '2021-04-24 23:00:00', '01415', 0, '319021910032');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 22:00:00', '2021-04-25 00:00:00', '01301', 0, '319021910033');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-24 23:00:00', '2021-04-25 01:00:00', '01302', 0, '319021910034');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 00:00:00', '2021-04-25 02:00:00', '01303', 0, '319021910035');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 01:00:00', '2021-04-25 03:00:00', '01304', 0, '319021910036');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 02:00:00', '2021-04-25 04:00:00', '01305', 0, '319021910037');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 03:00:00', '2021-04-25 05:00:00', '01306', 0, '319021910038');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 04:00:00', '2021-04-25 06:00:00', '01307', 0, '319021910039');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 05:00:00', '2021-04-25 07:00:00', '01308', 0, '319021910000');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 06:00:00', '2021-04-25 08:00:00', '01309', 0, '319021910001');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 07:00:00', '2021-04-25 09:00:00', '01310', 0, '319021910002');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 08:00:00', '2021-04-25 10:00:00', '01311', 0, '319021910003');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 09:00:00', '2021-04-25 11:00:00', '01312', 0, '319021910004');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 10:00:00', '2021-04-25 12:00:00', '01313', 0, '319021910005');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 11:00:00', '2021-04-25 13:00:00', '01314', 0, '319021910006');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 12:00:00', '2021-04-25 14:00:00', '01315', 0, '319021910007');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 13:00:00', '2021-04-25 15:00:00', '01316', 0, '319021910008');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 14:00:00', '2021-04-25 16:00:00', '01317', 0, '319021910009');

INSERT INTO `SeatStatus` (`Btime`, `Etime`, `Snum`, `Seatcheck`, `Id`) VALUES ('2021-04-25 15:00:00', '2021-04-25 17:00:00', '01318', 0, '319021910010');

