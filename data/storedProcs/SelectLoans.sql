	DROP PROCEDURE IF EXISTS SelectLoans;

	DELIMITER //
    CREATE  PROCEDURE `SelectLoans`(IN  CardNo int(11))
    BEGIN
        SELECT br.cardNo, br.name, bl.bookId, b.title, bl.branchId, lb.branchName
        FROM tbl_borrower br, tbl_book_loans bl, tbl_book b, tbl_library_branch lb
        WHERE br.cardNo = CardNo AND bl.cardNo = CardNo
        AND b.bookId = bl.bookId AND lb.branchId = bl.branchId;
    END; //
	DELIMITER ;