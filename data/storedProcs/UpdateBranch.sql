    DROP PROCEDURE IF EXISTS UpdateBranch;

	DELIMITER //
    CREATE PROCEDURE `UpdateBranch`(IN  BranchId int(11), BranchName varchar(45), BranchAddress varchar(45))
    BEGIN
        UPDATE tbl_library_branch lb
        SET lb.branchName = BranchName, lb.branchAddress = BranchAddress
        WHERE lb.branchId = BranchId;
    END; //
	DELIMITER ;