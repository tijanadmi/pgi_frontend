import { useState } from "react";
import { useGetObavestenjeSlike } from "./useGetObavestenjeSlike";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function ObavestenjeSlike({ dogId, onCloseModal }) {
  const { isLoading, obavestenjeSlike } = useGetObavestenjeSlike(dogId);
  const [index, setIndex] = useState(0);

  if (isLoading) return <Spinner />;
  if (!obavestenjeSlike?.length)
    return <Empty resourceName="слајку обавештења" />;

  const images = obavestenjeSlike;

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={onCloseModal}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "2rem",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          zIndex: 10000,
        }}
      >
        ✕
      </button>

      {/* LEFT */}
      <button
  onClick={prev}
  style={{
    position: "absolute",
    left: "20px",
    fontSize: "3rem",
    background: "rgba(0,0,0,0.3)",
    border: "none",
    color: "white",
    cursor: "pointer",
    zIndex: 10,
    padding: "0.5rem 1rem",
    borderRadius: "8px",
  }}
>
  ‹
</button>

      {/* IMAGE */}
      <img
        src={`data:image/${images[index].format || "jpeg"};base64,${
          images[index].base64
        }`}
        alt="obavestenje"
        style={{
          maxWidth: "95vw",
          maxHeight: "95vh",
          objectFit: "contain",
        }}
      />

      {/* RIGHT */}
      <button
  onClick={next}
  style={{
    position: "absolute",
    right: "20px",
    fontSize: "3rem",
    background: "rgba(0,0,0,0.3)",
    border: "none",
    color: "white",
    cursor: "pointer",
    zIndex: 10,
    padding: "0.5rem 1rem",
    borderRadius: "8px",
  }}
>
  ›
</button>
    </div>
  );
}

export default ObavestenjeSlike;