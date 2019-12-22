	DROP PROCEDURE IF EXISTS AddBorrower;

	DELIMITER //
	CREATE PROCEDURE AddBorrower (IN  Name varchar(45), Address varchar(45), 
    Phone varchar(45))
	BEGIN
    DECLARE newId int(11) DEFAULT 1;
	SET newId = (SELECT MAX(br.cardNo) + 1 FROM tbl_borrower br);
    INSERT INTO `tbl_borrower` (`cardNo`, `name`, `address`, `phone`) VALUES (newId, Name, Address, Phone);
	END; //
	DELIMITER ;