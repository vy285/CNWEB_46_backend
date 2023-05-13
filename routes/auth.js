const express = require("express");

const router = express.Router();

const {
	register,
	loginUser,
	getUserProfile,
	updatePassword,
	updateUserProfile,
	logoutUser,
	getUsers,
	getUserById,
	deleteUserById,
	updateUser,
} = require("../controllers/user.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/user/register", register);
router.post("/user/login", loginUser);

router.get("/me", isAuthenticatedUser, getUserProfile);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.post("/me/update", isAuthenticatedUser, updateUserProfile);
router.get("/logout", isAuthenticatedUser, logoutUser);

router.get(
	"/admin/users",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	getUsers,
);
router.get(
	"/admin/user/:id",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	getUserById,
);
router.delete(
	"/admin/user/:id",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	deleteUserById,
);
router.post(
	"/admin/user/:id",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	updateUser,
);

module.exports = router;