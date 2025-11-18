import React, { useEffect, useReducer, useState } from "react";
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
  const [showPopup, setShowPopup] = useState(false);
  const [currentDownload, setCurrentDownload] = useState(null);

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

  // Handle download - Create a text file containing video link
  const confirmDownload = () => {
    if (!currentDownload) return;

    const blob = new Blob(
      [`Video Link:\n${currentDownload}`],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "video_link.txt";
    a.click();

    URL.revokeObjectURL(url);
    setShowPopup(false);
  };

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
        "media-file": "https://youtu.be/GsmXaO38wP4",
      },
      {
        _id: "m2",
        name: "Introduction to Calculus",
        desc: "Learn derivatives, integrals, and continuous change in Calculus.",
        logo: process.env.PUBLIC_URL + "/images/calculus.jpg",
        subject: "Mathematics",
        format: "Book",
        "media-file": "https://youtu.be/3Xytg7IV6EM",
      },
      {
        _id: "m3",
        name: "Introduction to Differential Calculus",
        desc: "Explore rates of change in Differential Calculus.",
        logo: process.env.PUBLIC_URL + "/images/differential.jpg",
        subject: "Mathematics",
        format: "Video",
        "media-file": "https://youtu.be/3Xytg7IV6EM",
      },
      {
        _id: "m4",
        name: "Music Theory in 10 Minutes",
        desc: "Learn scales, chords, and rhythm.",
        logo: process.env.PUBLIC_URL + "/images/music.jpg",
        subject: "Music",
        format: "Audio",
        "media-file": "https://youtu.be/AmC_qmSODEk",
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

          <button
            className="clear-btn"
            onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
          >
            Clear Filters ✖
          </button>
        </div>

        {/* Cards */}
        <div className="card-grid">
          {state.media.length > 0 ? (
            state.media.map((item) => (
              <div key={item._id} className="media-card">
                <img src={item.logo} alt={item.name} onError={handleImgError} />
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <div className="btn-group">
                  <button onClick={() => window.open(item["media-file"], "_blank")}>
                    View
                  </button>

                  <button
                    onClick={() => {
                      setCurrentDownload(item["media-file"]);
                      setShowPopup(true);
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-result">No content found.</p>
          )}
        </div>
      </main>

      {/* Popup Box */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Download Video?</h3>
            <p>Do you want to download this video link?</p>

            <div className="popup-buttons">
              <button className="yes-btn" onClick={confirmDownload}>Yes</button>
              <button className="no-btn" onClick={() => setShowPopup(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
