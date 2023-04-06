/**
 * This is a widget created to be used with "NEAR Social Local Viewer" CLI.
 * A tool that enables you to develop your widgets locally.
 * Learn more here: https://github.com/wpdas/near-social-local-viewer
 *
 * This Widget lives here: https://near.social/#/wendersonpires.near/widget/NSLVWidget
 *
 * How it works:
 *
 * 1 - This widget connects to both local and remote widgets;
 * 2 - Example of use:
 *
 * <Widget
 *   src={"wendersonpires.near/widget/NSLVWidget"}
 *   props={{ src: "wendersonpires.near/widget/Profile" }}
 * />
 *
 * Where "NSLVWidget" Loads the Near Social Local Viewer logic to render local or remote widget
 * and "props={src: "wendersonpires.near/widget/Profile"}" is the widget path
 *
 * It will always try to find a local Widget first, if it fails, the remote Widget will be used.
 */

const src = props.src;

State.init({
  code: null,
  ready: false,
  props: props.srcProps || {},
});

if (!src) {
  return (
    <div>
      <p
        style={{ fontWeight: 600, color: "#AB2E28", fontFamily: "Courier new" }}
      >
        This is a widget created to be used with
        <a href="https://github.com/wpdas/near-social-local-viewer">
          "NEAR Social Local Viewer"
        </a>{" "}
        CLI. A tool that enables you to develop your widgets locally.
      </p>
      <p
        style={{ fontWeight: 600, color: "#AB2E28", fontFamily: "Courier new" }}
      >
        Learn more here:{" "}
        <a href="https://github.com/wpdas/near-social-local-viewer">
          https://github.com/wpdas/near-social-local-viewer
        </a>
      </p>
    </div>
  );
}

const localWidgetPath = src.split("/");
const localWidgetName = localWidgetPath[localWidgetPath.length - 1];

const fetchCode = () => {
  asyncFetch(`http://localhost:9000/widget/get/${localWidgetName}`)
    .then((localWidgetSrc) => {
      if (
        localWidgetSrc &&
        localWidgetSrc?.status === 200 &&
        localWidgetSrc?.body?.code
      ) {
        // Set local widget code
        State.update({ code: localWidgetSrc.body.code });

        // If it's local (because its using local code server), refresh every 1 sec (to get most updated local widget)
        setTimeout(() => {
          fetchCode();
        }, 1000);
      }
    })
    .finally(() => {
      State.update({ ready: true });
    });
};

fetchCode();

// Wait till it loads
if (!state.code) {
  return <div />;
}

if (state.ready && state.code) {
  // Render local widget
  return <Widget code={state.code} props={state.props} />;
}

// Render remote widget
if (state.ready && !state.code) {
  return <Widget src={src} props={state.props} />;
}
