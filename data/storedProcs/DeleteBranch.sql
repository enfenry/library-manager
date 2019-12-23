	DROP PROCEDURE IF EXISTS DeleteBranch;

	DELIMITER //
    CREATE PROCEDURE `DeleteBranch`(IN  BranchId int(11))
    BEGIN
        DELETE FROM tbl_library_branch lb
        WHERE lb.branchId = BranchId;
    END; //
	DELIMITER ;