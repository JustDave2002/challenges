let show = null;
function searchShow(name) {



    console.log(name);
    fetch(` https://api.tvmaze.com/search/shows?q=${name}`)
        .then(res => res.json())
        .then(res => {
            console.log(res); // 10
            let element = document.getElementById("searchedItems");
            while (element.lastChild) { element.lastChild.remove(); }

            res.forEach((tvShow) => {

                console.log(tvShow);
                let tvShowDiv = document.createElement("div");
                tvShowDiv.onclick = function () {
                    location.href = "show.html?show=" + tvShow.show.id;
                };
                tvShowDiv.classList.add("tvShow")

                let coverImg = document.createElement('img');

                    if (tvShow.show.image !== null) {
                        coverImg.src = tvShow.show.image.medium;
                    } else {
                        coverImg.src = "images/coverImg.svg";
                    }
                coverImg.classList.add("coverImg");
                tvShowDiv.appendChild(coverImg);

                let title  = document.createElement('p') ;
                title.innerHTML = tvShow.show.name + " (" + (tvShow.show.premiered != null ? tvShow.show.premiered.substring(0, 4) : "not aired yet")+ (tvShow.show.ended != null ? ` - ${tvShow.show.ended.substring(0, 4)}`  : "- ") + ")";

                title.classList.add("title");
                tvShowDiv.appendChild(title);

                let description  = document.createElement('p') ;
                description.innerHTML = tvShow.show.summary;

                description.classList.add("truncate");
                tvShowDiv.appendChild(description);

                element.appendChild(tvShowDiv);
            });
        });
}

function getQueryString(){
    const queryString = window.location.search;
    console.log(queryString);

    const urlParams = new URLSearchParams(queryString);
    show = urlParams.get('show')
    console.log(show);
}

function getShow(){
    fetch(` https://api.tvmaze.com/shows/${show}?embed[]=seasons&embed[]=episodes&embed[]=cast`)
        .then(res => res.json())
        .then(res => {
            console.log(res); // 10
        });
}