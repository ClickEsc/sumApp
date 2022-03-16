import * as React from "react"
import { Link } from "gatsby"

// styles
const pageStyles = {
  padding: "20px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#232129",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
  textAlign: "center"
}

const paragraphStyles = {
  marginBottom: 48,
  textAlign: "center"
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

// markup
const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <title>Not found</title>
      <h1 style={headingStyles}>404 Page not&nbsp;found</h1>
      <p style={paragraphStyles}>
        Нам очень жаль{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        <br />
        такой страницы не&nbsp;существует.
        <br />
        {/* {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null} */}
        <br />
        <Link to="/">На главную</Link>
      </p>
    </main>
  )
}

export default NotFoundPage;
