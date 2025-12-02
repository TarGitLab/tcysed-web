async function showContent(contentHtml) {
  try {
    let contentTag = document.querySelector("#content");
    if (contentTag && contentHtml) {
      contentTag.innerHTML = contentHtml;
      return;
    } else {
      throw new Error("Layout failed to load content.");
    }
  } catch (error) {
    return error.message;
  }
}

export { showContent };