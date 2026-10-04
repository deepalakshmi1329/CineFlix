async function loadMovies() {
    const response = await fetch("/movies");

    if (!response.ok) {
        window.location.href = "/login.html";
        return;
    }

    const movies = await response.json();

    document.getElementById("movies").innerHTML = movies.map(movie => `
        <div class="movie-card">
            <div class="movie-image">▶</div>
            <h3>${movie.name}</h3>
            <button onclick="addMovie(${movie.id}, '${movie.name}')">
                Add to Watchlist
            </button>
        </div>
    `).join("");
}

async function loadWatchlist() {
    const response = await fetch("/watchlist");

    if (!response.ok) {
        window.location.href = "/login.html";
        return;
    }

    const movies = await response.json();

    if (movies.length === 0) {
        document.getElementById("watchlist").innerHTML =
            "<p class='empty'>Your watchlist is empty.</p>";
        return;
    }

    document.getElementById("watchlist").innerHTML = movies.map(movie => `
        <div class="movie-card">
            <div class="movie-image">▶</div>
            <h3>${movie.movieName}</h3>
            <button onclick="removeMovie(${movie.movieId})">
                Remove
            </button>
        </div>
    `).join("");
}

async function addMovie(movieId, movieName) {
    await fetch("/watchlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            movieId: movieId,
            movieName: movieName
        })
    });

    loadWatchlist();
}

async function removeMovie(movieId) {
    await fetch("/watchlist/" + movieId, {
        method: "DELETE"
    });

    loadWatchlist();
}

document.getElementById("logout").addEventListener("click", async function() {
    await fetch("/logout", {
        method: "POST"
    });

    window.location.href = "/login.html";
});

loadMovies();
loadWatchlist();