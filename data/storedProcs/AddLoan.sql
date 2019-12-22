	DROP PROCEDURE IF EXISTS AddLoan;

	DELIMITER //
    CREATE PROCEDURE `AddLoan`(IN BookId int(11), BranchId int(11), CardNo int(11))
    BEGIN
        INSERT INTO tbl_book_loans
        VALUES (BookId,BranchId,CardNo, NOW(), NOW() + INTERVAL 7 DAY);
    END; //
	DELIMITER ;