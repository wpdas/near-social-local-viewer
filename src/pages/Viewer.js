import React, { lazy, useEffect, useState } from "react";
import { Widget } from "near-social-vm";

const defaultCodeMessage = `
return (
  <div>
    <p style={{ fontWeight: 600, color: "#AB2E28", fontFamily: "Courier new" }}>
      No Widget file of type .jsx was found. You must run the following command
      to inject your widget:
      <span
        style={{
          background: "#000",
          color: "#fff",
          padding: "2px",
          fontWeight: 400,
        }}
      >
        yarn ns-viewer path/to/MyWidget
      </span>
    </p>
  </div>
);

`;

export default function Viewer(props) {
  const [code, setCode] = useState(defaultCodeMessage);
  const [widgetProps, setWidgetProps] = useState();

  // Live widget update
  useEffect(() => {
    const fetchCode = async () => {
      const data = await fetch("http://localhost:9000");
      const response = await data.json();
      if (code !== response.code) {
        setCode(response.code);
      }
    };

    fetchCode();

    const interval = setInterval(() => {
      fetchCode();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Get props from url
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace("#/", ""));
    const _props = {};
    const keys = params.keys();
    params.forEach((value) => {
      _props[keys.next().value] = value;
    });
    setWidgetProps(_props);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="d-inline-block position-relative overflow-hidden">
          <Widget key={`preview-${12}`} code={code} props={widgetProps} />
        </div>
      </div>
    </div>
  );
}
