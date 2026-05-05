// Sample student data
const students = [
    { id: 1, name: "Alice Johnson", department: "CSE", joiningDate: "2023-05-15" },
    { id: 2, name: "Bob Smith", department: "ECE", joiningDate: "2022-08-20" },
    { id: 3, name: "Charlie Brown", department: "Mechanical", joiningDate: "2021-11-10" },
    { id: 4, name: "Diana Prince", department: "Civil", joiningDate: "2023-01-05" },
    { id: 5, name: "Eve Wilson", department: "CSE", joiningDate: "2022-12-01" },
    { id: 6, name: "Frank Miller", department: "ECE", joiningDate: "2021-06-25" },
    { id: 7, name: "Grace Lee", department: "Mechanical", joiningDate: "2023-03-12" },
    { id: 8, name: "Henry Davis", department: "Civil", joiningDate: "2022-09-18" },
    { id: 9, name: "Ivy Chen", department: "CSE", joiningDate: "2021-07-30" },
    { id: 10, name: "Jack Taylor", department: "ECE", joiningDate: "2023-04-22" },
    { id: 11, name: "Kate Anderson", department: "Mechanical", joiningDate: "2022-10-14" },
    { id: 12, name: "Liam Garcia", department: "Civil", joiningDate: "2021-12-08" },
    { id: 13, name: "Mia Martinez", department: "CSE", joiningDate: "2023-02-28" },
    { id: 14, name: "Noah Rodriguez", department: "ECE", joiningDate: "2022-11-03" },
    { id: 15, name: "Olivia Lopez", department: "Mechanical", joiningDate: "2021-08-17" }
];

// DOM Elements
const tableBody = document.getElementById('table-body');
const deptFilter = document.getElementById('dept-filter');
const searchInput = document.getElementById('search-input');

const sortNameAscBtn = document.getElementById('sort-name-asc');
const sortNameDescBtn = document.getElementById('sort-name-desc');
const sortDateNewBtn = document.getElementById('sort-date-new');
const sortDateOldBtn = document.getElementById('sort-date-old');

// Copy original data
let currentData = [...students];


// Render Table
function renderTable(data) {

    tableBody.innerHTML = "";

    data.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${formatDate(student.joiningDate)}</td>
        `;

        tableBody.appendChild(row);

    });
}


// Format Date
function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

}


// Update Department Count
function updateCounts(data) {

    const counts = {
        CSE: data.filter(s => s.department === "CSE").length,
        ECE: data.filter(s => s.department === "ECE").length,
        Mechanical: data.filter(s => s.department === "Mechanical").length,
        Civil: data.filter(s => s.department === "Civil").length
    };

    document.getElementById("cse-count").textContent =
        `CSE: ${counts.CSE} Students`;

    document.getElementById("ece-count").textContent =
        `ECE: ${counts.ECE} Students`;

    document.getElementById("mech-count").textContent =
        `Mechanical: ${counts.Mechanical} Students`;

    document.getElementById("civil-count").textContent =
        `Civil: ${counts.Civil} Students`;

}


// Filter Function
function filterData() {

    const dept = deptFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    let filtered = students;

    // Department filter
    if (dept !== "all") {

        filtered = filtered.filter(
            student => student.department === dept
        );

    }

    // Search filter
    if (searchTerm) {

        filtered = filtered.filter(
            student =>
                student.name.toLowerCase().includes(searchTerm)
        );

    }

    currentData = filtered;

    renderTable(currentData);

    updateCounts(currentData);

}


// Sort By Name
function sortByName(ascending = true) {

    currentData.sort((a, b) => {

        if (ascending) {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }

    });

    renderTable(currentData);

}


// Sort By Date
function sortByDate(newestFirst = true) {

    currentData.sort((a, b) => {

        if (newestFirst) {
            return new Date(b.joiningDate) - new Date(a.joiningDate);
        } else {
            return new Date(a.joiningDate) - new Date(b.joiningDate);
        }

    });

    renderTable(currentData);

}


// Event Listeners
sortNameAscBtn.addEventListener(
    "click",
    () => sortByName(true)
);

sortNameDescBtn.addEventListener(
    "click",
    () => sortByName(false)
);

sortDateNewBtn.addEventListener(
    "click",
    () => sortByDate(true)
);

sortDateOldBtn.addEventListener(
    "click",
    () => sortByDate(false)
);

deptFilter.addEventListener(
    "change",
    filterData
);

searchInput.addEventListener(
    "input",
    filterData
);


// Initial Load
renderTable(currentData);

updateCounts(currentData);