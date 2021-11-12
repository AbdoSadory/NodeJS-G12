// const btnTodos = document.getElementById("todos")
// const btnPosts = document.getElementById("posts")
// const btnPhotos = document.getElementById("photos")

const apiMethodsDiv = document.getElementById("apiMethodsDiv")
const apiRoutesDiv = document.getElementById("apiRoutesDiv")
const apiResultsDiv = document.getElementById("apiResultsDiv")

const commonLink = "https://jsonplaceholder.typicode.com/";

const methodTypes = [
                        {   
                            btnName: "Posts",
                            title: "posts",
                            attr: ["userId", "id", "title", "body"]
                        },
                        {
                            btnName: "Photos",
                            title: "photos",
                            attr: ["albumId", "id", "title", "url", "thumbnailUrl"]
                        },
                        {
                            btnName: "Todos",
                            title: "todos",
                            attr: ["userId", "id", "title", "completed"]
                        },
                        {
                            btnName: "Albums",
                            title: "albums",
                            attr: ["userId", "id", "title","body"]
                        },
                        {
                            btnName: "PUT",
                            title: "posts/1",
                            attr: ["userId", "id", "title","body"]
                        },
                        {
                            btnName: "PATCH",
                            title: "posts/1",
                            attr: ["userId", "id", "title","body"]
                        },
                        {
                            btnName: "DELETE",
                            title: "posts/1",
                            attr: ["userId", "id", "title","body"]
                        }
                    ]
// The Routes are suitable for only the Posts Data, because the columns content is the same.
// const methodRoutes = [ {title : "POST",route: "posts"},
//                        {title: "PUT",route: "posts/1"},
//                        {title: "PATCH",route: "posts/1"},
//                        {title: "DELETE",route: "posts/1"} ]


const createMyOwnElement = (parent, ele, txt = null, classes = null) => {
    myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if (txt) myElement.textContent = txt
    if (classes) myElement.classList = classes
    return myElement
}

methodTypes.forEach(method => {
    btn = createMyOwnElement(apiMethodsDiv, "button", method.btnName, "btn btn-primary mx-2 ")
    btn.addEventListener("click", async function (e) {
        apiResultsDiv.textContent=" "

        let data = await ( await fetch(`${commonLink}${method.title}`) ).json()

        const table = createMyOwnElement(apiResultsDiv, "table", "", "table table-bordered")

        const thead = createMyOwnElement(table, "thead")
        
        method.attr.forEach(att => {
            createMyOwnElement(thead, "th", att)
        })

        const tbody = createMyOwnElement(table, "tbody")
        if(!Array.isArray(data)) {

            tr = createMyOwnElement(tbody, "tr")

            for (property in data) {

                console.log(data[property])
                createMyOwnElement(tr, "td", data[property])
            }

        } else {
            data.forEach(item=>{
            tr = createMyOwnElement(tbody, "tr")

            method.attr.forEach(att => {
                createMyOwnElement(tr, "td", item[att])
            })
            })
        }
        

    })
})


