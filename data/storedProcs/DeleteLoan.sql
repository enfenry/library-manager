    DROP PROCEDURE IF EXISTS ProcName;

	DELIMITER //
    CREATE  PROCEDURE `DeleteLoan`(IN BookId int(11), BranchId int(11), CardNo int(11))
    BEGIN
        DELETE FROM tbl_book_loans bl
        WHERE bl.bookId = BookId
        AND bl.branchId = BranchId
        AND bl.cardNo = CardNo;
        UPDATE tbl_book_copies bc
        SET bc.noOfCopies = bc.noOfCopies +1
        WHERE bc.bookId = BookId AND bc.branchId = BranchId;
    END; //
	DELIMITER ;