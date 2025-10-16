import React, { useEffect, useReducer } from "react";
import "./Explore.css";

const initialState = {
  formats: [],
  subjects: [],
  media: [],
  allMedia: [],
  searchTerm: "",
  selectedFormat: "#",
  selectedSubject: "#",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        formats: action.payload.formats,
        subjects: action.payload.subjects,
        media: action.payload.media,
        allMedia: action.payload.media,
      };

    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };

    case "SET_FORMAT":
      return { ...state, selectedFormat: action.payload };

    case "SET_SUBJECT":
      return { ...state, selectedSubject: action.payload };

    case "CLEAR_FILTERS":
      return {
        ...state,
        searchTerm: "",
        selectedFormat: "#",
        selectedSubject: "#",
        media: state.allMedia,
      };

    case "FILTER_MEDIA": {
      const { allMedia, searchTerm, selectedFormat, selectedSubject } = state;

      const filtered = allMedia.filter((m) => {
        const matchesSearch = m.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesSubject =
          selectedSubject === "#" || m.subject === selectedSubject;

        const matchesFormat =
          selectedFormat === "#" || m.format === selectedFormat;

        return matchesSearch && matchesSubject && matchesFormat;
      });

      return { ...state, media: filtered };
    }

    default:
      return state;
  }
}

export default function Explore() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle image fallback
  const handleImgError = (e) => {
    const img = e.target;
    if (!img.dataset.fallbackTried) {
      img.dataset.fallbackTried = "true";
      if (img.src.endsWith(".webp")) {
        img.src = img.src.replace(".webp", ".jpg");
      } else {
        img.src = process.env.PUBLIC_URL + "/images/default.jpg";
      }
    } else {
      img.src = process.env.PUBLIC_URL + "/images/default.jpg";
    }
  };

  // Load sample data
  useEffect(() => {
    const sampleFormats = [
      { _id: "1", format_name: "Video" },
      { _id: "2", format_name: "Audio" },
      { _id: "3", format_name: "Book" },
      { _id: "4", format_name: "Article" },
    ];

    const sampleSubjects = [
      { _id: "1", name: "Mathematics" },
      { _id: "2", name: "Psychology" },
      { _id: "3", name: "Music" },
      { _id: "4", name: "Philosophy" },
      { _id: "5", name: "Literature" },
    ];

    const sampleMedia = [
      {
        _id: "m1",
        name: "History of Ideas: Romanticism",
        desc: "Explores the Romantic era’s emphasis on emotion, individualism, and nature.",
        logo: process.env.PUBLIC_URL + "/images/romanticism.jpg",
        subject: "Philosophy",
        format: "Audio",
        "media-file": process.env.PUBLIC_URL + "/media/romanticism.mp3",
      },
      {
        _id: "m2",
        name: "Introduction to Calculus",
        desc: "Learn derivatives, integrals, and continuous change in this introduction to Calculus.",
        logo: process.env.PUBLIC_URL + "/images/calculus.jpg",
        subject: "Mathematics",
        format: "Book",
        "media-file": process.env.PUBLIC_URL + "/media/calculus.pdf",
      },
      {
        _id: "m3",
        name: "Introduction to Differential Calculus",
        desc: "Explore rates of change and slopes of curves in Differential Calculus.",
        logo: process.env.PUBLIC_URL + "/images/differential.jpg",
        subject: "Mathematics",
        format: "Video",
        "media-file": process.env.PUBLIC_URL + "/media/differential.mp4",
      },
      {
        _id: "m4",
        name: "The Basics of Music Theory Explained in 10 Minutes",
        desc: "Learn scales, chords, and rhythm fundamentals — perfect for beginners.",
        logo: process.env.PUBLIC_URL + "/images/music.jpg",
        subject: "Music",
        format: "Audio",
        "media-file": process.env.PUBLIC_URL + "/media/music.mp3",
      },
      {
        _id: "m5",
        name: "What is Literature For?",
        desc: "Explores literature’s purpose — empathy, understanding, and human connection.",
        logo: process.env.PUBLIC_URL + "/images/literature.jpg",
        subject: "Literature",
        format: "Article",
        "media-file": process.env.PUBLIC_URL + "/media/literature.mp4",
      },
      {
        _id: "m6",
        name: "What is Psychology?",
        desc: "An engaging look into psychology and its importance in understanding human behavior.",
        logo: process.env.PUBLIC_URL + "/images/psychology.jpg",
        subject: "Psychology",
        format: "Video",
        "media-file": process.env.PUBLIC_URL + "/media/psychology.mp4",
      },
    ];

    dispatch({
      type: "SET_DATA",
      payload: {
        formats: sampleFormats,
        subjects: sampleSubjects,
        media: sampleMedia,
      },
    });
  }, []);

  // Automatically re-filter whenever any filter changes
  useEffect(() => {
    dispatch({ type: "FILTER_MEDIA" });
  }, [state.searchTerm, state.selectedFormat, state.selectedSubject]);

  return (
    <div className="explore-page">
      <div className="background-animation"></div>
      <main className="container">
        <h2 className="page-title">Explore Knowledge Nexus</h2>

        {/* Filter Section */}
        <div className="filter-section">
          <select
            value={state.selectedFormat}
            onChange={(e) =>
              dispatch({ type: "SET_FORMAT", payload: e.target.value })
            }
          >
            <option value="#">Select Format</option>
            {state.formats.map((f) => (
              <option key={f._id} value={f.format_name}>
                {f.format_name}
              </option>
            ))}
          </select>

          <select
            value={state.selectedSubject}
            onChange={(e) =>
              dispatch({ type: "SET_SUBJECT", payload: e.target.value })
            }
          >
            <option value="#">Select Subject</option>
            {state.subjects.map((s) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="search-section">
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={state.searchTerm}
              onChange={(e) =>
                dispatch({ type: "SET_SEARCH", payload: e.target.value })
              }
            />
          </div>

          {/* Clear Button */}
          <button
            className="clear-btn"
            onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
          >
            Clear Filters ✖
          </button>
        </div>

        {/* Media Cards */}
        <div className="card-grid">
          {state.media.length > 0 ? (
            state.media.map((item) => (
              <div key={item._id} className="media-card">
                <img src={item.logo} alt={item.name} onError={handleImgError} />
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <div className="btn-group">
                  <button
                    onClick={() => window.open(item["media-file"], "_blank")}
                  >
                    View
                  </button>
                  <a href={item["media-file"]} download>
                    <button>Download</button>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="no-result">No content found matching your criteria. hiiii</p>
          )}
        </div>
      </main>
    </div>
  );
}
