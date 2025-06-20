export default function DateInput() {
  return (
    <div
      className="container text-justify text-1xl p-2"
      style={{ marginTop: "20px" }}
    >
      <input
        type="date"
        id="start"
        name="trip-start"
        value="2018-07-22"
        min="1940-01-01"
        max="2007-12-31"
      />
    </div>
  );
}
