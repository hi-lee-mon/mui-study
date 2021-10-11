import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({ genres, setGenres, selectedGenres, setSelectedGenres }) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`
    );
    console.log(process.env);
    setGenres(data?.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleAddGenres = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres?.filter((g) => g?.id !== genre?.id));
  };

  const handleRemoveGenres = (genre) => {
    setSelectedGenres(
      selectedGenres?.filter((selected) => selected?.id !== genre?.id)
    );
    setGenres([...genres, genre]);
  };
  return (
    <div style={{ padding: "10px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          onDelete={() => handleRemoveGenres(genre)}
          style={{ backgroundColor: "#adb5bd" }}
          clickable
          label={genre.name}
        />
      ))}
      {genres?.map((genre) => (
        <Chip
          onClick={() => handleAddGenres(genre)}
          clickable
          label={genre?.name}
          color="secondary"
          style={{ fontSize: "1.2em", margin: "3px" }}
        />
      ))}
    </div>
  );
};

export default Genres;
