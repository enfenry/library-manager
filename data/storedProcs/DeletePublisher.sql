	DROP PROCEDURE IF EXISTS DeletePublisher;

	DELIMITER //
	CREATE PROCEDURE DeletePublisher (IN  PublisherId int(11))
	BEGIN
		UPDATE tbl_book bk
		SET bk.pubId = null
		WHERE bk.pubId = PublisherId;
		
		DELETE FROM tbl_publisher p
		WHERE p.publisherId = PublisherId;
	END; //
	DELIMITER ;