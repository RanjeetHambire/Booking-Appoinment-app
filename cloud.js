function addUserToCloudStorage(user) {
    axios.post('https://crudcrud.com/api/d18064bc979b4643bf3be9dea5ef518b/appoinmentData', user)
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

    axios.get('https://crudcrud.com/api/d18064bc979b4643bf3be9dea5ef518b/appoinmentData')
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
    axios.get('https://crudcrud.com/api/d18064bc979b4643bf3be9dea5ef518b/appoinmentData')
        .then(response => {
            const cloudUsers = response.data;
            
            // Check if the index is within the range of cloudUsers array
            if (index >= 0 && index < cloudUsers.length) {
                // Remove the user from the cloud storage by sending a DELETE request
                const userIdToDelete = cloudUsers[index]._id; // Assuming each user object has an '_id' property
                axios.delete(`https://crudcrud.com/api/d18064bc979b4643bf3be9dea5ef518b/appoinmentData/${userIdToDelete}`)
                    .then(() => {
                        // User deleted from cloud storage, now refresh the UI
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
        axios.get('https://crudcrud.com/api/d18064bc979b4643bf3be9dea5ef518b/appoinmentData')
            .then(response => {
                const cloudUsers = response.data;

                // Check if the index is within the range of cloudUsers array
                if (index >= 0 && index < cloudUsers.length) {
                    // Update the user's email in the cloud storage by sending a PUT or PATCH request
                    const userIdToUpdate = cloudUsers[index]._id; // Assuming each user object has an '_id' property
                    axios.patch(`https://crudcrud.com/api/d18064bc979b4643bf3be9dea5ef518b/appoinmentData/${userIdToUpdate}`, { email: newEmail })
                        .then(() => {
                            // User email updated in cloud storage, now refresh the UI
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
