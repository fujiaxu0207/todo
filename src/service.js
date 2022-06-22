export const request = (type, params) => {
    let scheme = "myTodo://" + type;
    let query = "?";
    for (let k in params) {
        if (params.hasOwnProperty(k)) {
            query += `${k}=${params[k]}`;
        }
    }
    scheme += query.length >= 2 ? query : "";
    const iframeEl = document.createElement("iframe");
    iframeEl.src = scheme;
    iframeEl.style.display = "none";
    document.body.appendChild(iframeEl);
    setTimeout(() => {
        document.body.removeChild(iframeEl);
    }, 1000);
};
