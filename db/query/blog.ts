

export async function searchBlogs({search, page}: {search?: string, page?: number}){
    //TODO: fetch actual data

    const fakeData = [
        {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        },
        {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        }, {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        }, {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        }, {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        }, {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        },
    ]

    return fakeData.splice(0, 6)
}