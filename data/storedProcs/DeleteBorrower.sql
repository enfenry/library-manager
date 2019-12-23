    DROP PROCEDURE IF EXISTS DeleteBorrower;

	DELIMITER //
    CREATE PROCEDURE `DeleteBorrower`(IN  CardNo int(11))
    BEGIN
        DELETE FROM tbl_borrower br
        WHERE br.cardNo = CardNo;
    END; //
	DELIMITER ;