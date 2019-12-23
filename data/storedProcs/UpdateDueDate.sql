    DROP PROCEDURE IF EXISTS UpdateDueDate;

	DELIMITER //
    CREATE PROCEDURE `UpdateDueDate`(IN BookId int(11), BranchId int(11), CardNo int(11), DueDate datetime)
    BEGIN
        UPDATE tbl_book_loans bl
        SET dueDate = DueDate
        WHERE bl.bookId = BookId AND bl.branchId = BranchId AND bl.cardNo = CardNo;
    END; //
	DELIMITER ;