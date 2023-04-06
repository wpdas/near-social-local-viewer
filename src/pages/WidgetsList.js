import React, { useEffect, useState } from "react";
import logo from "../images/near-social-local-viewer-logo.png";

const WidgetsList = () => {
  // Widgets list
  const [widgets, setWidgets] = useState([]);
  useEffect(() => {
    const fetchWidgets = async () => {
      const data = await fetch(`http://localhost:9000/widget/list`);
      const response = await data.json();
      if (response.list) {
        setWidgets(response.list);
      }
    };

    fetchWidgets();

    // Fetch list of widgets every 1 sec
    const interval = setInterval(() => {
      fetchWidgets();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container" style={{ marginTop: "24px" }}>
      <div className="row">
        <h3 style={{ display: "flex", alignItems: "center", padding: "0px" }}>
          <img
            src={logo}
            height="24"
            style={{ marginRight: "8px" }}
            alt="NEAR Social Bridge Logo"
          />{" "}
          NEAR Social Local Viewer
        </h3>
        <h5 style={{ padding: "0px", marginTop: "24px" }}>Local Widgets:</h5>
        <ul>
          {widgets.map((widgetName) => (
            <li>
              <a href={`#/view/${widgetName}`}>{widgetName}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WidgetsList;
