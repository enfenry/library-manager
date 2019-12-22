	DROP PROCEDURE IF EXISTS BorrowerExists;

	DELIMITER //
    CREATE  PROCEDURE `BorrowerExists`(IN Id int(11))
    BEGIN
        SELECT 1
        FROM tbl_borrower b
        INNER JOIN tbl_book_loans bl ON bl.cardNo = b.cardNo
        WHERE b.cardNo= Id;
    END; //
	DELIMITER ;