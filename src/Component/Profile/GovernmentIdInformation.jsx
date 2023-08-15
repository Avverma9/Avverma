import { useState } from "react";

export const GovernmentIdInformation = ({ userData }) => {
  const [gID, setGID] = useState(""); //Sets Government ID Input Field Value
  const [selectGID, setSelectGID] = useState(""); // Sets Type of Gov Id Selected

  const [adhaar, setAdhaar] = useState(userData?.adhar);
  const [pan, setpan] = useState(userData?.pan);
  const [drivingLsc, setDrivingLsc] = useState(userData?.dl);

  const handleIdSubmit = () => {
    console.log("ID SUBMITTED");
  };
  console.log(selectGID);
  return (
    <div>
      <div className="_title">
        <h1>Government Id</h1>
      </div>

      <div className="d-flex flex-row gap-3">
        <input
          type="radio"
          id="adhaar"
          name="govid"
          value="Adhaar"
          onChange={(e) => setSelectGID(e.target.value)}
        />
        <label for="adhaar">Adhaar Card</label>
        <input
          type="radio"
          id="pan"
          name="govid"
          value="PAN"
          onChange={(e) => setSelectGID(e.target.value)}
        />
        <label for="pan">PAN Card</label>
        <input
          type="radio"
          id="dl"
          name="govid"
          value="Driving Licence"
          onChange={(e) => setSelectGID(e.target.value)}
        />
        <label for="dl">Driving Licence</label>
      </div>

      <div className="_fields">
        {selectGID === "Adhaar" &&
          (gID === "" ||
          gID.match(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/gm) ? null : (
            <p className="text-xs font-semibold text-red-700">
              Please Provide a Valid Adhaar Number
            </p>
          ))}
        {selectGID === "PAN" &&
          (gID === "" || gID.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) ? null : (
            <p className="text-xs font-semibold text-red-700">
              Please Provide a Valid PAN ID
            </p>
          ))}
        {selectGID === "Driving Licence" &&
          (gID === "" ||
          gID.match(
            /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
          ) ? null : (
            <p className="text-xs font-semibold text-red-700">
              Please Provide a Valid Driving License Number
            </p>
          ))}
        <input
          type="text"
          value={gID}
          onChange={(e) => setGID(e.target.value)}
        />
      </div>

      <div className="flex-col items-start text-left" style={{ marginTop: 50 }}>
        <div className="flex-col">
          <div className="_title">
            <h1 className="me-2" style={{ width: "20%" }}>
              Adhaar
            </h1>
            <input
              type="text"
              className="_gid_input"
              value={adhaar && adhaar !== "" ? adhaar : ""}
            />
          </div>

          <div className="_title">
            <h1 className="me-2" style={{ width: "20%" }}>
              PAN Card
            </h1>
            <input
              type="text"
              className="_gid_input"
              value={pan && pan !== "" ? pan : ""}
            />
          </div>

          <div className="_title">
            <h1 className="me-2" style={{ width: "20%" }}>
              Driving Licence
            </h1>
            <input
              type="text"
              className="_gid_input"
              value={drivingLsc && drivingLsc !== "" ? drivingLsc : ""}
            />
          </div>
        </div>
      </div>

      <button className="profile_body_button" onClick={handleIdSubmit}>
        Add Government Id
      </button>
    </div>
  );
}
