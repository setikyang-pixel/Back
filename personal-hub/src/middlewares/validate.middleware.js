import AppError from "../utils/AppError.js";

const validNote = (req, res, next) => {
	let {title,body,tags } = req.body;
	if(!title || typeof title !== "string" || !body || typeof body !== "string"  || !Array.isArray(tags) || !tags.every(i => typeof i === "string")){
		return next(new AppError("Invalid Arguments!!!", 400));
	}
	next();
};

const validBook = (req, res, next) => {
	let {title, author, status, rating} = req.body;
	if(!title || typeof title !== "string" || !author || typeof author !== "string" || !status || typeof status !== "string" || !["to-read", "reading", "finished"].includes(status) || typeof rating !== "number"){
		return next(new AppError("Invalid Arguments!!!", 400));
	}
	next();
};

const validHabit = (req, res, next) => {
	let {name, frequency} = req.body;
	if(!name || typeof name !== "string" || !frequency || typeof frequency !== "string" || !["daily", "weekly", "monthly"].includes(frequency)){
		return next(new AppError("Invalid Arguments!!!", 400));
	}
	next();
};

export { validNote, validBook, validHabit };