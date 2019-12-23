    DROP PROCEDURE IF EXISTS UpdateBorrower;

	DELIMITER //
    CREATE PROCEDURE `UpdateBorrower`(IN  CardNo int(11), Name varchar(45), Address varchar(45), 
    Phone varchar(45))
    BEGIN
        UPDATE tbl_borrower br
        SET br.name = Name, br.address = Address, br.phone = Phone
        WHERE br.cardNo = CardNo;
    END; //
	DELIMITER ;