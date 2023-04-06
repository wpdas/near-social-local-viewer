import React, { lazy, useEffect, useState } from "react";
import { Widget } from "near-social-vm";
import { defaultCodeMessage } from "../../constants";
import { useParams } from "react-router-dom";

export default function Viewer(props) {
  const [code, setCode] = useState(defaultCodeMessage);
  const [widgetProps, setWidgetProps] = useState();

  // Get the widget name to render
  const { widget } = useParams();

  // Live widget update
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const data = await fetch(`http://localhost:9000/widget/get/${widget}`);
        const response = await data.json();
        if (code !== response.code) {
          setCode(response.code);
        }
      } catch (error) {
        console.error("widget file not found");
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
    <div className="container" style={{ marginTop: "24px" }}>
      <div className="row">
        <div className="d-inline-block position-relative overflow-hidden">
          <Widget key={`preview-${12}`} code={code} props={widgetProps} />
        </div>
      </div>
    </div>
  );
}
