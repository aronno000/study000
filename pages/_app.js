import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component  data-theme="dracula" {...pageProps} />;
}
