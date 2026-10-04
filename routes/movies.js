const express = require("express");
const User = require("../models/User");
const requireLogin = require("../middleware");

const router = express.Router();

const movies = [
    { id: 1, name: "Inception" },
    { id: 2, name: "Interstellar" },
    { id: 3, name: "Dune" },
    { id: 4, name: "The Dark Knight" }
];

router.get("/movies", (req, res) => {
    res.json(movies);
});

router.get("/watchlist", requireLogin, async (req, res) => {
    const user = await User.findById(req.session.userId);
    res.json(user.watchlist);
});

router.post("/watchlist", requireLogin, async (req, res) => {
    const user = await User.findById(req.session.userId);

    const exists = user.watchlist.some(
        movie => movie.movieId === req.body.movieId
    );

    if (!exists) {
        user.watchlist.push(req.body);
        await user.save();
    }

    res.json({ message: "Watchlist updated" });
});

router.delete("/watchlist/:id", requireLogin, async (req, res) => {
    const user = await User.findById(req.session.userId);

    user.watchlist = user.watchlist.filter(
        movie => movie.movieId !== Number(req.params.id)
    );

    await user.save();

    res.json({ message: "Movie removed" });
});

module.exports = router;