import React, { lazy, useEffect, useState } from "react";
import { Widget } from "near-social-vm";


export default function Viewer(props) {
  const [code, setCode] = useState("");
  const [widgetProps, setWidgetProps] = useState();

  // Live widget update
  useEffect(() => {
    const fetchCode = async () => {
      const data = await fetch('http://localhost:9000')
      const response = await data.json()
      if (code !== response.code) {
        setCode(response.code)
      }
    }

    fetchCode();

    const interval = setInterval(() => {
      fetchCode();
    },1000)

    return () => {
      clearInterval(interval)
    }
  }, []);

  // Get props from url
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace('#/', ''))
    const _props = {};
    const keys = params.keys();
    params.forEach((value) => {
      _props[keys.next().value] = value;
    })
    setWidgetProps(_props)
  }, [])

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
