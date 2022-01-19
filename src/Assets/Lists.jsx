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
    },
    {
        id: 6,
        title: "Points approved by You",
        selected: false
    },
    {   
        id: 7,
        title: "View Requests",
        selected: false
    },
    {
        id: 8,
        title: "My Point Templates",
        selected: false
    },
    {
        id: 9,
        title: "Flag Approvals",
        selected: false
    },
    {
        id: 10,
        title: "Admin Guidelines",
        selected: false
    }
];

const CategoryList ={
    "categories":[
    {   
        id:1,
        title: "Projects",
        selected:true,
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
        ],
        hash:{
            "Personal Project": 11,
            "Project under IITG clubs/orgs": 12,
            "Projects under non-IITG clubs/orgs": 13,
            "Projects under profs": 14
        }
    },
    {
        id:2,
        title: "Courses",
        selected:false,
        sub_category: [
            {
                id:21,
                title: "College Course"
            },{
                id:22,
                title: "Online Courses"
            }
        ], 
        hash: {
            "College Course":21,
            "Online Courses":22
        }
    },
    {
        id:3,
        title: "Positions of responsibility",
        selected:false,
        sub_category: [
            {
                id:31,
                title:"In IITG"
            },
            {
                id:32,
                title:"Outside IITG"
            }
        ],
        hash:{
            "In IITG":31,
            "Outside IITG":32
        }
    },
    {
        id:4,
        title: "Achievements",
        selected:false,
        sub_category:[
            {
                id:41,
                title:"Inside IITG"
            },
            {
                id:42,
                title:"Outside IITG"
            }
        ],
        hash: {
            "Inside IITG":41,
            "Outside IITG":42
        }
    },
    {
        id:5,
        title:"Experience",
        selected:false,
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
        ],
        hash:{
            "Project under IITG clubs/orgs":51,
            "Projects under non-IITG clubs/orgs":52,
            "Projects under profs":53,
        }
    },
    {
        id:6,
        title:"Extracurriculars",
        selected:false,
        sub_category:[
            {
                id:61,
                title: "Extracurriculars"
            }
        ],
        hash:{
            "Extracurriculars":61
        }
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

export { MenuList, CategoryList};


