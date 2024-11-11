"use strict";

const fetchUser = async function () {
  debugger;
  const loaderBox = document.getElementById("loader-box");
  const noDataBox = document.getElementById("no-data-box");
  const mainData = document.getElementById("main-data");
  noDataBox.classList.add("hidden");
  mainData.classList.add("hidden");

  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Something went wrong! Please try again later ");
    }

    const data = await response.json();

    if (Array.isArray(data.users) && data.users.length > 0) {
      console.log(data);
      mainData.classList.remove("hidden");
      processUi(data.users);
    } else {
      noDataBox.classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
    noDataBox.classList.remove("hidden");
  } finally {
    loaderBox.classList.add("hidden");
  }
};

fetchUser();

function processUi(data) {
  const userList = document.getElementById("user-list");

  data.forEach((element) => {
    const card = userCard(element);

    if (card) {
      userList.insertAdjacentHTML("beforeEnd", card);
    }
  });
}

function userCard(user) {
  console.log(user);
  return `
   <div class="user-box">
            <figure class="user-image-box">
              <img class="user-image" src="${user.image}"
                alt="user">
            </figure>
            <div class="user-info">
              <p class="username">${user.firstName} ${user.lastName}</p>
              <p class="emai-add">${user.email}</p>
              <p class="age">Age: ${user.age}</p>

            </div>
          </div>
  `;
}
