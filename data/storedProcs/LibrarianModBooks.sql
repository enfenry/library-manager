	DROP PROCEDURE IF EXISTS LibrarianModBooks;

	DELIMITER //
    CREATE  PROCEDURE `LibrarianModBooks`(IN books int(11), bId int(11), brId int(11))
    BEGIN
        UPDATE tbl_book_copies bc
        SET bc.noOfCopies = books
        WHERE bc.bookId = bId AND bc.branchId = brId;
    END; //
	DELIMITER ;