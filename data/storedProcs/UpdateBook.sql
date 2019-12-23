    DROP PROCEDURE IF EXISTS UpdateBook;

	DELIMITER //

    CREATE PROCEDURE `UpdateBook`(IN BookId int(11), Title varchar(45),
        PubId int(11))
    BEGIN
        UPDATE tbl_book b
        SET b.title = Title, b.pubId = PubId
        WHERE b.bookId = BookId;
    END; //
    DELIMITER ;