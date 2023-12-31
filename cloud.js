function addUserToCloudStorage(user) {
    axios.post('https://crudcrud.com/api/03da04825c494350abb357182e2a5037/appoinmentData', user)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        });
}

function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    axios.get('https://crudcrud.com/api/03da04825c494350abb357182e2a5037/appoinmentData')
        .then(response => {
            const cloudUsers = response.data;

            cloudUsers.forEach((user, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${user.name} - ${user.email} - ${user.phone}</span>
                    <button onclick="editUser(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                `;
                userList.appendChild(listItem);
            });
        })
        .catch(err => {
            console.error(err);
        });
}

function deleteUser(index) {
    axios.get('https://crudcrud.com/api/03da04825c494350abb357182e2a5037/appoinmentData')
        .then(response => {
            const cloudUsers = response.data;
            
            // Check index is within the range of cloud
            if (index >= 0 && index < cloudUsers.length) {
                // Remove the user from the cloud
                const userIdToDelete = cloudUsers[index]._id; // Assuming each user id
                axios.delete(`https://crudcrud.com/api/03da04825c494350abb357182e2a5037/appoinmentData/${userIdToDelete}`)
                    .then(() => {
                        displayUsers();
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                console.error("Invalid index.");
            }
        })
        .catch(err => {
            console.error(err);
        });
}

function editUser(index) {
    const newEmail = prompt('Enter new email:');
    
    if (newEmail) {
        axios.get('https://crudcrud.com/api/03da04825c494350abb357182e2a5037/appoinmentData')
            .then(response => {
                const cloudUsers = response.data;

                // Chek index is within the range of cloud
                if (index >= 0 && index < cloudUsers.length) {
                    // Update the user's email in the cloud storage 
                    const userIdToUpdate = cloudUsers[index]._id; // Assuming each user object id
                    axios.put(`https://crudcrud.com/api/03da04825c494350abb357182e2a5037/appoinmentData/${userIdToUpdate}`, { email: newEmail })
                        .then(() => {
                            displayUsers();
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    console.error("Invalid index.");
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
}

document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const user = { name, email, phone };

    addUserToCloudStorage(user);
    displayUsers();

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
});

// Initial display of users
displayUsers();
