const MenuList = [
    {
        id: 1,
        title: "View Your CV Points",
        selected: true
    },
    {   
        id: 2,
        title: "View Public Records",
        selected: false
    },
    {
        id: 3,
        title: "Flagged By You",
        selected: false
    },
    {
        id: 4,
        title: "Your Flagged Points",
        selected: false
    },
    {
        id: 5,
        title: "General Guidelines",
        selected: false
    }
];

const AdminMenuList = [
    {
        id: 1,
        title: "Points approved by You",
        selected: true
    },
    {   
        id: 2,
        title: "View Requests",
        selected: false
    },
    {
        id: 3,
        title: "My Point Templates",
        selected: false
    },
    {
        id: 4,
        title: "Flag Approvals",
        selected: false
    },
    {
        id: 5,
        title: "Admin Guidelines",
        selected: false
    }
];

const CategoryList ={
    "categories":[
    {   
        id:1,
        title: "Projects",
        sub_category: [
            {
                id:11,
                title: "Personal Project"
            },
            {
                id:12,
                title: "Project under IITG clubs/orgs"
            },
            {
                id:13,
                title: "Projects under non-IITG clubs/orgs"
            },
            {
                id:14,
                title:"Projects under profs"
            }
        ]
    },
    {
        id:2,
        title: "Courses",
        sub_category: [
            {
                id:21,
                title: "College Course"
            },{
                id:22,
                title: "Online Courses"
            }
        ]
    },
    {
        id:3,
        title: "Positions of responsibility",
        sub_category: [
            {
                id:31,
                title:"In IITG"
            },
            {
                id:32,
                title:"Outside IITG"
            }
        ]
    },
    {
        id:4,
        title: "Achievements",
        sub_category:[
            {
                id:41,
                title:"Inside IITG"
            },
            {
                id:42,
                title:"Outside IITG"
            }
        ]
    },
    {
        id:5,
        title:"Experience",
        sub_category:[
            {
                id:51,
                title: "Project under IITG clubs/orgs"
            },
            {
                id:52,
                title: "Projects under non-IITG clubs/orgs"
            },
            {
                id:53,
                title:"Projects under profs"
            }
        ]
    },
    {
        id:6,
        title:"Extracurriculars",
        sub_category:[
            {
                id:61,
                title: ""
            }
        ]
    }
],
"hash":{
    "Projects":1,
    "Courses":2,
    "Positions of responsibility":3,
    "Achievements":4,
    "Experience":5,
    "Extracurriculars":6
}
}

export {AdminMenuList, MenuList, CategoryList};


