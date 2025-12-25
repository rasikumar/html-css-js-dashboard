function toggleRTL() {
  const html = document.documentElement;
  html.dir = html.dir === "rtl" ? "ltr" : "rtl";
}
